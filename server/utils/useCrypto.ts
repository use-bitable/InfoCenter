import { default as CryptoJS } from "crypto-js"

function MD5(src: CryptoJS.lib.WordArray) {
  return () => CryptoJS.MD5(src).toString()
}

export function useCrypto(s: string, key?: string) {
  const src = CryptoJS.enc.Utf8.parse(s)
  return {
    MD5: MD5(src),
  }
}
