<template>
  <img
    @click="clickHandle"
    v-lazy:background-image=" src ? ( src + zoomUrl) : ''"
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
</template>

<script>
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
    }
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
          return "100% 100%";
        case "aspectFit":
          return "contain";
        case "aspectFill":
          return "cover";
      }
      return this.mode;
    },
    /** 替换地址 */
    replaceSrc() {
      if (!this.size) return "static/replace/rectangle_2_1_replace.png";
      var scaleParam = this.size.split(":");
      return `static/replace/rectangle_${scaleParam[0]}_${
        scaleParam[1]
      }_replace.png`;
    }
  },
  methods: {
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
    }
  }
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

