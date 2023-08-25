import { default as jwt } from "jsonwebtoken"

export function useJWT() {
  return {
    sign: jwt.sign,
    verify: jwt.verify,
    decode: jwt.decode,
  }
}
