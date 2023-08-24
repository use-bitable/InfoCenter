<script lang="ts" setup>
useHead({
  title: "登录",
})
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
})
const { signIn, status } = useAuth()

async function test() {
  const res = await signIn({
    username: "test",
    password: "test",
  })
  console.log(status)
  console.log("login test", res)
  alert(res)
}
</script>
<template>
  <el-button @click="test()">test</el-button>
  <!-- <el-form>

  </el-form> -->
</template>
