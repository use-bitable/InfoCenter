import { UserAuth, Response, StatusCode } from "types"
import { useBitable } from "../../utils/useBase"
import { useCrypto } from "../../utils/useCrypto"
import { default as jwt } from "jsonwebtoken"

export default eventHandler(async (e) => {
  const { username, password } = await readBody(e)
  const { searchRecords, getOptionName, updateRecord } = useBitable()
  const records = await searchRecords(
    process.env.BASE_AUTH_INFO_TABLE as string,
    "username",
    username,
    ["password", "username", "name", "group"],
  )
  const user: UserAuth = {
    username,
    password: useCrypto(password).MD5(),
  }
  if (records) {
    const record = records[0]
    if (user.password === record.fields["password"]) {
      const token = jwt.sign(
        {
          username,
          recordId: record.record_id,
          refreshTime: Number(new Date()),
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
          token,
          username,
          //@ts-ignore
          name: record.fields["name"][0].text,
          group: await getOptionName(
            process.env.BASE_BASIC_INFO_TABLE as string,
            "党小组",
            //@ts-ignore
            record.fields["group"][0],
          ),
        },
      }
    } else {
      return {
        code: StatusCode.failure,
        message: "Wrong password",
      }
    }
  } else {
    return {
      code: StatusCode.failure,
      message: "No username",
    }
  }
})
