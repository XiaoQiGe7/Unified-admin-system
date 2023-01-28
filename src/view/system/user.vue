<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <el-dialog v-model="state.dialogVisible" title="添加用户" @closed="initState">
      <el-form ref="ruleFormRef" :model="state.form" :rules="state.rules">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="state.form.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
          <el-input v-model="state.form.account" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="state.form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="email" :label-width="formLabelWidth" prop="email">
          <el-input v-model="state.form.email" autocomplete="off" />
        </el-form-item>

        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-tree-select
            v-model="state.form.roleId"
            :data="state.roleData"
            :props="props"
            check-strictly
            @current-change="check"
            :render-after-expand="false"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="initState">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-table :data="state.userData" row-key="id" default-expand-all>
      <el-table-column prop="userName" label="用户名称" />
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="email" label="email" />
      <el-table-column prop="roleName" label="所属角色" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scoped">
          <el-button link type="primary" size="small" @click="edit(scoped.row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="del(scoped.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import {onBeforeMount} from "vue"
import type {FormInstance,FormRules} from 'element-plus'
import {translateDataToTree} from "@/util/index.js"

const formLabelWidth = '140px'
const ruleFormRef = ref<FormInstance>()
const props = {
  value: "id",
  label: "name",
  children: "children",
};
const state = reactive({
  dialogVisible:false,
  form:{},
  formState:"",
  rules:<FormRules>({
    userName:[{ required: true, message: '未填写名称', trigger: 'blur' },],
    account:[{ required: true, message: '未填写名称', trigger: 'blur' },],
    password:[{ required: true, message: '未填写名称', trigger: 'blur' },],
  }),
  userData: [],
  roleData:[]
})
const add = function () {
  state.dialogVisible = true
  state.formState = 'add'
}
const edit = function (user) {
  state.form = user
  state.dialogVisible = true
  state.formState = 'edit'
}
const role = {
  roleId:'',
  roleName:''
}
const confirm = async function (formEl: FormInstance | undefined) {
  await formEl.validate((valid,fields) => {
    if(valid) {
      state.formState === 'add' ? addUser() : editUser()
    }
  })
}
const check = function (data) {
  role.roleId = data.id
  role.roleName = data.name
}
const addUser = async function () {
  const obj = {...state.form,...role}
  fetch("/api/register",{
    method:"post",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify(obj)
  }).then((r) => {
    getUserData()
  })
  initState()
}
const editUser = async function () {
  const obj = {...state.form,...role}
  fetch("/api/system/upUser",{
    method:"post",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify(obj)
  }).then((r) => {
    getUserData()
  })
  initState()
}
const del = function (user) {
  fetch(`/api/system/delUser?id=${user.id}`).then((res) => {
    getUserData()
  })
}
const initState = function () {
  state.form = {}
  role.roleId = ''
  role.roleName = ''
  state.dialogVisible = false
}
const getUserData = function () {
  fetch("/api/system/getAllUser").then((res) => {
    res.json().then(r => {
      state.userData = r
    })
  })
}
const getRoleData = function () {
  fetch("/api/system/getAllRole").then((res) => {
    res.json().then(r => {
      state.roleData = translateDataToTree(r)
    })
  })
}
onBeforeMount(() => {
  getUserData()
  getRoleData()
})
</script>

<style>
</style>