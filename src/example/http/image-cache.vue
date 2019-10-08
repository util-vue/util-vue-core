<template>
  <f7-page>
    <util-nav title="菜单"></util-nav>
    <f7-page-content>
      <util-image
        zoom="500"
        size="4:1"
        :src="src"
        :openCache="true"
        mode="scaleToFill"
        cacheDoc="_doc/download/thum/"
      ></util-image>

      <util-image
        :src="src"
        :openCache="true"
        type="2"
        zoom="2160"
      ></util-image>

      <f7-block>
        <f7-row>
          <f7-col>
            <f7-button
              fill
              round
              @click="cacheResource"
            >缓存大图</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
      <f7-block>
        <f7-row>
          <f7-col>
            <f7-button
              fill
              round
              @click="cacheThum"
            >缓存小图</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>

    </f7-page-content>
  </f7-page>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      src: ""
    };
  },
  async mounted() {
    setTimeout(() => {
      this.src =
        "http://qiniu.daogouplatform.touchodd.com/客厅空4K.jpg";
    }, 3000);
  },
  methods: {
    cacheResource() {
      this.$util.plus.io.loadUrlFileAndCache(
        this.src + `?imageView2/2/w/1680/h/1680`,
        path => {
          this.$util.message.alert("缓存成功：" + JSON.stringify(path));
        },
        null,
        e => {
          console.log(e);
        }
      );
    },
    cacheThum() {
      this.$util.plus.io.loadUrlFileAndCache(
        this.src + `?imageView2/2/w/500/h/500`,
        path => {
          this.$util.message.alert("缓存成功：" + JSON.stringify(path));
        },
        null,
        e => {
          console.log(e);
        },
        "_doc/download/thum/"
      );
    }
  }
};
</script>

<style>
</style>