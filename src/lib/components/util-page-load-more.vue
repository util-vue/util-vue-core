<template>
  <div style="margin-top:10px;text-align:center">
    <div
      class="flex flex-content-center-center block"
      v-if="queryModel.pagePreloader"
    >
      <f7-preloader></f7-preloader>
    </div>
    <label
      v-if="!queryModel.isNoData && !queryModel.isPulldown && !queryModel.pagePreloader"
      class="data-end"
    >我是有底线的</label>
    <div
      v-if="queryModel.isNoData && type == 'order'"
      class="text-center"
    >
      <svg>
        <use :xlink:href="'#icon-icon_dingdan_kong'"></use>
      </svg>
      <div
        align="center"
        class="remark-sm-text data-title"
      >清单为空</div>
    </div>
    <div
      v-if="queryModel.isNoData && type == 'collection'"
      class="text-center"
    >
      <svg>
        <use :xlink:href="'#icon-icon_shoucang_kong'"></use>
      </svg>
      <div
        align="center"
        class="remark-sm-text data-title"
      >暂无数据</div>
    </div>
    <div
      v-if="queryModel.isNoData && type == 'solution'"
      class="text-center"
    >
      <div
        align="center"
        class="remark-sm-text data-title"
      >{{name}}</div>
    </div>
    <div
      v-if="queryModel.isNoData && type == 'news'"
      class="text-center"
    >
      <svg>
        <use :xlink:href="'#icon-icon_xiaoxi_kong'"></use>
      </svg>
      <div
        align="center"
        class="remark-sm-text data-title"
      >暂无消息</div>
    </div>
    <label
      v-if="queryModel.isNoData && !type"
      class="data-end"
    >没有数据</label>
  </div>
</template>

<script>
export default {
  props: {
    queryModel: {
      default() {
        return {};
      }
    },
    type: {
      //order:清单,collection：收藏,news:消息,solution:方案
      default() {
        return null;
      }
    },
    name: {
      default() {
        return "暂无数据";
      }
    }
  }
};
</script>

<style scoped>
.data-title,
.data-end {
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: #b2b2b2;
  margin-top: 30px;
  font-weight: 400;
}
</style>
