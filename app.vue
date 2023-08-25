<script lang="ts" setup>
const isDark = useDark()
useHead({
  titleTemplate: "%s | 生物工程本科生党支部党建信息库",
})
</script>

<template>
  <el-config-provider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>
