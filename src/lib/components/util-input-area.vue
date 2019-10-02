<template>
       <input type="text" :placeholder="placeholder" v-model="inputText" @click="openSelect" :required="required" validate onfocus="this.blur();">
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  /** 更新 */
  props: {
    lable: {
      default() {
        return "地区";
      }
    },
    placeholder: {
      default() {
        return "请选择省-市-区";
      }
    },
    /** 值 */
    value: {
      default() {
        return "";
      }
    },
    /** 是否存在必选 */
    required: {
      default() {
        return false;
      }
    },
    isShowIcon: {
      default() {
        return true;
      }
    },
    isShowRequiredIcon: {
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      inputText: "",
      areaPicker: undefined
    };
  },
  computed: {
    ...mapState("area", {
      areaDatas: state => state.allAreaData
    }),
    ...mapGetters("area", [
      "getAreaAllItem",
      "getAreaHasNullItem",
      "getAreaAllItem"
    ])
  },
  watch: {
    value(val) {
      if (!val || !val.countyId) return;
      var _self = this;
      this.inputText =
        _self.value.province +
        "-" +
        _self.value.city +
        "-" +
        _self.value.county;
      setTimeout(() => {
        _self.areaPicker.setValue([
          _self.value.provinceId,
          _self.value.cityId,
          _self.value.countyId
        ]);
      }, 20);
    }
  },
  /** 双向绑定 */
  model: {
    prop: "value",
    event: "change"
  },
  async mounted() {
    if (this.value) {
       this.inputText =
        this.value.province +
        "-" +
        this.value.city +
        "-" +
        this.value.county;
      this.$emit("change", this.value.countyId);
    }
    this.areaPicker = await this.createAreaPickerComponent(this.pickerChange);
  },
  methods: {
    ...mapActions("area", ["createAreaPickerComponent"]),
    /** 打开选择 */
    openSelect() {
      this.areaPicker.open();
    },
    /** 清空 */
    clearValue() {
      this.inputText = "";
      this.$emit("change", "");
    },
    /**选择变化*/
    pickerChange(picker, id, level) {
      if (level !== 3) return;
      this.areaItem = this.getAreaAllItem(id);
      this.inputText =
        this.areaItem[0].name +
        "-" +
        this.areaItem[1].name +
        "-" +
        this.areaItem[2].name;
      this.$emit("change", id);
      var items = this.getAreaAllItem(id);
      this.$emit("changeItems", items);
      if (items)
        this.$emit("changeAddress", {
          province: items[0].name,
          provinceId: items[0].id,
          city: items[1].name,
          cityId: items[1].id,
          county: items[2].name,
          countyId: items[2].id
        });
    }
  }
};
</script>
<style scoped>
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 0.5px solid #e2e2e2;
  min-height: 117px;
  margin: 0;
  padding-left: 45px;
  padding-right: 60px;
  box-sizing: border-box;
}
.list.no-line{
  border-bottom: 0;
}
.list .icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.list-name {
  font-size: 28px;
  color: #222222;
}
.list-value {
  color: #666666;
  font-size: 28px;
  position: relative;
  width: calc(100% - 200px);
  text-align: right;
}
.list-value::after {
  text-align: center;
  display: block;
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  margin-top: -10px;
  right: -20px;
  content: "";
  border-top: 1px solid #999999;
  border-right: 1px solid #999999;
  transform: rotate(45deg);
}
.list-value.input::after {
  display: none;
}
.list-value img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin: 10px 0;
  float: right;
}
.list-value input {
  width: 100%;
  font-size: 28px;
  text-align: right;
}
</style>