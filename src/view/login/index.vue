<template>
  <div class="login">
    <el-form ref="ruleFormRef" :model="state.form" :rules="state.rules">
      <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
        <el-input v-model="state.form.account" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="state.form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();
const router = useRouter();

const state = reactive({
  form: {},
  rules: <FormRules>{
    account: [{ required: true, message: "未填写账号", trigger: "blur" }],
    password: [{ required: true, message: "未填写密码", trigger: "blur" }],
  },
});
type res = {
  code: string;
  dataValues: object;
  menus: any;
  token: string;
};
const onSubmit = function () {
  fetch("/api/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state.form),
  }).then((res) => {
    res.json().then((r) => {
      localStorage.setItem("token", JSON.stringify(r.token));
      localStorage.setItem("user", JSON.stringify(r.dataValues));
      localStorage.setItem("menus", JSON.stringify(r.menus));
      router.push('/')
    });
  });
};
</script>

<style>
.login {
  position: fixed;
  left: 50%;
  top: 40%;
  translate: -50%;
}
</style>