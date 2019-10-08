<template>
  <f7-page>
    <util-image
      size="2:1"
      :isCacheExist="true"
      src="./static/bg.jpg"
      mode="aspectFill"
    ></util-image>

    <img
      ref="img"
      src="http://www.fd11111.com/Up/day_161211/201612112214455683.jpg"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    />
  </f7-page>
</template>
<script>
var timeOutEvent = 0; //定时器
export default {
  
  methods: {
    touchstart: function(e){
         var self=this;
        timeOutEvent = setTimeout(function(){
          //此处为长按事件-----在此显示遮罩层及删除按钮
          console.log("此处为长按事件-----在此显示遮罩层及删除按钮");
          self.$util.plus.io.savePicture(function(){
            alert("保存成功");
          });
        },500);
    },
    touchmove: function(){
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        e.preventDefault();
    },
    touchend: function(e){
        clearTimeout(timeOutEvent);
        if(timeOutEvent!=0){//点击
          //此处为点击事件----在此处添加跳转详情页
            console.log("点击");
        }
        return false;
    }
  }
};
</script>