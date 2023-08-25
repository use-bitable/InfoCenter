import { H3Event } from "h3"
import { usePermission } from "../../utils/usePermission"
import { Permission } from "types"

export default eventHandler(async (e: H3Event) => {
  const { verifyToken, verifyAuthorization } = usePermission(Permission.common)
  const token = await verifyAuthorization(e)
  const session = await verifyToken(token)
  if (!session) {
    throw createError({
      statusCode: 403,
      statusMessage: "Wrong token",
    })
  } else {
    return session
  }
})
