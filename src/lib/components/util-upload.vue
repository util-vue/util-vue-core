<template>
  <li
    v-if="type==='1'"
    class="item-content item-input item-upload"
    :class="value ? 'item-input-with-value':''"
  >
    <div class="item-inner">
      <div class="item-title item-label ">{{lable}}</div>
      <div class="item-input-wrap">
        <template v-if="!value">
          <div
            class="upload-add"
            @click="openSelect"
          >
            <span class="link iconfont icon-icon_xinzeng"></span>
          </div>
        </template>
        <template v-if="value">
          <div
            v-if="fileMode==='img'"
            class="upload-add"
          >
            <util-image
              size="1:1"
              zoom="600"
              width="78px"
              :src="value.url"
              :mode="mode"
              @click="replace"
            ></util-image>
          </div>
          <div
            v-if="fileMode==='file'"
            @click="replace"
            class="omit-one txt-normal-xs"
            style="line-height:32px"
          >
            {{value&&value.name}}
          </div>
        </template>
        <input
          style="height:0px"
          type="text"
          :required="required"
          :value="value&&value.id"
          validate
        />
        <span
          @click="clearValue"
          class="input-clear-button"
        ></span>
        <div class="item-input-info">
          <template v-if="info">
            <span>{{info}}</span>
          </template>
          <template v-if="!info">
            <span>点击上传{{lable}}</span>
          </template>
        </div>
      </div>
    </div>
  </li>
  <f7-list-item
    v-else-if="type==='2'"
    :title="lable"
    link="#"
    @click="openSelect"
  >
    <util-image
      size="1:1"
      zoom="360"
      width="25px"
      :src="imageOrDefault"
      :mode="mode"
      :circular="true"
    ></util-image>
  </f7-list-item>
  <li
    v-else-if="type==='3'"
    style="list-style-type:none;"
  >
    <div class="add-house-type"      >
       <util-image
       v-if="value && value.url"
      size="2:1"
      zoom="360"
      :src="value.url"
      :mode="mode"
      height="154px"
      width="100%"
      :circular="true"
    ></util-image>
        <span
          @click="clearValue"
          class="iconfont icon-icon_shanchutupian clear-button"
          v-if="value && value.url"
        ></span>

     <input
          style="height:0px"
          type="text"
          :required="required"
          :value="value&&value.id"
          validate
        />
    
      <div class="addHouse-icon" v-if="!value" @click="openSelect" link="#">
          <div class="iconfont icon-icon_tianjiahuxingtu"></div>
          <div>{{lable}}</div>
      </div>

    </div>
  </li>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  /** 更新 */
  props: {
    type: {
      default() {
        return "1";
      }
    },
    /** 标签 */
    lable: {
      default() {
        return "图片";
      }
    },
    /** 值 */
    value: {
      default() {
        return "";
      }
    },
    /** 是否存在必选 */
    required: {
      default() {
        return false;
      }
    },
    /** 描述信息 */
    info: {
      default() {
        return "";
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
    }
  },
  data() {
    return {
      fileMode: "file"
    };
  },
  computed: {
    imageOrDefault() {
      if (this.value && this.value.address) return this.value.address;
      return './static/default_photo.png'
    }
  },
  /** 双向绑定 */
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    value(val) {
      this.initMode();
    }
  },
  async mounted() {},
  methods: {
    clearValue() {
      this.$emit("change", undefined);
    },
    /** 显示模式初始化 */
    initMode() {
      if (!this.value) {
        this.fileMode = "file";
        return;
      }
      if (
        this.value.extensions === "jpg" ||
        this.value.extensions === "jpeg" ||
        this.value.extensions === "png" ||
        this.value.extensions === "gif"
      ) {
        this.fileMode = "img";
      } else {
        this.fileMode = "file";
      }
    },
    /** 打开选择 */
    openSelect() {
     this.openActionSelect();
    },
    /** 打开 拍照|相册 选择器 */
    async openActionSelect() {
      var _self = this;
      var actionSheet =  this.$util.f7.f7App.actions.create({
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
              _self.$util.plus.camera.uploadSingle(result => {
                    _self.uploadSuccess(result);
               });
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
    uploadSuccess(file) {
      console.log(JSON.stringify(file));
      if (file) this.$emit("change", file);
      else this.$emit("change", undefined);
      var _self = this;
      setTimeout(() => {
        _self.initMode();
      }, 10);
    },
    /** 替换 */
    replace() {
       this.$util.message.confirm(
        "上传后会覆盖之前的文件,是否继续？",
        this.openHtmlInputFileSelect
      );
    }
  }
};
</script>

<style scoped>
.upload-add {
  width: 78px;
  height: 78px;
  background: #f1f1f1;
  border: 1px solid #666;
  line-height: 78px;
  text-align: center;
  overflow: hidden;
}
.item-content.item-upload {
  padding-bottom: 20px !important;
}
.item-upload.item-input:not(.item-input-outline) .item-input-wrap:after,
.item-upload .input:not(.input-outline):after {
  display: none;
}
.add-house-type {
  height: 154px;
  background: #eaeaea;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  color:#333333;
  position: relative;
} 
.add-house-type .input-clear-button{
top:0 !important;
}
.add-house-type img{
  border-radius:8px !important; 
}
.addHouse-icon {
  text-align: center;
  padding-top: 45px;
}
.clear-button{
  position: absolute;
  top:-15px;
  right:-10px;
}
</style>
