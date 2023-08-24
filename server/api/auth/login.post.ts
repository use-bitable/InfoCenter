import { UserAuth, Response, StatusCode } from "../../../types"
import { useBitable } from "../../utils/useBase"
import { useCrypto } from "../../utils/useCrypto"
import { sign } from "jsonwebtoken"

export default eventHandler(async (e) => {
  const { username, password } = await readBody(e)
  const { searchRecords } = useBitable()
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
      const token = sign({ ...user }, process.env.AUTH_SECRET as string)
      return {
        code: StatusCode.success,
        message: "Login success",
        data: {
          token,
          username,
          name: record.fields["name"],
          group: record.fields["group"],
        },
      }
    } else {
      return records
    }
  } else {
    return "lll"
  }
})
