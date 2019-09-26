<template>
  <f7-page>
    <util-nav title="菜单"></util-nav>
    <f7-page-content>
      <util-image
        :src="src"
        :openCache="true"
        :openScal="true"
        mode="scaleToFill"
      ></util-image>
    </f7-page-content>
  </f7-page>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      src: "http://developfile.touchodd.com/BitmapCopy.png"
    };
  },
  async mounted() {},
  methods: {}
};
</script>

<style>
</style>