<script lang="ts" setup>
import { UserInfo } from "types"

useHead({
  title: "个人信息",
})

const user = ref<UserInfo>()
</script>

<template>
  <div>User</div>
</template>
