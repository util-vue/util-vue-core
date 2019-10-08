<template>
  <img
    v-if="type === '1'"
    @click="clickHandle"
    v-lazy:background-image="isCacheExist ? currentUrl : ( currentUrl ? ( currentUrl + zoomUrl) : '')"
    :width="width"
    :height="height"
    :class="bindClass + ' replace-img' + (circular ?  ' circular' : '')"
    :style="{'background-size':modeStyle,'border-radius':radius}"
    :src="replaceSrc"
  />
  <img
    v-else
    @click="clickHandle"
    v-lazy="isCacheExist ? currentUrl : ( currentUrl ? ( currentUrl + zoomUrl) : '')"
    :width="width"
    :height="height"
    :class="bindClass + (circular ?  ' circular' : '')"
    :style="{'border-radius':radius}"
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
    /**
     * 类型： 1:默认：使用背景进行布局  2：使用src 直接渲染
     */
    type: {
      default() {
        return "1";
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
    /** 使用的图片缓存路径 */
    cacheDoc: {
      default() {
        return "_doc/download/";
      }
    }
  },
  data() {
    return {
      /** plus是否已经开启 */
      plusOpen: false,
      /** 图片真实加载地址 */
      currentUrl: "",
      /** 背景比例 横向比例 */
      backgroundSizeX: 100,
      /** 背景比例 纵向比例 */
      backgroundSizeY: 100,
      /** 缓存是否本地存在 */
      isCacheExist: false
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
        /*      return this.replaceSrcPrefix + "rectangle_2_1_replace.png"; */
        return this.currentUrl;
      var scaleParam = this.size.split(":");
      return (
        this.replaceSrcPrefix +
        `rectangle_${scaleParam[0]}_${scaleParam[1]}_replace.png`
      );
    }
  },
  watch: {
    src(val) {
      this.checkImgCache();
    }
  },
  created() {
    if (this.openCache) this.plusOpen = this.$util.plus.helper.isOpen();
    setTimeout(() => {
      this.checkImgCache();
    }, 50);
  },
  mounted() {},
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
    /**
     * 检测图片是否缓存，是就返回本地路径
     */
    checkImgCache() {
      if (!this.src || !this.plusOpen) {
        this.isCacheExist = false;
        this.currentUrl = this.src;
        return;
      }
      var _self = this;
      this.$util.plus.io.loadCacheFile(
        this.src,
        newPath => {
          this.isCacheExist = true;
          _self.currentUrl = newPath.fullPath;
        },
        e => {
          this.isCacheExist = false;
          _self.currentUrl = _self.src;
        },
        this.cacheDoc
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

