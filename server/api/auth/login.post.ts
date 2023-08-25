import { UserAuth, LoginResponse, StatusCode } from "types"
import { useBitable } from "../../utils/useBase"
import { useCrypto } from "../../utils/useCrypto"
import { useJWT } from "../../utils/useJWT"
import { H3Event } from "h3"

export default eventHandler(async (e: H3Event): Promise<LoginResponse> => {
  const { username, password } = (await readBody(e)) as UserAuth
  const { searchRecords, getOptionName, updateRecord } = useBitable()
  const records = await searchRecords(
    process.env.BASE_AUTH_INFO_TABLE as string,
    "username",
    username,
    ["password", "username", "name", "group", "permission"],
  )
  const user: UserAuth = {
    username,
    password: useCrypto(password).MD5(),
  }
  if (records) {
    const record = records[0]
    if (user.password === record.fields["password"]) {
      const { sign } = useJWT()
      const token = sign(
        {
          username,
          recordId: record.record_id,
          // @ts-ignore
          permission: record.fields["permission"],
          //@ts-ignore
          name: record.fields["name"][0].text,
          group: await getOptionName(
            process.env.BASE_BASIC_INFO_TABLE as string,
            "党小组",
            //@ts-ignore
            record.fields["group"][0],
          ),
        },
        process.env.AUTH_SECRET as string,
      )
      await updateRecord(
        process.env.BASE_AUTH_INFO_TABLE as string,
        record.record_id as string,
        {
          fields: {
            token: token,
          },
        },
      )
      return {
        code: StatusCode.success,
        message: "Login success",
        data: {
          token: token,
        },
      }
    } else {
      throw createError({
        status: 403,
        statusText: "Wrong password",
      })
    }
  } else {
    throw createError({
      status: 403,
      statusText: "No username",
    })
  }
})
