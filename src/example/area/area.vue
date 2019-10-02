<template>
  <f7-page>
        <util-input-area :isShowIcon="false" required @changeAddress="changeAddress"></util-input-area>
  </f7-page>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
        address: {}
    };
  }
};
</script>