<template>
  <div class="login">
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
      <div class="d-flex flex-column">
        <v-btn
          class="mt-4"
          color="#409eff"
          block
          @click="validate"
          :loading="loading"
        >
          登录
        </v-btn>
      </div>
      <div class="resistor"><span @click="goRegister()">注册</span></div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import CryptoJS from 'crypto-js';
const router = useRouter();
const form = ref();
const userInfo = reactive({
  username: '',
  password: '',
});
const loading = ref(false);
const nameRules = ref([(v: string) => !!v || '请输入用户名']);
const passwordRules = ref([(v: string) => !!v || '请输入密码']);
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
const goRegister = () => {
  router.push('/register');
};
</script>

<style lang="scss" scoped>
.login {
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
