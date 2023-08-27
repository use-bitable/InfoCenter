function id(s: string) {
  const idRegex =
    /^[1-8]{2}[0-9]{4}[0-9]{4}((0[1-9]{1})|(1[0-2]{1}))((0[1-9]{1})|(1[0-9]{1})|(2[0-9]{1})|(3[0-1]{1}))[0-9]{3}[0-9xX]{1}$/g
  return idRegex.test(s)
}

function password(s: string) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/gm
  return passwordRegex.test(s)
}

function username(s: string) {
  return s.length === 12
}
export function useValidate() {
  return {
    id,
    password,
    username,
  }
}
