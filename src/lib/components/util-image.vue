<template>
  <div ref="image">
    <img
      @click="clickHandle"
      v-lazy:background-image=" currentUrl ? ( currentUrl + zoomUrl) : ''"
      :data="currentUrl"
      :key="src"
      :width="width"
      :height="height"
      :class="bindClass + ' replace-img' + (circular ?  ' circular' : '')"
      :style="{
        'background-size':modeStyle,
        'border-radius':radius
    }"
      :src="replaceSrc"
    />
  </div>
</template>

<script>
import AlloyFinger from "alloyfinger";

export default {
  props: {
    /**图片地址**/
    src: {
      default() {
        return "";
      }
    },
    /**图片比例 例如： 1:2 **/
    size: {
      default() {
        return "";
      }
    },
    /**宽度**/
    width: {
      default() {
        return "100%";
      }
    },
    /**高度**/
    height: {
      default() {
        return "auto";
      }
    },
    /**缩放大小 例如：360 **/
    zoom: {
      default() {
        return "";
      }
    },
    /**类**/
    bindClass: {
      default() {
        return "";
      }
    },
    /**圆形图片**/
    circular: {
      default() {
        return false;
      }
    },
    /** 圆角度数 */
    radius: {
      default() {
        return "";
      }
    },
    /**
     * 显示模式
     * scaleToFill 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
     * aspectFit  保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
     * aspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
     * **/
    mode: {
      default() {
        return "auto";
      }
    },
    /** 开启预览 (会使点击事件失效) */
    preview: {
      default() {
        return false;
      }
    },
    /** 开启hbuilder缓存 */
    openCache: {
      default() {
        return false;
      }
    },
    /** 替换比例地址前缀路径 */
    replaceSrcPrefix: {
      default() {
        return "static/";
      }
    },
    /**
     * 开启放大于缩放
     */
    openScal: {
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      alloyFinger: undefined,
      /** plus是否已经开启 */
      plusOpen: false,
      /** 图片真实加载地址 */
      currentUrl: undefined,
      /** 背景比例 横向比例 */
      backgroundSizeX: 100,
      /** 背景比例 纵向比例 */
      backgroundSizeY: 100
    };
  },
  computed: {
    /** 缩放地址 */
    zoomUrl() {
      if (!this.zoom) return "";
      return `?imageView2/2/w/${this.zoom}/h/${this.zoom}`;
    },
    /** 模式 */
    modeStyle() {
      switch (this.mode) {
        case "scaleToFill":
          return `${this.backgroundSizeX}% ${this.backgroundSizeY}%`;
        case "aspectFit":
          return "contain";
        case "aspectFill":
          return "cover";
      }
      return this.mode;
    },
    /** 替换地址 */
    replaceSrc() {
      if (!this.size)
        return this.replaceSrcPrefix + "rectangle_2_1_replace.png";
      var scaleParam = this.size.split(":");
      return (
        this.replaceSrcPrefix +
        `rectangle_${scaleParam[0]}_${scaleParam[1]}_replace.png`
      );
    }
  },
  watch: {
    src(val) {
      this.resetCurrentUrl();
    }
  },
  mounted() {
    this.plusOpen = this.$util.plus.helper.isOpen();
    this.resetCurrentUrl();
    if (this.openScal) this.startScal();
  },
  methods: {
    /** 点击事件 */
    clickHandle(e) {
      if (this.preview) {
        var imagePreview = this.$util.f7.f7App.photoBrowser.create({
          photos: [this.src],
          swipeToClose: false,
          theme: "dark"
        });
        imagePreview.open();
        return;
      }
      this.$emit("click", e);
    },
    /** 重置 真实地址 */
    resetCurrentUrl() {
      if (!this.plusCache || !this.src || !this.plusOpen) {
        this.currentUrl = this.src;
        return;
      }
      var _self = this;
      this.$util.plus.io.loadUrlFileAndCache(
        this.src,
        newPath => {
          console.log(newPath);
          _self.currentUrl = newPath.fullPath;
        },
        p => {
          console.log(p);
        },
        e => {
          console.log(p);
        }
      );
    },
    /** 开始执行缩放 */
    startScal() {
      this.alloyFinger = new AlloyFinger(this.$refs.image, {
        pinch: this.onDocumentPinch
      });
    },
    /** 缩放 */
    onDocumentPinch(evt) {
      var current = this.backgroundSizeX;
      this.backgroundSizeX = this.$util.helper.clamp(
        current * evt.zoom,
        100,
        400
      );
      this.backgroundSizeY = this.$util.helper.clamp(
        current * evt.zoom,
        100,
        400
      );
    }
  },
  destroyed() {}
};
</script>

<style scoped>
.replace-img {
  display: block;
  background-position: center;
  background-repeat: no-repeat;
}
.circular {
  border-radius: 50%;
}
</style>

