<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { UserAuth } from "types"
import { FormInstance, FormRules, ElMessage } from "element-plus"

const { t } = useI18n()
useHead({
  title: t("menu.Login"),
})
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
  layout: "login",
})
const error = useError()

const loginForm = ref()
const inputAble = ref(true)
const isLoading = ref(false)

const rules = reactive<FormRules<UserAuth>>({
  username: [
    {
      required: true,
      message: t("loginForm.noEmpty", { field: t("loginForm.username") }),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("loginForm.noEmpty", { field: t("loginForm.password") }),
      trigger: "blur",
    },
  ],
})
const { signIn } = useAuth()

watch(
  () => error.value,
  (newVal) => {
    console.log("error", newVal)
    ElMessage({
      message: newVal?.message,
      type: "error",
      grouping: true,
      duration: 5000,
    })
  },
)

async function login(formEl: FormInstance | undefined) {
  if (!formEl) return
  inputAble.value = false
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      isLoading.value = true
      try {
        await signIn(
          {
            username: form.username,
            password: useCrypto(form.password).SHA256(),
          },
          {
            redirect: true,
            callbackUrl: "/",
          },
        )
        ElMessage({
          type: "success",
          message: "登陆成功",
        })
      } catch (e) {
        console.log(e)
      }
      isLoading.value = false
    } else {
      console.log("error submit!", fields)
    }
    inputAble.value = true
  })
}

const form = reactive<UserAuth>({
  username: "",
  password: "",
})
</script>
<template>
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <el-card shadow="hover">
      <template #header>
        <el-text>
          <el-icon
            color="#1296db"
            size="large"
          >
            <svgo-logo />
          </el-icon>
          {{ $t("loginForm.title") }}
        </el-text>
      </template>
      <el-form
        ref="loginForm"
        :model="form"
        label-position="top"
        status-icon
        :rules="rules"
        :disabled="!inputAble"
      >
        <el-form-item
          :label="$t('loginForm.username')"
          prop="username"
        >
          <el-input
            v-model="form.username"
            :prefix-icon="ElIconUser"
            :placeholder="$t('loginForm.username')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('loginForm.password')"
          prop="password"
        >
          <el-input
            v-model="form.password"
            :prefix-icon="ElIconKey"
            type="password"
            show-password
            :placeholder="$t('loginForm.password')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login(loginForm)"
            :loading="isLoading"
            type="primary"
          >
            {{ $t("loginForm.login") }}
          </el-button>
          <el-button
            @click="navigateTo('/register')"
            type="default"
            >{{ $t("loginForm.register") }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
