<script lang="ts" setup>
const isDark = useDark()
useHead({
  titleTemplate: "%s | 生物工程本科生党支部党建信息库",
})
</script>

<template>
  <el-config-provider>
    <el-container>
      <el-header style="padding: 0">
        <Navigation />
      </el-header>
      <el-main>
        <NuxtPage />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-config-provider>
</template>
