 // 匀速
 function constantSpeed(node, speed, end, callback) { /* 实际的速度与 interval 有关。应该等于 speed*(1000/interval) */
     var time, s, tId;
     s = 0;
     time = 0;
     node.style.marginLeft = 0 + "px"; /* 归零，以重复执行 */
     tId = setInterval(() => {
         if (s < end) {
             s = speed * time++; /* 匀速直线运动路程公式 */
             node.style.marginLeft = s + "px";
         } else {
             clearInterval(tId);
             callback && callback();
         }
     }, 10);
 }
 // 匀减速 Uniformly retarded，效果不佳
 function retardedSpeed(node, a, end, callback) { /* a 代表加速度速率，建议 a 的范围在 0-0.2 区间，否则需要改偏差 */
     var time, s, start, v0, tId;
     time = 0;
     s = 0;
     start = +node.style.left.slice(0, -2);
     // 计算初速度：根据 2as=vt^2-v0^2,其中 vt=0。得： v0=sqrt(-2as)
     // v0 = Math.ceil(Math.sqrt(-2 * a * end) * 10) / 10; /* 方案1： 向上保留1为小数，解决 s 到达不了end 的问题，同时减小了计算精度=》缺点：更改 a 容易失灵，动画效果不细腻 */
     a = end < 0 ? a : -a; /* 匀减速加速度方向要与位移矢量方向相反 */
     //  console.log("a:" + a);
     v0 = Math.sqrt(-2 * a * end * 1.01); /* 方案2：给 end 加一个0.01倍的偏差 */
     v0 = end > 0 ? v0 : -v0; /* 匀减速初速度方向要与位移矢量方向一致 */
     //  console.log("v0:" + v0);
     //  node.style.left = 0 + "px"; /* 归零，以重复执行 */
     tId = setInterval(() => {
         console.log("s:" + s);
         if (Math.abs(s) < Math.abs(end)) { /* 计算的结果不准确，不能直接 s<end =》改进后可以了*/
             s = (v0 * time) + 0.5 * a * time++ ** 2; /* 匀加速直线运动路程公式 */
             node.style.left = start + s + "px";
         } else {
             node.style.left = start + end + "px"; /* debug：强行取端点值 */
             clearInterval(tId);
             callback && callback(); /* 如果callback参数有传入那就执行 */
             during = Date.now() - during;
         }
     }, 10);
 }

 //  所有需要获取 offsetLeft/offsetTop 的动画都会因为浏览器缩放而出问题（可能只对竖直方向运动有影响）：到达不了终止状态而陷入死循环。
 function animate(obj, space, funtime, callback) {
     clearInterval(obj.intervalID); //把定时器的id存入对象. 对象始终只有一个同名属性,如果点击了多次,后面id会覆盖前面的id
     obj.intervalID = setInterval(function() {
         var left = obj.offsetLeft; //获取当前对象距左边的距离
         var speed = (space - left) / 10; //动态计算速度
         //console.log('未取整的结果==>',speed);
         speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //速度要向上取整.   4.5  ==> 5  -4.5==>-4  -5
         left += speed; //左边位移要加上速度
         ///console.log("距离左边的位移",left,"每次移动的位移:",speed);
         if (left == space) { //如果位移达到了目标距离 就停止动画
             clearInterval(obj.intervalID); //清除定时器.
             callback && callback(); //如果callback参数有传入那就执行 短路就不执行.
         }
         obj.style.left = left + "px";
     }, funtime);
 }
 //  水平运动动画
 function animateX(targetNode, terminus, speed, callback) {
     /* 参数说明：
         targetNode-目标节点（必要）：需要移动的元素； 
         termius-终点（必要）：目标节点需要移动到的指定 offsetLeft 位置；
         speed-速度（非必要）：动画执行的快慢，单位 ms，取值应为1~100的整数；
         callback-回调函数（非必要）：需要在动画结束后执行的代码。
     */
     var left, increment, during;
     //  during = Date.now(); /* during 是动画执行的时间，考虑作为返回值备用 */
     speed = speed ? speed : 10; /* 默认速度 */
     clearInterval(targetNode.intervalID); /* 把定时器的id存入对象，（类似）防抖 */
     targetNode.intervalID = setInterval(function() {
         left = targetNode.offsetLeft; /* 缩放会出问题 */
         //  left = +targetNode.style.left.slice(0, -2); /* 解决缩放问题（尝试） */
         increment = (terminus - left) / 10;
         increment = increment > 0 ? Math.ceil(increment) : Math.floor(increment); /* 速度要向上取整 */
         left += increment;
         //  console.log(left);
         if (left == terminus) {
             clearInterval(targetNode.intervalID);
             callback && callback();
             //  console.log("during:" + (Date.now() - during));
         }
         targetNode.style.left = left + "px";
     }, speed);
 }
 //  竖直运动动画
 function animateY(targetNode, terminus, speed, callback) { /* 老师的方案，效果很好，但有两处未搞懂 */
     /* 参数说明：
         targetNode-目标节点（必要）：需要移动的元素； 
         termius-终点（必要）：目标节点需要移动到的指定 offsetTop 位置；
         speed-速度（非必要）：动画执行的快慢，单位 ms，取值应为1~100的整数；
         callback-回调函数（非必要）：需要在动画结束后执行的代码。
     */
     var top, increment, during;
     during = Date.now();
     speed = speed ? speed : 10; /* 默认速度 */
     clearInterval(targetNode.intervalID);
     targetNode.intervalID = setInterval(function() {
         top = targetNode.offsetTop; /* 缩放会出问题 */
         //  top = +targetNode.style.top.slice(0, -2); /* debug: 缩放问题（尝试）=>改用 top 属性 */
         //  console.log("ot:", top);
         increment = (terminus - top) / 10; /* 为什么这里取10，如果这里变化也会改变动画快慢 */
         //  console.log("increment1:", increment);
         increment = increment > 0 ? Math.ceil(increment) : Math.floor(increment);
         //  console.log("increment2:", increment);
         top += increment;
         //  console.log(top);
         if (top == terminus) {
             clearInterval(targetNode.intervalID);
             callback && callback();
             console.log("during:" + (during = Date.now() - during));
         }
         targetNode.style.top = top + "px";
         //  console.log("st:", targetNode.style.top);
     }, speed); /* 为什么这里决定速度 */
 }
 //  改动版
 function animateY2(targetNode, terminus, speed, callback) { /* 太过平滑了 */
     /* 参数说明：
          targetNode-目标节点（必要）：需要移动的元素； 
          termius-终点（必要）：目标节点需要移动到的指定 offsetTop 位置；
          speed-速度（非必要）：动画执行的快慢，单位 ms，取值应为1~100的整数；
          callback-回调函数（非必要）：需要在动画结束后执行的代码。
     */
     /* 发现的问题：
          speed 小于10，鼠标快进快出/鼠标极快滑有几率出现跳动 bug
          speed 小于20，鼠标极快滑过有几率出现跳动 bug
     */
     var top, increment, during;
     top = targetNode.offsetTop;
     during = Date.now();
     speed = speed ? speed : 10; /* 默认速度 */
     speed = Math.abs(terminus - top) * speed / 100; /* 百分比化 */
     clearInterval(targetNode.intervalID);
     targetNode.intervalID = setInterval(function() {
         top = targetNode.offsetTop;
         console.log("ot:", top);
         increment = (terminus - top) / speed;
         console.log("increment1:", increment);
         increment = increment > 0 ? Math.ceil(increment) : Math.floor(increment);
         console.log("increment2:", increment);
         top += increment;
         console.log(top);
         if (top == terminus) {
             clearInterval(targetNode.intervalID);
             callback && callback();
             console.log("during:" + (Date.now() - during));
         }
         targetNode.style.top = top + "px";
         console.log("st:", targetNode.style.top);
     }, 10);
 }