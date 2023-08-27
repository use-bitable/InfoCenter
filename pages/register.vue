<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { UserInfo, Sex, TimeStamp, Group, Role, SchoolStatus } from "types"
import { FormInstance, FormRules, ElMessage } from "element-plus"

const { t } = useI18n()
useHead({
  title: t("registerForm.title"),
})
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
  layout: "login",
})
const error = useError()
const now = useNow()
const nowYear = now.value.getFullYear()
const grades = Array.from({ length: nowYear - 2018 }, (_, i) => ({
  label: `本科${nowYear - i}级`,
  value: `本科${nowYear - i}级`,
}))

const { id, password, username, phone } = useValidate()

const registerForm = ref()
const inputAble = ref(true)
const isLoading = ref(false)
const { ethnics } = useEthnic()

interface registerInfo {
  username: string
  name: string
  password: string
  verifyPassword: string
  id: string
  sex: Sex
  birthday: string
  group: Group
  role: Role
  grade: string
  ethnic: string
  applicationTime: TimeStamp
  schoolStatus: SchoolStatus
  phone: string
}

const rules = reactive<FormRules<registerInfo>>({
  username: [
    {
      required: true,
      message: t("registerForm.noEmpty", { field: t("registerForm.username") }),
      trigger: "blur",
    },
    {
      validator: (rule, value) => username(value),
      message: t("registerForm.usernameMessage"),
      trigger: "blur",
    },
  ],
  name: [
    {
      required: true,
      message: t("registerForm.noEmpty", { field: t("registerForm.name") }),
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: t("registerForm.noEmpty", { field: t("registerForm.phone") }),
      trigger: "blur",
    },
    {
      validator: (rule, value) => phone(value),
      message: t("registerForm.phoneMessage"),
      trigger: "blur",
    },
  ],
  grade: [
    {
      required: true,
      message: t("registerForm.noEmpty", { field: t("registerForm.grade") }),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("registerForm.noEmpty", { field: t("loginForm.password") }),
      trigger: "blur",
    },
    {
      validator: (rule, value) => password(value),
      message: t("registerForm.passwordMessage"),
      trigger: "blur",
    },
  ],
  verifyPassword: [
    {
      validator: (rule, value) => {
        return value === form.password
      },
      message: t("registerForm.verifyPasswordMessage"),
      trigger: "blur",
    },
    {
      required: true,
      message: t("registerForm.noEmpty", {
        field: t("registerForm.verifyPassword"),
      }),
      trigger: "blur",
    },
  ],
  birthday: [
    {
      required: true,
      message: t("registerForm.noEmpty", {
        field: t("registerForm.birthday"),
      }),
      trigger: "blur",
    },
  ],
  id: [
    {
      required: true,
      message: t("registerForm.noEmpty", {
        field: t("registerForm.id"),
      }),
      trigger: "blur",
    },
    {
      validator: (rule, value) => id(value),
      message: t("registerForm.idMessage"),
      trigger: "blur",
    },
  ],
  sex: [
    {
      required: true,
      message: t("registerForm.noEmpty", {
        field: t("registerForm.sex"),
      }),
      trigger: "blur",
    },
  ],
  group: [
    {
      required: true,
      message: t("registerForm.noEmpty", {
        field: t("registerForm.group"),
      }),
      trigger: "blur",
    },
  ],
  role: [
    {
      required: true,
      message: t("registerForm.noEmpty", {
        field: t("registerForm.role"),
      }),
      trigger: "blur",
    },
  ],
  ethnic: [
    {
      required: true,
      message: t("registerForm.noEmpty", {
        field: t("registerForm.ethnic"),
      }),
      trigger: "blur",
    },
  ],
  applicationTime: [
    {
      required: true,
      message: t("registerForm.noEmpty", {
        field: t("registerForm.applicationTime"),
      }),
      trigger: "blur",
    },
  ],
  schoolStatus: [
    {
      required: true,
      message: t("registerForm.noEmpty", {
        field: t("registerForm.schoolStatus"),
      }),
      trigger: "blur",
    },
  ],
})
const { signUp } = useAuth()

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

async function register(formEl: FormInstance | undefined) {
  if (!formEl) return
  inputAble.value = false
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      isLoading.value = true
      try {
        console.log(form)
        const res = await signUp(
          {
            userAuth: {
              username: form.username,
              password: useCrypto(form.password).SHA256(),
            },
            userInfo: {
              username: form.username,
              name: form.name,
              sex: form.sex,
              birthday: Number(form.birthday),
              id: form.id,
              group: form.group,
              schoolStatus: form.schoolStatus,
              applicationTime: Number(form.applicationTime),
              grade: form.grade,
              ethnic: form.ethnic,
              role: form.role,
              phone: form.phone,
            },
          },
          {
            redirect: true,
            callbackUrl: "/",
          },
        )
        console.log("registerres", res)
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

const form = reactive({
  username: "",
  name: "",
  password: "",
  verifyPassword: "",
  id: "",
  sex: "",
  birthday: "",
  group: "",
  role: "",
  grade: null,
  ethnic: "",
  applicationTime: "",
  schoolStatus: "在校",
  phone: "",
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
    <el-scrollbar style="width: 100%">
      <el-card shadow="hover">
        <template #header>
          <el-text>
            <el-icon
              color="#1296db"
              size="large"
            >
              <svgo-logo />
            </el-icon>
            {{ $t("registerForm.title") }}
          </el-text>
        </template>
        <el-form
          ref="registerForm"
          :model="form"
          label-position="top"
          status-icon
          :rules="rules"
          :disabled="!inputAble"
          scroll-to-error
        >
          <el-form-item
            :label="$t('registerForm.username')"
            prop="username"
          >
            <el-input
              v-model="form.username"
              :prefix-icon="ElIconUser"
              :placeholder="$t('registerForm.username')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.name')"
            prop="name"
          >
            <el-input
              v-model="form.name"
              :placeholder="$t('registerForm.name')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.grade')"
            prop="grade"
          >
            <el-select-v2
              v-model="form.grade"
              :placeholder="$t('registerForm.grade')"
              :options="grades"
              filterable
            >
            </el-select-v2>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.sex')"
            prop="sex"
          >
            <el-select
              v-model="form.sex"
              :prefix-icon="ElIconMale"
              :placeholder="$t('registerForm.sex')"
            >
              <el-option
                v-for="(i, v) of Sex"
                :value="i"
                >{{ $t(`registerForm.${v}`) }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.ethnic')"
            prop="ethnic"
          >
            <el-select
              filterable
              v-model="form.ethnic"
              :placeholder="$t('registerForm.ethnic')"
            >
              <el-option
                v-for="i in ethnics"
                :value="i.name"
                >{{ i.name }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.phone')"
            prop="phone"
          >
            <el-input
              v-model="form.phone"
              :placeholder="$t('registerForm.phone')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.birthday')"
            prop="birthday"
          >
            <el-date-picker
              v-model="form.birthday"
              type="date"
              :placeholder="$t('registerForm.birthday')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.id')"
            prop="id"
          >
            <el-input
              v-model="form.id"
              :prefix-icon="ElIconCreditCard"
              :placeholder="$t('registerForm.id')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.role')"
            prop="role"
          >
            <el-select
              v-model="form.role"
              :placeholder="$t('registerForm.role')"
            >
              <el-option
                v-for="(i, v) of Role"
                :value="i"
                >{{ $t(`registerForm.${v}`) }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.applicationTime')"
            prop="applicationTime"
          >
            <el-date-picker
              v-model="form.applicationTime"
              type="date"
              :placeholder="$t('registerForm.applicationTime')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.group')"
            prop="group"
          >
            <el-select
              v-model="form.group"
              :placeholder="$t('registerForm.group')"
            >
              <el-option
                v-for="(i, v) of Group"
                :value="i"
                >{{ $t(`registerForm.groups.${v}`) }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.schoolStatus')"
            prop="schoolStatus"
          >
            <el-select
              v-model="form.schoolStatus"
              :placeholder="$t('registerForm.schoolStatus')"
            >
              <el-option
                v-for="(i, v) of SchoolStatus"
                :value="i"
                >{{ $t(`registerForm.schoolStatuses.${v}`) }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.password')"
            prop="password"
          >
            <el-input
              v-model="form.password"
              :prefix-icon="ElIconKey"
              type="password"
              show-password
              :placeholder="$t('registerForm.password')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('registerForm.verifyPassword')"
            prop="verifyPassword"
          >
            <el-input
              v-model="form.verifyPassword"
              :prefix-icon="ElIconKey"
              type="password"
              show-password
              :placeholder="$t('registerForm.verifyPassword')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="register(registerForm)"
              :loading="isLoading"
              type="primary"
            >
              {{ $t("registerForm.register") }}
            </el-button>
            <el-button
              @click="navigateTo('/login')"
              type="default"
              >{{ $t("registerForm.login") }}</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-scrollbar>
  </div>
</template>
