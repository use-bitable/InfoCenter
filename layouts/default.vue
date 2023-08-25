<script>
import Navigation from "~/components/Navigation.vue"
</script>

<template>
  <el-container>
    <el-header style="padding: 0">
      <Navigation />
    </el-header>
    <el-main>
      <slot />
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>
