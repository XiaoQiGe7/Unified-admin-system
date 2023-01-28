<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <el-dialog v-model="state.dialogVisible" title="添加角色" @closed="initState">
      <el-form ref="ruleFormRef" :model="state.form" :rules="state.rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="上级角色" :label-width="formLabelWidth">
          <el-tree-select v-model="state.form.parentId" :data="state.roleData" check-strictly :props="{label:'name',value:'id'}"/>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="formLabelWidth">
          <el-tree-v2
          v-if="state.dialogVisible"
            :data="state.menuData"
            :props="props"
            @check="check"
            show-checkbox
            ref="elTreeV2"
            style="width:100%;height:208px"
            :default-checked-keys="state.menuIds"
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

    <el-table :data="state.roleData" row-key="id" default-expand-all>
      <el-table-column prop="name" label="Name" />
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
// import {uuid} from "@/util/random.js"
import {translateDataToTree,reSameArr} from "@/util/index.js"
const formLabelWidth = '140px'
const ruleFormRef = ref<FormInstance>()
const props = {
  value: "id",
  label: "name",
  children: "children",
};
// const elTreeV2 = ref()
const state = reactive({
  dialogVisible:false,
  form:{},
  formState:"",
  rules:<FormRules>({name:[{ required: true, message: '未填写名称', trigger: 'blur' },],}),
  menuIds:[],
  menuData:[],
  roleData: []
})
let checkIds = []
const add = function () {
  state.dialogVisible = true
  state.formState = 'add'
}
const edit = function (role) {
  state.form = role
  // elTreeV2.value?.setCheckedKeys(state.menuIds)
  getRoleRelationMenu(role.id)
  state.dialogVisible = true
  state.formState = 'edit'
}
const getRoleRelationMenu = function (roleId) {
  fetch(`/api/system/getRoleRelationMenu?roleId=${roleId}`).then((res) => {
    res.json().then(r => {
      state.menuIds = r
    })
  })
}
const check = function (data,info: { checkedKeys}) {
  checkIds = info.checkedKeys
}
const confirm = async function (formEl: FormInstance | undefined) {
  await formEl.validate((valid,fields) => {
    if(valid) {
      state.formState === 'add' ? addRole() : editRole()
    }
  })
}

const addRole = async function () {
  const obj = {...state.form,ids:state.menuIds}
  fetch("/api/system/addRole",{
    method:"post",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify(obj)
  }).then((r) => {
    getRoleData()
  })
  initState()
}
const editRole = async function () {
  const {arr,newArr} = reSameArr(state.menuIds,checkIds)
  const obj = {
    ids:arr,
    newIds:newArr,
    ...state.form
  }
  fetch("/api/system/upRole",{
    method:"post",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify(obj)
  }).then((r) => {
    getRoleData()
  })
  initState()
}
const del = function (role) {
  fetch(`/api/system/delRole?id=${role.id}`).then((res) => {
    getRoleData()
  })
}
const initState = function () {
  state.form = {}
  state.menuIds.splice(0)
  state.dialogVisible = false
}
const getRoleData = function () {
  fetch("/api/system/getAllRole").then((res) => {
    res.json().then(r => {
      state.roleData = translateDataToTree(r)
    })
  })
}
const getMenuData = function () {
  fetch("/api/system/getAllMenu").then((res) => {
    res.json().then(r => {
      state.menuData = translateDataToTree(r)
    })
  })
}
onBeforeMount(() => {
  getRoleData()
  getMenuData()
})
</script>

<style>
</style>