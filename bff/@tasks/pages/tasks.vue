<script setup lang="ts">
import { IDataSource } from '@interfaces'
import { columns } from '../data/member-columns'
import { useStorage } from '@vueuse/core'
import { UserRepository } from '@repositories'
import { Pencil } from 'lucide-vue-next';

const accessToken = useStorage('access_token', null)
const source: IDataSource = {
  root: 'data',
  // fields: [{
  //   type: 'number',
  //   name: 'value',
  //   map: 'id',
  // }, {
  //   type: 'string',
  //   name: 'label',
  //   map: 'attributes>name'
  // }],
  params: {
    include: 'roles',
  },
  beforeSend(p) {
    console.log('beforeSend', p)
  },
  beforeLoadComplete(res) {
    console.log('beforeLoadComplete', res)
  },
  fetch: UserRepository.fetch,
  patch: UserRepository.patch,
}
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-4 p-4 flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Welcome back!
        </h2>
        <p class="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <UserNav />
      </div>
    </div>
    <DataTable :columns="columns" :source="source"/>
  </div>
</template>
