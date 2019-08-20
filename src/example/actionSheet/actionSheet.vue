<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left back-link="Back"></f7-nav-left>
      <f7-nav-title>打开按钮菜单</f7-nav-title>
    </f7-navbar>
    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button
            @click="open"
            fill
          >打开</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  methods: {
    /** 打开 */
    open() {
      this.$util.actionSheet.open([
        {
          text: "事件1",
          onClick: btn => {
            debugger;
          }
        },
        {
          text: "事件2",
          onClick: btn => {
            debugger;
          }
        }
      ]);
    }
  }
};
</script>

<style>
</style>