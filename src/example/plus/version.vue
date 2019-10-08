<template>
  <f7-page :page-content="false">
    <util-nav
      title="SqlLite数据库操作"
      :isBack="false"
    ></util-nav>
    <f7-page-content>
      <f7-list
        accordion-list
        inset
      >
        <f7-list-item
          accordion-item
          title="SqlLite"
        >
          <f7-accordion-content>
            <f7-list>
              <f7-list-item @click="getVersions">
                获取版本名称
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
    return {};
  },
  methods: {
    getVersions() {
      console.log("获取版本名称" + this.$util.plus.helper.getVersion());

      //alert('Application(apk/ipa) version：' + plus.runtime.version);
    }
  }
};
</script>
