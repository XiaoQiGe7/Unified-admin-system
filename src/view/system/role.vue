<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="path" label="path" sortable />
      <el-table-column prop="name" label="Name" sortable />
      <el-table-column prop="component" label="component" sortable />
    </el-table>
  </div>
</template>
<script lang="ts" setup>
const tableData = [
  {
    id: "236a93c6-3bb9-47e8-b606-114126d6ed42",
    name: "博客管理",
    path: "/blog",
    component: "/blog",
    parentId: null,
    hasChildren: true,
    sort: null,
    createdAt: "2023-01-20T11:14:55.000Z",
    updatedAt: "2023-01-20T11:14:55.000Z",
  },
  {
    id: "bc49226f-4ada-4117-b128-15907ecda967",
    name: "系统管理",
    path: "/system",
    component: "/system",
    parentId: null,
    hasChildren: true,
    sort: null,
    createdAt: "2023-01-20T08:54:04.000Z",
    updatedAt: "2023-01-20T08:54:04.000Z",
    children: [
      {
        id: "01e6165f-b969-4117-8291-9ceea0c4fb73",
        name: "菜单管理",
        path: "/system/menu",
        component: "/system/menu",
        parentId: "bc49226f-4ada-4117-b128-15907ecda967",
        hasChildren: true,
        sort: null,
        createdAt: "2023-01-20T09:15:17.000Z",
        updatedAt: "2023-01-20T09:15:17.000Z",
      },
    ],
  },
];
</script>
