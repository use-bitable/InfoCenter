import { H3Event } from "h3"
import { usePermission } from "../../utils/usePermission"
import { useBitable } from "../../utils/useBase"
import { Permission, StatusCode } from "types"

export default eventHandler(async (e: H3Event) => {
  const { verifyAuthorization, verifyToken } = usePermission(Permission.common)
  const token = await verifyAuthorization(e)
  const session = await verifyToken(token)
  if (!session) {
    throw createError({
      statusCode: 403,
      statusMessage: "Wrong token",
    })
  } else {
    const { updateRecord } = useBitable()
    await updateRecord(
      process.env.BASE_AUTH_INFO_TABLE as string,
      session.recordId,
      {
        fields: {
          token: "",
        },
      },
    )
    return {
      code: StatusCode.success,
      message: "Logout success",
    }
  }
})
