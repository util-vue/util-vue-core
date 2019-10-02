<template>
  <f7-page>
    <util-upload-multiple v-model="images" :change="getUrl"></util-upload-multiple>

    <util-single-upload  type="1" v-model="avatar" :value="avatar" fileMode="img"></util-single-upload>
  </f7-page>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      images: [{
        id: null,
        name: null,
        size: 0,
        sizeExplain: null,
        type: null,
        url: "http://shopfile.touchodd.com/2e967ecb-051b-4ea6-8589-23007b662406.jpg"
      }],
      avatar: {
        id: null,
        name: null,
        size: 0,
        sizeExplain: null,
        type: null,
        url: "http://shopfile.touchodd.com/2e967ecb-051b-4ea6-8589-23007b662406.jpg"
      }
    };
  },
 watch: {
    avatar(val) {
    console.log(JSON.stringify(val));
    }
  },
  methods: {
    getUrl(val) {
     alert(JSON.stringify(val));
    }
  }
};
</script>