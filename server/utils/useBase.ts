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
      let field_names = `[`
      for (let i = 0; i < fields.length; i++) {
        if (i === fields.length - 1) {
          field_names += `"${fields[i]}"]`
        } else {
          field_names += `"${fields[i]}",`
        }
      }
      params.field_names = field_names
    }
    params.filter = `CurrentValue.[${index}] = "${value}"`
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

function updateRecord(base: BaseClient) {
  return async (
    table: string,
    recordId: string,
    data: {
      fields: Record<
        string,
        | string
        | number
        | number
        | number
        | boolean
        | {
            text?: string
            link?: string
          }
        | {
            location?: string
            pname?: string
            cityname?: string
            adname?: string
            address?: string
            name?: string
            full_address?: string
          }
        | Array<string>
        | Array<{
            id?: string
            name?: string
            en_name?: string
            email?: string
          }>
        | Array<{
            file_token?: string
            name?: string
            type?: string
            size?: number
            url?: string
            tmp_url?: string
          }>
      >
    },
  ) => {
    await base.base.appTableRecord.update({
      path: {
        table_id: table,
        record_id: recordId,
      },
      data,
    })
  }
}

function getOptionName(base: BaseClient) {
  return async (table: string, field: string, optId: string) => {
    const fields = (
      await base.base.appTableField.list({
        path: {
          table_id: table,
        },
      })
    ).data?.items
    if (fields) {
      const target = fields.find((item) => item.field_name === field)
      if (!target) return field
      if ([3, 4].includes(target.type)) {
        const name = target?.property?.options?.find(
          (item) => item.id === optId,
        )?.name
        return name
      }
    } else {
      return field
    }
  }
}

export function useBitable() {
  const appToken = process.env.BASE_APP_TOKEN as string
  const personalBaseToken = process.env.BASE_PERSONAL_TOKEN as string
  const base = new BaseClient({
    appToken,
    personalBaseToken,
  })
  return {
    base,
    searchRecords: searchRecords(base),
    getOptionName: getOptionName(base),
    updateRecord: updateRecord(base),
  }
}
