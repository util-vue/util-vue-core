<template>
  <f7-page :page-content="false">
    <util-nav
      title="Util框架示例"
      :isBack="false"
      :rightBtns="btns"
    ></util-nav>
    <f7-page-content>
      <f7-list
        accordion-list
        inset
      >
        <f7-list-item
          accordion-item
          title="数据请求"
        >
          <f7-accordion-content>
            <f7-list>
              <f7-list-item>
                <f7-link href="/http/">数据请求</f7-link>
              </f7-list-item>
              <f7-list-item>
                <f7-link href="/comment/">评论</f7-link>
              </f7-list-item>
              <f7-list-item>
                <f7-link href="/imageCache/">图片与离线缓存</f7-link>
              </f7-list-item>
              <f7-list-item>
                <f7-link href="/photoSwiper/">图片播放器</f7-link>
              </f7-list-item>
              <f7-list-item>
                <f7-link href="/area">地区选择</f7-link>
              </f7-list-item>

            </f7-list>
          </f7-accordion-content>
        </f7-list-item>
        <f7-list-item
          accordion-item
          title="按钮菜单"
        >
          <f7-accordion-content>
            <f7-list>
              <f7-list-item>
                <f7-link href="/http/">数据请求</f7-link>
              </f7-list-item>
            </f7-list>
          </f7-accordion-content>
        </f7-list-item>

        <f7-list-item
          accordion-item
          title="导航栏"
        >
          <f7-accordion-content>
            <f7-list>
              <f7-list-item>
                <f7-link href="/utilNav/">普通</f7-link>
              </f7-list-item>
              <f7-list-item>
                <f7-link href="/utilNavSearch/">带有搜索搜索</f7-link>
              </f7-list-item>
              <f7-list-item>
                <f7-link href="/version">获取版本号</f7-link>
              </f7-list-item>
              <f7-list-item>
                <f7-link href="/images">圖片</f7-link>
              </f7-list-item>
            </f7-list>
            <f7-list>
              <f7-list-item>
                <f7-link href="/sqlLite">SqlLite操作</f7-link>
              </f7-list-item>

              <f7-list-item>
                <f7-link href="/camera">图片上传</f7-link>
              </f7-list-item>
            </f7-list>
          </f7-accordion-content>
        </f7-list-item>
      </f7-list>
    </f7-page-content>
  </f7-page>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      btns: [
        {
          ic: "iconfont icon-github",
          click: this.git
        }
      ]
    };
  },
  mounted() {
    this.getArea();
  },
  methods: {
    ...mapActions("area", ["getAreaAll"]),
    async getArea() {
      await this.getAreaAll();
    },
    /** 修改地址 */
    changeAddress(address) {
      this.address = address;
    },

    git() {
      window.location.href = "https://github.com/util-vue/util-vue-core";
    }
  }
};
</script>

<style>
</style>