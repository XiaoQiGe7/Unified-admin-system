<template>
  <div>
    <el-button type="primary" @click="state.dialogVisible = true">添加</el-button>

    <el-dialog v-model="state.dialogVisible" title="添加菜单" @closed="initState">
      <el-form ref="ruleFormRef" :model="state.form" :rules="state.rules">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路由地址" :label-width="formLabelWidth" prop="path">
          <el-input v-model="state.form.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label="vue文件路径" :label-width="formLabelWidth" prop="component">
          <el-input v-model="state.form.component" autocomplete="off" />
        </el-form-item>
        <el-form-item label="级别" :label-width="formLabelWidth">
          <el-select v-model="state.level" class="m-2" placeholder="Select" size="large">
            <el-option
              v-for="item in state.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 当选择了二级菜单后不选择父级，会报错 -->
        <el-form-item label="父级" :label-width="formLabelWidth">
          <el-tree-select v-model="state.form.parentId" :data="state.menuData" check-strictly="true" :props="{label:'name',value:'id'}" :disabled="!state.level"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="initState">Cancel</el-button>
          <el-button type="primary" @click="addMenu(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-table :data="state.menuData" row-key="id" default-expand-all>
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="path" label="path" />
      <el-table-column prop="component" label="component" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import {onBeforeMount} from "vue"
import type {FormInstance,FormRules} from 'element-plus'
// import {uuid} from "@/util/random.js"
import {translateDataToTree} from "@/util/index.js"
const formLabelWidth = '140px'
const ruleFormRef = ref<FormInstance>()
const state = reactive({
  dialogVisible:false,
  form:{},
  rules:<FormRules>({
    name:[{ required: true, message: '未填写菜单名称', trigger: 'blur' },],
    path:[{ required: true, message: '未填写路由地址', trigger: 'blur' },],
    component:[{ required: true, message: '未填写vue文件路径', trigger: 'blur' },],
  }),
  level:0,
  options:[
    {
      value: 0,
      label: '一级',
    },
    {
      value: 1,
      label: '二级',
    },
  ],
  menuData: []
})



const addMenu = async function (formEl: FormInstance | undefined) {
  await formEl.validate((valid,fields) => {
    if(valid) {
      fetch("/api/system/addMenu",{
        method:"post",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(state.form)
      }).then((r) => {
        getMenuData()
      })
      initState()
    }
  })
}
const initState = function () {
  state.form = {}
  state.level = 0
  state.dialogVisible = false
}
const getMenuData = function () {
  fetch("/api/system/getAllMenu").then((res) => {
    res.json().then(r => {
      state.menuData = translateDataToTree(r)
    })
  })
}
onBeforeMount(() => {
  getMenuData()
})
</script>

<style>
</style>