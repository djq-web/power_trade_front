<template>
  <v-card flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>
    <v-divider></v-divider>
    <v-data-table v-model:search="search" :headers="headers" :items="items">
      <template v-slot:item.operate="{ item }">
        <div class="text-end" v-if="item.role === 'Admin'">
          <v-btn
            color="blue"
            text="删除"
            class="text-uppercase"
            variant="text"
            @click="deleteUser(item)"
          ></v-btn>
        </div>
      </template>
    </v-data-table>
    <Dialog ref="dialog" @handleDialog="sureDelete()"></Dialog>
  </v-card>
</template>

<script setup lang="ts">
import { IUser } from '@/types/user';
import { ref } from 'vue';
import Dialog from '@/components/Dialog.vue';
const search = ref('');
const dialog = ref<InstanceType<typeof Dialog>>();
const headers: any[] = [
  {
    align: 'start',
    key: 'username',
    title: '用户名',
  },
  { key: 'role', title: '角色' },
  { key: 'createdAt', title: '创建日期' },
  { align: 'end', key: 'operate', title: '操作', sortable: false },
];
const items: IUser[] = [
  {
    id: '123',
    username: 'Phoenix RTX 3080',
    role: 'Admin',
    createdAt: '2025-04-01',
    operate: 'Edit',
  },
  {
    id: '334',
    username: 'Galaxy RTX 3080',
    role: 'user',
    createdAt: '2025-04-02',
    operate: 'Edit',
  },
  {
    id: '3324',
    username: 'Orion RX 6800 XT',
    role: 'Admin',
    createdAt: '2025-04-01',
    operate: 'Edit',
  },
  {
    id: '433',
    username: 'Vortex RTX 3090',
    role: 'Admin',
    createdAt: '2025-04-02',
    operate: 'Edit',
  },
  {
    id: '5454',
    username: 'Cosmos GTX 1660 Super',
    role: 'user',
    createdAt: '2025-04-03',
    operate: 'Edit',
  },
];

const deleteUser = (item: IUser) => {
  console.log(item);
  dialog.value?.openDialog();
};
const sureDelete = () => {
  // 删除用户
  console.log('删除用户');
};
</script>

<style lang="scss" scoped></style>
