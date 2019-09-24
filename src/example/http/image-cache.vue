<template>
  <f7-page>
    <util-nav title="菜单"></util-nav>
    <f7-page-content>
      <util-image
        :src="src"
        :plusCache="true"
        mode="aspectFill"
      ></util-image>
    </f7-page-content>
  </f7-page>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      src: undefined
    };
  },
  async mounted() {
    setTimeout(() => {
      this.src = "http://developfile.touchodd.com/BitmapCopy.png";
    }, 1000);
  },
  methods: {}
};
</script>

<style>
</style>