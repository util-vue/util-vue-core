<template>
  <div>
    <div class="add-case-pic case-flex"  v-if="type==1">
      <!-- 图片添加按钮 -->
      <div class="add-case-pic-list case-flex"   @click="openSelect">
        <svg class="icon add" aria-hidden="true">
          <use xlink:href="#icon-icon_tianjiazhaopian" />
        </svg>
      </div>
      <!-- 图片循环 -->
      <div class="add-case-pic-list" v-for="(item, index) in value" :key="index">
        <svg class="case-del icon" aria-hidden="true" @click="deleteItem(item)">
          <use xlink:href="#icon-icon_jianchu" />
        </svg>
        <util-image size="1:1" zoom="300" :src="item.url" mode="aspectFill"></util-image>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  /** 更新 */
  props: {
    /** 值 */
    value: {
      default() {
        return [];
      }
    },
    /** 文件过滤 */
    accept: {
      default() {
        return "image/jpeg,image/png,image/jpg";
      }
    },
    /** 图片显示模式 */
    mode: {
      default() {
        return "aspectFill";
      }
    },
    /** 文件显示模式 */
    fileMode: {
      default() {
        return "img";
      }
    },
    maxImageNum: {
      default() {
        return 9;
      }
    },
    type: {
      default() {
        return 1;
      }
    }
  },
  data() {
    return {
      //winWidth: 0
    };
  },
  /** 双向绑定 */
  model: {
    prop: "value",
    event: "change"
  },
  watch: {},
  async mounted() {
    //this.winWidth = window.innerWidth;
    console.log("上传输出"+JSON.stringify(this.value));
  },
  methods: {
    /** 打开选择 */
    openSelect() {
      if (this.value.length >= this.maxImageNum) {
        this.$util.message.toast("最多只能上传" + this.maxImageNum + "张图片");
        return false;
      }
      this.openActionSelect();
    },
    /** 打开 拍照|相册 选择器 */
    async openActionSelect() {
      var _self = this;
      var actionSheet = this.$util.f7.f7App.actions.create({
        buttons: [
          {
            text: "拍照",
            onClick: function() {
              _self.$util.plus.camera.upload(result => {
                _self.uploadSuccess(result);
              });
            }
          },
          {
            text: "相册选择",
            onClick: function() {
              _self.$util.plus.camera.uploadMultiple(
                _self.maxImageNum,
                result => {
                  result.forEach(element => {
                    _self.uploadSuccess(element);
                  });
                }
              );
            }
          },
          {
            text: "取消",
            color: "red",
            onClick: function() {}
          }
        ]
      });
      actionSheet.open();
    },
    /** 上传成功 */
    uploadSuccess(files) {
      console.log(JSON.stringify(files));
      if (!this.value) this.$emit("change", []);
      this.value.push(files);
      this.$emit("change", this.value);
    },
    singleUploadSuccess(file) {
      if (!this.value) this.$emit("change", []);
      this.value.push(file);
      this.$emit("change", this.value);
    },
    /** 删除 */
    deleteItem(item) {
      var _self = this;
      this.$util.message.confirm("确定删除？", () => {
        _self.remove(_self.value, item);
      });
    },
    /**
     * 删除
     */
    remove(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          arr.splice(i, 1);
          return;
        }
      }
    }
  }
};
</script>

<style scoped>


.add-case-pic {
  flex-wrap: wrap;
}
.add-case-pic-list {
  height: 186px;
  width: calc(25% - 2px);
  position: relative;
  box-sizing: border-box;
  background: #f5f5f5;
  margin: 1px;
}
.add-case-pic-list .add {
  width: 70px;
  height: 70px;
  margin: 0 auto;
}
.case-del {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 2px;
  top: 4px;
}
.case-flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
