<script lang="ts" setup>
const props = defineProps({
  sex: {
    type: String,
    default: "other",
  },
  name: {
    type: String,
  },
  group: {
    type: String,
  },
})

const { status, signOut, signIn } = useAuth()

const avatars: { [key: string]: string } = {
  man: "/icons/manAvatar.png",
  woman: "/icons/womanAvatar.png",
  other: "/icons/defaultAvatar.png",
}

const avatar = computed(() => avatars[props.sex])
onMounted(() => {
  console.log(status)
})
</script>

<template>
  <el-dropdown
    class="avatar-container"
    trigger="click"
    :hide-on-click="false"
    :disabled="status !== 'authenticated'"
  >
    <div>
      <el-avatar
        v-if="status === 'authenticated'"
        class="avatar"
        size="default"
      >
        <el-image :src="avatar"></el-image>
      </el-avatar>
      <el-button
        v-else
        type="primary"
        @click="navigateTo('/login')"
        >Login</el-button
      >
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          style="cursor: default"
          disabled
        >
          <el-row>
            <el-col :span="10">
              <el-avatar size="default">
                <el-image :src="avatar"></el-image>
              </el-avatar>
            </el-col>
            <el-col
              :span="10"
              :push="4"
            >
              <el-row>{{ name }}</el-row>
              <el-row>{{ group }}</el-row>
            </el-col>
          </el-row>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <nuxt-link
            class="avatar-dropdown-item el-menu-item"
            to="/user"
          >
            <el-icon>
              <ElIconUserFilled />
            </el-icon>
            个人信息
          </nuxt-link>
        </el-dropdown-item>
        <el-dropdown-item
          style="padding: 5 0"
          divided
        >
          <ThemeChoose />
        </el-dropdown-item>
        <el-dropdown-item>
          <el-button
            type="danger"
            @click="signOut()"
          ></el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.avatar-container {
  height: 100%;
  display: flex;
  align-items: center;
}
.avatar-container:hover {
  border: none;
}
.avatar:hover {
  cursor: pointer;
}

.avatar-dropdown-item {
  text-decoration: none;
  height: 20px;
}

.el-menu-item:hover {
  background-color: transparent;
}
</style>
