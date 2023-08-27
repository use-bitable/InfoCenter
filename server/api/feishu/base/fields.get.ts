import { H3Event } from "h3"
import { useBitable } from "../../../utils/useBase"
import { StatusCode } from "types"

export default eventHandler(async (e: H3Event) => {
  const { getFields } = useBitable()
  const fields = await getFields(process.env.BASE_BASIC_INFO_TABLE as string)
  return {
    code: StatusCode.success,
    data: fields,
    message: "Get fields success",
  }
})
