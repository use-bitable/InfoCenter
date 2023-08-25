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
  let res
  try {
    res = await signIn(
      {
        username: "202005070223",
        password: "qian12345",
      },
      {
        redirect: true,
        callbackUrl: "/",
      },
    )
    console.log(res)
  } catch (e) {
    console.log(status)
    console.log("login test", e)
  }
}
</script>
<template>
  <el-button @click="test()">test</el-button>
  <!-- <el-form>

  </el-form> -->
</template>
