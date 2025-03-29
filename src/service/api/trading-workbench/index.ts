import { Request } from '../../index'
import type * as Trade from './types/trading-workbench'

/** 查 */
export function getTableDataApi(
  data: Trade.GetTableRequestData,
): Promise<Trade.CreateOrUpdateTableRequestData> {
  return Request({
    url: 'login/code',
    method: 'get',
    data,
  })
}
