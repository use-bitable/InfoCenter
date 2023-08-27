import { H3Event } from "h3"
import { OptionsQuery, OptionsAllowedTable } from "types"
import { useBitable } from "../../../utils/useBase"

export default eventHandler((e: H3Event) => {
  const query = getQuery(e) as OptionsQuery
  const field = query.field
  const table = query.table
  if (Object.values(OptionsAllowedTable).includes(table)) {
  }
})
