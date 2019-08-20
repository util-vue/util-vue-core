<template>
<div>
  <div class="list" v-if="type === 'choose'" @click="changeData">
    <div class="list-name">{{name}}</div>
    <div class="list-value">{{value?value:placeholder}}</div>
  </div>
  <div class="list" v-if="type === 'img'" @click="changeLogo">
    <div class="list-name">{{name}}</div>
    <div class="list-value">
      <util-image
            :src="address"
            size="1:1"
            mode="aspectFill"
            zoom="120"
          ></util-image>
    </div>
  </div>
  <div class="list" v-if="type === 'input'">
    <div class="list-name">{{name}}</div>
    <div class="list-value" :class="type === 'input'?'input':''">
      <input type="text" :placeholder="placeholder">
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props:{
    /**
     * 标签名称
     */
     name: {
      default() {
        return '';
      }
    },
    /**
     * 标签值
     */
     value: {
      default() {
        return '';
      }
    },
    /**
     * 类型
     */
     type: {
      default() {
        return 'choose';
      }
    },
    /**
     * 头像
     */
    address:{
      default() {
        return '';
      }
    },
    /**
     * input-placeholder
     */
    placeholder:{
      default() {
        return '';
      }
    }
  },
   data(){
    return{
      
    }
  },
  methods:{
    changeLogo(){
      this.$emit('click');
    },
    changeData(){
      this.$emit('click');
    }
  }
}
</script>

<style >
.list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 0.5px solid #E2E2E2;
  min-height: 117px;
  margin: 0;
  padding-right: 60px;
  box-sizing: border-box;
}
.list-name{
  font-size: 28px;
  color: #222222;
  padding-left: 15px;
}
.list-value{
  color: #999999;
  font-size: 28px;
  position: relative;
  width: calc(100% - 200px);
  text-align: right;
}
.list-value::after{
    text-align: center;
    display: block;
    position: absolute;
    top: 50%;
    width: 8px;
    height: 8px;
    margin-top: -4px;
    right: -30px;
    content: '';
    border-top: 2px solid #999999;
    border-right: 2px solid #999999;
    transform: rotate(45deg);
}
.list-value.input::after{
  display: none;
}
.list-value img{
  height: 120px;
  width: 120px;
  border-radius: 50%;
  margin: 20px 0;
  float: right;
}
.list-value input{
  width: 100%;
  font-size: 28px;
  text-align: right;
}
</style>
