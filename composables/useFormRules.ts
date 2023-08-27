import { FieldsResponseData } from "types"
import { FormRules } from "element-plus"

export default function useFormRules(fields: FieldsResponseData) {
  const rules = ref<FormRules>({})
  for (const field of fields) {
  }
}
