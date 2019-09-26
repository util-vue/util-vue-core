<template>
  <f7-page>
    <util-nav title="菜单"></util-nav>
    <f7-page-content>

      <f7-swiper>
        <f7-swiper-slide>
          <util-image
            :src="src"
            :openCache="true"
            :openScal="true"
            mode="scaleToFill"
          ></util-image>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <util-image
            :src="src"
            :openCache="true"
            :openScal="true"
            mode="scaleToFill"
          ></util-image>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <util-image
            :src="src"
            :openCache="true"
            :openScal="true"
            mode="scaleToFill"
          ></util-image>
        </f7-swiper-slide>
      </f7-swiper>

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