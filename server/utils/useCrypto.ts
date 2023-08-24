import * as cryptojs from "crypto-js"

function MD5(src: cryptojs.lib.WordArray) {
  return () => cryptojs.MD5(src).toString(CryptoJS.enc.Utf8)
}

export function useCrypto(s: string, key?: string) {
  const src = CryptoJS.enc.Utf8.parse(s)
  return {
    MD5: MD5(src),
  }
}
