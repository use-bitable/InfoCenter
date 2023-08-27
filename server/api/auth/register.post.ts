import { H3Event } from "h3"
import { useBitable } from "../../utils/useBase"
import { UserInfo, UserAuth, StatusCode, Permission } from "types"

export default eventHandler(async (e: H3Event) => {
  const { userAuth, userInfo } = (await readBody(e)) as {
    userAuth: UserAuth
    userInfo: UserInfo
  }
  const { searchRecords, createRecord } = useBitable()
  const { username } = userInfo
  const records = await searchRecords(
    process.env.BASE_AUTH_INFO_TABLE as string,
    "username",
    username,
    ["username"],
  )
  if (records) {
    throw createError({
      statusCode: 403,
      message: "用户已存在",
    })
  } else {
    const addAuth = await createRecord(
      process.env.BASE_AUTH_INFO_TABLE as string,
      {
        fields: {
          username,
          password: userAuth.password,
          permission: [Permission.common],
        },
      },
    )
    if (addAuth) {
      const addUserInfo = await createRecord(
        process.env.BASE_BASIC_INFO_TABLE as string,
        {
          fields: {
            学号: username,
            姓名: userInfo.name,
            出生年月日: userInfo.birthday,
            身份证号: userInfo.id,
            党小组: userInfo.group,
            性别: userInfo.sex,
            政治面貌: userInfo.role,
            年级: userInfo.grade,
            民族: userInfo.ethnic,
            申请入党时间: userInfo.applicationTime,
            联系方式: userInfo.phone,
            在校状态: userInfo.schoolStatus,
          },
        },
      )
      if (addUserInfo) {
        return {
          code: StatusCode.success,
          message: "注册成功",
        }
      } else {
        throw createError({
          statusCode: 400,
          message: "添加用户信息失败",
        })
      }
    }
  }
})
