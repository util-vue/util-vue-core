<template>
  <f7-page>
    <util-nav title="图片播放器"></util-nav>
    <f7-page-content>
      <swiper :options="swiperOption" style="height:400px">
        <swiper-slide
          v-for="(item, index) in images"
          :key="index"
        >
          <div class="swiper-zoom-container">
            <img :src="item">
          </div>
        </swiper-slide>
        <div
          class="swiper-pagination swiper-pagination-white"
          slot="pagination"
        ></div>
        <div
          class="swiper-button-prev"
          slot="button-prev"
        ></div>
        <div
          class="swiper-button-next"
          slot="button-next"
        ></div>
      </swiper>
    </f7-page-content>
  </f7-page>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      swiperOption: {
        zoom: true,
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      images: [
        "http://qiniu.orderdeliveryplatform.touchodd.com/Resources/006079d6-c4f0-46a0-93a0-3dd9594f1349/20190807/jpg/4ab249e3-0419-4703-a370-ea7c8d5441a9/jpg[Source].jpg?imageView2/0/w/2560",
        "http://qiniu.orderdeliveryplatform.touchodd.com/Resources/006079d6-c4f0-46a0-93a0-3dd9594f1349/20190807/jpg/de9cb642-7e67-4550-896d-8668f9eccfed/jpg[Source].jpg?imageView2/0/w/2560",
        "http://qiniu.orderdeliveryplatform.touchodd.com/Resources/006079d6-c4f0-46a0-93a0-3dd9594f1349/20190807/jpg/3a8cff82-bad0-40a3-bb0a-0cefcbe109f9/jpg[Source].jpg?imageView2/0/w/2560"
      ]
    };
  },
  async mounted() {},
  methods: {
    open() {}
  }
};
</script>

<style>
</style>