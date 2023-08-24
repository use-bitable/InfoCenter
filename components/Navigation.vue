<script lang="ts" setup>
const route = useRoute()
console.log(route)
</script>

<template>
  <el-menu
    mode="horizontal"
    :router="true"
    :ellipsis="false"
    :default-active="route.path"
  >
    <el-menu-item class="logo">
      <div>
        <el-icon><SvgoLogo /></el-icon>
        生物工程本科生党支部党建信息库
      </div>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/"> {{ $t("menu.Home") }} </el-menu-item>
    <el-menu-item index="/about"> {{ $t("menu.About") }} </el-menu-item>
    <div style="display: flex; align-items: center">
      <el-divider
        style="height: 80%"
        direction="vertical"
      ></el-divider>
    </div>

    <div>
      <UserAvatar />
    </div>
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
