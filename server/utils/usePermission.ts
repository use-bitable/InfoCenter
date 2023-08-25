import { Permission } from "types"
import { useJWT } from "./useJWT"
import { UserSession } from "types"
import { useBitable } from "./useBase"
import { H3Event } from "h3"

async function verifyAuthorization(e: H3Event) {
  const authHeaderValue = getRequestHeader(e, "authorization")
  if (typeof authHeaderValue === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    })
  } else {
    const [, token] = authHeaderValue?.split("Bearer ")
    return token
  }
}

async function verifyToken(token: string) {
  const { verify } = useJWT()
  const session = verify(token, process.env.AUTH_SECRET as string, {
    ignoreExpiration: true,
  }) as UserSession
  const { searchRecords } = useBitable()
  const res = await searchRecords(
    process.env.BASE_AUTH_INFO_TABLE as string,
    "username",
    session.username,
    ["token"],
  )
  if (!res) {
    throw createError({
      statusCode: 403,
      statusMessage: "No user",
    })
  } else {
    const recordToken = res[0].fields["token"]
    if (token === recordToken) {
      return session
    } else {
      throw createError({
        statusCode: 403,
        statusMessage: "Token expired",
      })
    }
  }
}

function hasPermission(permission: Permission | Permission[]) {
  return (userPermission: Permission[]) => {
    if (typeof permission === "number") {
      return userPermission.includes(permission)
    } else {
      for (const i of permission) {
        if (userPermission.includes(i)) {
          return true
        }
      }
      return false
    }
  }
}

export function usePermission(permission: Permission | Permission[]) {
  return {
    hasPermission: hasPermission(permission),
    verifyToken: verifyToken,
    verifyAuthorization: verifyAuthorization,
  }
}
