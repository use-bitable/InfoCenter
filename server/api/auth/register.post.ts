import { H3Event } from "h3"
import { useBitable } from "../../utils/useBase"
import { UserInfo, UserAuth, StatusCode, Permission } from "types"

function getInfoJSON(info: UserInfo) {
  const infoJSON: { [key: string]: any } = {}
  infoJSON["学号"] = info.username
  infoJSON["姓名"] = info.name
  infoJSON["出生年月日"] = info.birthday
  infoJSON["身份证号"] = info.id
  infoJSON["党小组"] = info.group
  infoJSON["性别"] = info.sex
  infoJSON["政治面貌"] = info.role
  infoJSON["年级"] = info.grade
  infoJSON["民族"] = info.ethnic
  infoJSON["申请入党时间"] = info.applicationTime
  infoJSON["联系方式"] = info.phone
  infoJSON["在校状态"] = info.schoolStatus
  infoJSON["两基测试成绩"] = 0
  return JSON.parse(JSON.stringify(infoJSON))
}

export default eventHandler(async (e: H3Event) => {
  const { userAuth, userInfo } = (await readBody(e)) as {
    userAuth: UserAuth
    userInfo: UserInfo
  }
  const { searchRecords, createRecord } = useBitable()
  const { username } = userAuth
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
          username: username,
          password: userAuth.password,
          permission: [String(Permission.common)],
          password_status: "changed",
        },
      },
    )
    if (addAuth) {
      // return getInfoJSON(userInfo)
      const addUserInfo = await createRecord(
        process.env.BASE_BASIC_INFO_TABLE as string,
        {
          fields: getInfoJSON(userInfo),
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
