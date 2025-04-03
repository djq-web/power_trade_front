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
        :counter="10"
        :rules="passwordRules"
        label="密码"
        type="password"
        required
        auto-complete="off"
      ></v-text-field>
      <div class="d-flex flex-column">
        <v-btn class="mt-4" color="success" block @click="validate">
          登录
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const form = ref();
const userInfo = reactive({
  username: '',
  password: '',
});
const loading = ref(false);
const nameRules = ref([(v: string) => !!v || '请输入用户名']);
const passwordRules = ref([(v: string) => !!v || '请输入密码']);
async function validate() {
  loading.value = true;
  const { valid } = await form.value.validate();
  loading.value = false;
  if (valid) alert('Form is valid');
}
</script>

<style  lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login-background.jpg');
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
</style>
