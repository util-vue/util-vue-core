<template>
  <f7-page>
    <div class="list list-form inline-labels no-hairlines-md">
      <ul>
        <util-input-area lable="地区" :isShowIcon="false" required @changeAddress="changeAddress"></util-input-area>
      </ul>
    </div>
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
  methods: {
    /** 修改地址 */
    changeAddress(address) {
      this.address = address;
    }
  }
};
</script>