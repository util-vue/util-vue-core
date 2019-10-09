<template>
  <f7-page>
       <util-image
               src="http://www.fd11111.com/Up/day_161211/201612112214455683.jpg"
              :openCache="true"
              type="2"
              zoom="3240"
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
  mounted(){
    var img=['http://www.fd11111.com/Up/day_161211/201612112214455683.jpg','https://p0.ssl.qhimgs4.com/t0145f76d219a128e0b.jpg']
    this.$util.plus.io.loadUrlFileAndCacheArray(img,d=>{
      console.log(JSON.stringify(d));
    });
  },

  methods: {
    touchstart: function(e){
         var self=this;
        timeOutEvent = setTimeout(function(){
          self.$util.plus.io.savePicture("http://www.fd11111.com/Up/day_161211/201612112214455683.jpg",function(){
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
        if(timeOutEvent!=0){
            console.log("点击");
        }
        return false;
    }
  }
};
</script>