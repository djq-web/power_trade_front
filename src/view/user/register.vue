<template>
  <div class="register">
    <v-form ref="form" class="login-form">
      <h3 class="title">能源交易管理系统</h3>
      <v-text-field
        v-model="userInfo.username"
        :counter="10"
        :rules="nameRules"
        label="账号"
        required
        auto-complete="off"
      ></v-text-field>
      <v-text-field
        v-model="userInfo.password"
        :counter="20"
        :rules="passwordRules"
        label="密码"
        type="password"
        required
        auto-complete="off"
      ></v-text-field>
      <v-text-field
        v-model="userInfo.confirmPassword"
        :counter="20"
        :rules="confirmPasswordRules"
        label="确认密码"
        type="password"
        required
        auto-complete="off"
      ></v-text-field>
      <div class="d-flex flex-column">
        <v-btn
          class="mt-4"
          color="#409eff"
          block
          @click="validate"
          :loading="loading"
        >
          注册
        </v-btn>
      </div>
      <div class="resistor">
        <span @click="goLogin()">使用已有账户登录</span>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import CryptoJS from 'crypto-js';
const router = useRouter();
const form = ref();
const loading = ref(false);
const userInfo = reactive({
  username: '',
  password: '',
  confirmPassword: '',
});
const validatePassword = (val: string) => {
  const pattern = /^[^<>"'|\\]+$/;
  if (pattern.test(val)) {
    return true;
  }
  return false;
};
const equalToPassword = (val: string) => {
  if (val === userInfo.password) {
    return true;
  } else {
    return false;
  }
};

const nameRules = ref([
  (v: string) => !!v || '请输入用户名',
  (v: string) =>
    (v && v.length <= 10 && v.length > 1) ||
    '用户账号长度必须介于 2 和 10 之间',
]);

const passwordRules = ref([
  (v: string) => !!v || '请输入密码',
  (v: string) =>
    (v && validatePassword(v)) || '不能包含非法字符：< > " \' \\\ |',
]);

const confirmPasswordRules = ref([
  (v: string) => !!v || '请输入确认密码',
  (v: string) => (v && equalToPassword(v)) || '两次输入的密码不一致',
]);

const validate = async () => {
  loading.value = true;
  const { valid } = await form.value.validate();
  loading.value = false;
  if (valid) {
    const params = {
      username: userInfo.username,
      password: CryptoJS.MD5(userInfo.password).toString(),
    };
    console.log('params', params);
  }
};
const goLogin = () => {
  router.push('/login');
};
</script>

<style rel="stylesheet/scss" lang="scss">
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../../assets/img/login-background.jpg');
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
  font-weight: 500;
  font-size: 16px;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px;
  .v-text-field {
    margin-bottom: 12px;
  }
  .resistor {
    margin-top: 16px;
    text-align: right;
    color: #337ab7;
    padding-right: 4px;
    font-size: 14px;
    span {
      cursor: pointer;
    }
  }
}
</style>
