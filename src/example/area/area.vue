<template>
  <f7-page>
        <util-input-area :isLastText="true" required @changeAddress="changeAddress" :closeState="gb"></util-input-area>
  </f7-page>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
        address: {}
    };
  },
  methods:{
    changeAddress(val){
          console.log(JSON.stringify(val));
    },
    gb(val){
     console.log(JSON.stringify(val));
    }
  }
};
</script>