<template>
  <f7-navbar
    class="util-title"
    :style="titleStyle"
    :sliding="true"
  >
    <template v-if="mode == 1">
      <util-nav-bar
        :isBack="isBack"
        :isLeft="true"
        :btns="leftBtns"
      >
        <slot
          name="left"
          slot="left"
        ></slot>
      </util-nav-bar>
      <f7-nav-title :class="{ 'util-title-center': titleCenter}">
        {{title}}
      </f7-nav-title>
      <util-nav-bar :btns="rightBtns">
        <slot
          name="right"
          slot="right"
        ></slot>
      </util-nav-bar>
    </template>

    <template v-if="mode == 2">
      <util-nav-bar
        :isBack="isBack"
        :isLeft="true"
        :btns="leftBtns"
      >
        <slot
          name="left"
          slot="left"
        ></slot>
      </util-nav-bar>
      <f7-nav-title>
        <div class="search-bg">
          <i class="iconfont icon-icon_sousuo1"></i>
          <input
            class="search-input"
            v-model="searchValue"
            type="search"
            name="search"
            maxlength="50"
            :placeholder="searchPlaceholder"
            @keypress="searchKeypress"
            @focus="foucusClick"
          />
        </div>
      </f7-nav-title>
      <util-nav-bar :btns="rightBtns"></util-nav-bar>
    </template>

    <template v-if="mode == 3">
      <util-nav-bar
        :isBack="isBack"
        :isLeft="true"
        :btns="leftBtns"
      ></util-nav-bar>
      <f7-nav-title>
        <slot></slot>
      </f7-nav-title>
      <util-nav-bar :btns="rightBtns"></util-nav-bar>
    </template>

  </f7-navbar>
</template>

<script>
import UtilNavBar from "./util-nav-bar";

export default {
  components: { UtilNavBar },
  props: {
    /** 滑动隐藏 */
    sliding: {
      default: function() {
        return false;
      }
    },
    /** 标题居中 */
    titleCenter: {
      default: function() {
        return false;
      }
    },
    /** 是否存在默认返回按钮 */
    isBack: {
      default: function() {
        return true;
      }
    },
    /** 1文字  2居中搜索栏目  3居中插槽自定义 */
    mode: {
      default: function() {
        return 1;
      }
    },
    /** 文字标题 */
    title: {
      default: function() {
        return "";
      }
    },
    /** 文字颜色 */
    color: {
      default: function() {
        return "var(--f7-navbar-color)";
      }
    },
    /** 导航栏背景色 */
    background: {
      default: function() {
        return "var(--f7-navbar-background)";
      }
    },
    /** 查询输入框标题 */
    searchLable: {
      default: function() {
        return "搜索";
      }
    },
    /** 查询输入框占位符 */
    searchPlaceholder: {
      default: function() {
        return "请输入关键字查询";
      }
    },
    /** 左侧按钮 按钮对象格式 { ic:'icon-icon-xxxxx',text:'文字', click:func  } */
    leftBtns: {
      default: function() {
        return [];
      }
    },
    /** 右侧按钮 按钮对象格式 { ic:'icon-icon-xxxxx',text:'文字', click:func  } */
    rightBtns: {
      default: function() {
        return [];
      }
    },
    /** 查询默认值 */
    searchDefaultValue: {
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      /** 查询文字 */
      searchValue: ""
    };
  },
  mounted() {
    this.searchValue = this.searchDefaultValue;
  },
  watch: {
    searchDefaultValue(val) {
      this.searchValue = val;
    }
  },
  computed: {
    titleStyle() {
      return {
        color: this.color,
        background: this.background
      };
    }
  },
  methods: {
    /** 按钮点击事件 */
    btnClick(item) {
      this.$emit("btnClick", item);
    },
    /** 执行查询 */
    searchKeypress(e) {
      var keycode = e.keyCode;
      if (keycode == "13") {
        event.preventDefault();
        if (e.currentTarget) e.currentTarget.blur();
        this.$emit("search", this.searchValue);
      }
    },
    /** 获取焦点事件 */
    foucusClick() {
      this.$emit("foucusClick", null);
    }
  }
};
</script>

<style>
:root {
  --f7-navbar-title-font-size: 42px;
}

.icon {
  font-size: 42px !important;
}
</style>

<style scope>
.util-title {
  /* border-bottom: 0.5px solid #ffd2d2d2; */
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  font-size: var(--f7-navbar-title-font-size);
  font-family: "SourceHanSansSC-Bold";
}
.util-title .title {
  margin-left: 0px !important;
}
.util-title-default {
  height: 100%;
}

.util-title-default .left {
  flex: 1;
  height: 100%;
  line-height: 100%;
}

.util-title-default-center {
  width: 60%;
  height: 100%;
  line-height: 100%;
  font-weight: bold;
  font-size: 16px;
}

.util-title-default .right {
  flex: 1;
  height: 100%;
  line-height: 100%;
}

.search-bg {
  flex: 1;
  background: rgba(241, 241, 241, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  border-radius: 31px;
  height: 62px;
  margin-left: 7px;
  padding: 10px;
  line-height: 32px;
  position: relative;
}

.search-bg .icon-icon_sousuo1 {
  position: absolute;
  left: 12px;
  top: 28px;
  font-size: var(--f7-navbar-title-font-size);
}
.search-bg span {
  color: #9c9c9c;
  padding-left: 10px;
}

.search-bg .split {
  border-right: 0.5px solid #9c9c9c;
}

.search-bg .search-input {
  flex: 1;
  height: 62px;
  background: transparent;
  border: none;
  padding-left: 80px;
}
</style>
