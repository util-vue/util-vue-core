<template>
  <f7-page>
    <util-nav title="菜单"></util-nav>
    <f7-page-content>
      <f7-list no-hairlines-md>
        <f7-list-input
          label="手机号"
          type="text"
          placeholder="请输入11位手机号"
          clear-button
          :value="model.phoneNumber"
          @input="model.phoneNumber = $event.target.value"
        ></f7-list-input>

        <f7-list-input
          label="验证码"
          type="password"
          placeholder="请输入6位验证码"
          clear-button
          :value="model.token"
          @input="model.token = $event.target.value"
        ></f7-list-input>

      </f7-list>
      <f7-block>
        <f7-row>
          <f7-col>
            <f7-button
              @click="sendSms"
              fill
            >发送验证码</f7-button>
          </f7-col>
          <f7-col>
            <f7-button
              @click="login"
              fill
            >登录</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
      <f7-block>
        <f7-row>
          <f7-col>
            <f7-button
              fill
              round
              @click="sendGet"
            >获取数据</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
      {{datas}}
    </f7-page-content>
  </f7-page>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      datas: undefined,
      model: {
        phoneNumber: "",
        token: "",
        application: "inhome-app"
      }
    };
  },
  async mounted() {
    var result = await this.autoLoginAsync();
  },
  methods: {
    ...mapActions("user", [
      "sendLoginOrRegisterTokenAsync",
      "loginAsync",
      "autoLoginAsync"
    ]),
    /** 发送请求 */
    async sendGet() {
      var datas = await this.autoLoginAsync();
      if (!datas) return;
      this.datas = datas;
    },
    /** 发送请求 */
    async sendSms() {
      var result = await this.sendLoginOrRegisterTokenAsync(this.model);
      debugger;
    },
    /** 发送请求 */
    async login() {
      var result = await this.loginAsync(this.model);
      if (!result) return;
      var datas = await this.autoLoginAsync(result);
    }
  }
};
</script>

<style>
</style>