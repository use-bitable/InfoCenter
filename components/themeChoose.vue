<script lang="ts" setup>
const isDark = useDark()

const theme = ref(isDark ? "Dark" : "Light")

const themeList = ["Dark", "Light"]

watch(
  () => isDark.value,
  (newVal) => {
    theme.value = newVal ? "Dark" : "Light"
  },
)

function changeTheme(theme: string) {
  console.log("theme", theme)
  return () => {
    console.log("change to", theme)
    isDark.value = theme === "Dark" ? true : false
  }
}
</script>

<template>
  <el-dropdown
    style="width: 100%"
    placement="left"
    :hide-on-click="true"
    :teleported="true"
  >
    <div class="avatar-dropdown-item el-menu-item">
      <el-icon><ElIconPictureRounded /></el-icon>

      <span>{{ $t("menu.Appearance") }}</span>
      <el-icon size="small">
        <ElIconArrowRight />
      </el-icon>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in themeList"
          @click="changeTheme(item)()"
        >
          {{ $t(`theme.${item}`) }}
          <el-icon v-if="theme === item"><ElIconCheck /></el-icon>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.avatar-dropdown-item {
  text-decoration: none;
  height: 20px;
}
.el-menu-item:hover {
  background-color: transparent;
}
</style>
