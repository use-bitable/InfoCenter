<script lang="ts" setup>
const route = useRoute()
console.log(route)
</script>

<template>
  <el-affix
    position="top"
    :offset="0"
  >
    <el-menu
      class="nav-bar"
      mode="horizontal"
      :router="true"
      :ellipsis="false"
      :default-active="route.path"
    >
      <el-menu-item class="logo">
        <div>
          <el-icon><SvgoLogo /></el-icon>
          支部党建信息库
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
  </el-affix>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.nav-bar {
  background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
  backdrop-filter: saturate(50%) blur(4px);
  background-size: 4px 4px;
}
</style>
