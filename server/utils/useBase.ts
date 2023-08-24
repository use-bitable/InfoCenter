import { BaseClient } from "@base-open/node-sdk"

function searchRecords(base: BaseClient) {
  return async (
    table: string,
    index: string,
    value: string,
    fields: string[] = [],
  ) => {
    let params: { filter?: string; field_names?: string } = {}
    if (fields.length > 0) {
      let field_names = `"[`
      for (let i = 0; i < fields.length; i++) {
        if (i === fields.length - 1) {
          field_names += `"${fields[i]}"]`
        } else {
          field_names += `"${fields[i]}",`
        }
      }
      params.field_names = field_names
    }
    params.filter = `CurrentValue.[${index}]="${value}"`
    const res = await base.base.appTableRecord.list({
      path: {
        table_id: table,
      },
      params,
    })

    const records = res?.data?.items
    return records
  }
}

export function useBitable() {
  const appToken = process.env.BASE_APP_TOKEN as string
  const personalBaseToken = process.env.BASE_PERSONAL_TOKEN as string
  const base = new BaseClient({
    appToken,
    personalBaseToken,
  })
  return { base, searchRecords: searchRecords(base) }
}
