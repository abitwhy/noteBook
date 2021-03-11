// pages/test/test.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    text:'welcome to test',
    longitude:'113.280637',
    latitude:'23.125178',
    scanResult:null,
    questions:[
      'css单位em与rem的区别',
      '微信单位rpx',
      '跨域问题',
      '同源策略'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 页面生命周期
    onLoad: function(options) {
      // 页面创建时执行
      console.log('onload');
      setInterval(()=>{
        this.setData({
          text:Date.now()
        });
      },1000);
    },
    onLoad:function(){
      // 页面加载完成
    },
    onReady:function(){
      // 页面准备完成
    },
    onShow:function(){
      // 页面展示
    },
    onHide:function(){
      // 页面隐藏
    },
    onPullDownRefresh: function() {
      // 下拉刷新时执行
    },
    // 事件响应函数
    viewTap: function() {
      // ...
      this.setData({
        text:'Don\'t touch me!'
      })
    },
    getLocal:function(event){
      console.log(event)
      // this.setData({
      //   longitude:'113.280637',
      //   latitude:'23.125178',
      // })
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          // console.log(res, this);
          this.setData({
            longitude: res.longitude,
            latitude: res.latitude
          })
        }
      })
    },
    scanHandle(){
      wx.scanCode({
        success:(res)=>{
          console.log(res)
          this.setData({
            scanResult:res.result
          })
        }
      })
    }
  },


  // // 组件生命周期
  // lifetimes:{
  //   // 实例被创建时
  //   created(){

  //   },
  //   // 实例进入页面节点树时
  //   attached(){

  //   },
  //   // 视图层布局完成后
  //   ready(){
  //     this.text=Date.now();
  //     console.log('ready');
  //   } ,
  //   // 实例被移动到节点树另一个位置时
  //   moved(){

  //   },
  //   // 实例被从页面节点树移除时
  //   detached(){

  //   },
  //   // 组件方法抛出错误时
  //   error(){

  //   }
  // }
})
