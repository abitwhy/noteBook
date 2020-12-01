// 总结：
// 1.简单类型变量是赋值的，对象是传址的
// 2.可能会出现程序没问题，浏览器方面有未考虑到的问题
function ScrollImg(node, data) {
    this.node = node || null;
    this.data = data || [];
}
// 播放
ScrollImg.prototype.play = function() { /* 初始化 */
    this.predefine();
    this.render();
    this.picks[this.lastPick.manual].classList.add("picked");
    this.lastIterval = this.dispatchPick(0);
    // 监听按钮点击事件（可以考虑使用事件代理进行优化=》搁置：changes 里的 this 指向代理元素（pickList），导致获取不到当前被点击的子元素=》解决：event.target=》再次告吹：无法自动触发事件。）
    for (var i = 0; i < this.picks.length; i++) {
        this.picks[i].addEventListener("click", this.changes.bind(this), false); /* 需要绑定 this ，以获得 picks */
    }
    this.toggle();
    this.nap();
};
// 预定义
ScrollImg.prototype.predefine = function() { /* 预定义全局变量（仅普通变量，不包含 node 节点） */
    this.lastPick = { /* 上一个被选中按钮，分别记录手动点击的和循环触发的 */
        manual: 0,
        auto: 0
    };
    this.imgs = null; /* 图片组（暂未使用） */
    this.lastIterval = -1; /* 上一个执行的自动播放 */
    this.changing = false; /* 控制 change 事件触发频率（防止手动触发与自动触发定时器混乱） */
    this.napping = false; /* 控制 nap 里的 napEvent 事件触发频率 */
    this.toggling = false; /* 控制 toggle 里的 toggleEvent 事件的触发频率 */
};
// 渲染节点
ScrollImg.prototype.render = function() {
    var pickList, imgList, pickNode, imgNode;
    pickList = this.node.querySelector(".pick-list");
    pLItem = pickList.querySelector("li"); /* 模板按钮 */
    imgList = this.node.querySelector(".img-list");
    iLItem = imgList.querySelector("li"); /* 模板图片 */
    for (var i = 0; i < this.data.length; i++) {
        if (i) { /* 因为有模板，克隆节点时，跳过第一个 */
            pickNode = pLItem.cloneNode(true); /* 克隆的节点在被添加后会被清空，所以要在循环里克隆 */
            imgNode = iLItem.cloneNode(true);
            pickList.appendChild(pickNode);
            imgNode.querySelector("img").src = this.data[i];
            imgList.appendChild(imgNode);
        } else {
            imgList.querySelector("img").src = this.data[i]; /* 需要设置第一个 img 的地址 */
            continue;
        }
    }
    // 后续完善
    // imgList.style.width = iLItem.offsetWidth * (this.data.length + 1) + "px"; /* [横向滑动]图片列表增宽，以放下浮动的图片 */
    imgList.style.height = iLItem.offsetHeight * (this.data.length + 1) + "px"; /* [横向滑动]图片列表增宽，以放下浮动的图片（加一是为了无缝过渡） */
    this.picks = pickList.querySelectorAll("li");
    this.picks.forEach((item, i) => { /* 给按钮添加索引，方便后面还原前一个按钮样式，以及绑定对应 img 元素等操作 */
        item.index = i++;
    }, 0);
    interimImg = imgList.firstElementChild.cloneNode(true); /* 追加一个图片，作为两端滑动的过渡图片 */
    imgList.appendChild(interimImg); /* 追加图片 */
    imgs = imgList.querySelectorAll("li"); /* 获取图片组（暂未使用） */
};
// 轮播动画
ScrollImg.prototype.changes = function(e) { /* 轮播图动效、自动播放及相关动作 */
    var piv, target, picks, imgList;
    piv = this;
    target = e.target; /* this 被外部更改，还好可以使用 e.target */
    picks = piv.node.querySelector(".pick-list").querySelectorAll("li");
    imgList = piv.node.querySelector(".img-list");
    if (!piv.changing) {
        var vector, interim;
        piv.changing = true;
        interim = false; /* 判断过渡轮 */
        // vector = iLItem.offsetWidth * (piv.lastPick.manual - target.index); /* 移动矢量 */
        vector = iLItem.offsetHeight * (piv.lastPick.manual - target.index); /* 移动矢量 */
        picks[piv.lastPick.manual].classList.remove("picked"); /* 移除上一按钮的选中效果 */
        if (piv.lastPick.manual == picks.length - 1 && target.index == 0) {
            interim = true;
            // vector = -iLItem.offsetWidth;
            vector = -iLItem.offsetHeight;
            piv.lastPick.manual = 0;
        } else {
            piv.lastPick.manual = target.index;
        }
        // console.log(piv.lastPick);

        // retardedSpeed(imgList, 1, vector, () => { /* 滑动效果（图片列表滑动） */
        //     if (interim) {
        //         imgList.style.width = 0;
        //     }
        //     piv.changing = false;
        // });

        // animateX(imgList, imgList.offsetLeft + vector, 20, () => { /* 水平滑动 */
        //     if (interim) {
        //         setTimeout(() => { /* debug：此处设置一定比 anmateX 里的设置晚执行 */
        //             imgList.style.left = 0;
        //         }, 0);
        //     }
        //     piv.changing = false;
        // });

        animateY(imgList, imgList.offsetTop + vector, 20, () => { /* 竖直滑动 */
            if (interim) {
                setTimeout(() => { /* debug：此处设置一定比 anmateY 里的设置晚执行 */
                    imgList.style.top = 0;
                }, 0);
            }
            piv.changing = false;
        });

        picks[piv.lastPick.manual].classList.add("picked"); /* 设置当前按钮的选中效果 */
        if (piv.lastPick.manual !== piv.lastPick.auto) { /* 手动点击后，重置循环触发 */
            piv.reDispatchPick(piv.lastPick.manual);
        }
    }
};
// 循环播放
// 不打断方案（未封装，仅保留思路）
// (function dispatchPick() { /* 立执行函数方式，循环不会被用户点击打断 */
//     var k = 0; /* 索引需要在定时器外部 */
//     var timeId = setInterval(() => { /*  */
//         var eventClick = new Event("click");
//         picks[(k++) % picks.length].dispatchEvent(eventClick);
//         // console.log((k++) % picks.length);
//     }, 2000);
// })();
// 打断方案
ScrollImg.prototype.dispatchPick = function(begin) { /* 接受触发起始位置参数，实现根据用户点击按钮重置循环 */
    var piv, picks;
    piv = this;
    picks = piv.node.querySelector(".pick-list").querySelectorAll("li");

    var intervalId = setInterval(() => { /*  */
        var eventClick = new Event("click");
        piv.lastPick.auto = (begin++ + picks.length) % picks.length; /* 更新循环触发的前一个按钮;debug：向上翻会产生负值，这里做一个临时的补救：+piks.length  */
        picks[piv.lastPick.auto].dispatchEvent(eventClick); /* dispatchEvent 有布尔返回值 */
    }, 2000);
    return intervalId;
};
// 再次播放
ScrollImg.prototype.reDispatchPick = function(current) { /* 清除前轮询，执行新轮询 */
    clearInterval(this.lastIterval);
    this.lastIterval = this.dispatchPick(current);
};
// 翻页
ScrollImg.prototype.toggle = function() { /* 前后页按钮，也需要防抖，执行间隔应大于动画事件*/
    var piv, toggleList, picks;
    piv = this;
    toggleList = piv.node.querySelector(".toggle-list");
    picks = piv.node.querySelector(".pick-list").querySelectorAll("li");

    function toggleEvent(e) {
        e.preventDefault();
        if (e.target.nodeName == "LI") {
            if (!piv.toggling) {
                piv.toggling = true;
                var pom; /* plus or minus */
                pom = e.target === toggleList.firstElementChild ? -1 : 1;
                piv.lastPick.auto = (piv.lastPick.auto + pom + picks.length) % picks.length;
                // piv.lastPick.manual = piv.lastPick.auto;
                piv.reDispatchPick(piv.lastPick.auto);
                picks[piv.lastPick.auto].dispatchEvent(new Event("click"));
                setTimeout(() => {
                    piv.toggling = false;
                }, 1200); /* 这里的延迟需大于动画的 during，观察 during 范围在 840~1200（大多数落在860左右，1200的偏离值因无缝连接未完善产生）之间，最好以函数返回值的形式取到 during */
            }
        }
    }
    toggleList.addEventListener("click", toggleEvent); /* 点击事件代理 */
};
// 暂停播放
ScrollImg.prototype.nap = function() { /* 鼠标在图片上移动暂停轮询 */
    var piv, imgList;
    piv = this;
    imgList = piv.node.querySelector(".img-list");

    function napEvent(e) {
        e.stopPropagation(); /* debug：toggle 按钮不属于该事件触发对象 */
        if (e.target.nodeName == "IMG" && !piv.napping) {
            clearInterval(piv.lastInterval);
            piv.napping = true;
            setTimeout(() => {
                piv.reDispatchPick(piv.lastPick.manual); /* 也可以考虑从自动点击位置开始 */
                piv.napping = false;
            }, 1000);
        }
    }
    imgList.addEventListener("mousemove", napEvent);
};