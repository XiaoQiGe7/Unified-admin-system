<template>
  <el-tree-select
    v-model="value"
    :data="data"
    multiple
    style="width:100%;height:208px"
    :prop="props"
    :render-after-expand="false"
    @change="check"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const valueStrictly = ref();
const props = {
  value: "id",
  label: "name",
  children: "children",
};
const value = ref()
const data = [
  {
    id: "1",
    name: "Level one 1",
    children: [
      {
        id: "1-1",
        name: "Level two 1-1",
        children: [
          {
            id: "1-1-1",
            name: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Level one 2",
    children: [
      {
        id: "2-1",
        name: "Level two 2-1",
        children: [
          {
            id: "2-1-1",
            name: "Level three 2-1-1",
          },
        ],
      },
      {
        id: "2-2",
        name: "Level two 2-2",
        children: [
          {
            id: "2-2-1",
            name: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Level one 3",
    children: [
      {
        id: "3-1",
        name: "Level two 3-1",
        children: [
          {
            id: "3-1-1",
            name: "Level three 3-1-1",
          },
        ],
      },
      {
        id: "3-2",
        name: "Level two 3-2",
        children: [
          {
            id: "3-2-1",
            name: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];
const check = function (val) {
  console.log(val,value)
}
// const checkChange = function (data) {
//   if (Array.isArray(data)) {
//     for (const d of data) {
//       addOfRemove(d);
//     }
//   } else {
//     addOfRemove(data);
//   }
// };
// const addOfRemove = function (data) {
//   const index = ids.indexOf(data.id);
//   index >= 0 ? ids.splice(index, 1) : ids.push(data.id);
//   if (data.children) {
//     checkChange(data.children);
//   }
// };
// check-change	当复选框被点击的时候触发	共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
// check	点击节点复选框之后触发	共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性

</script>