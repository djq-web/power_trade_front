export interface CreateOrUpdateTableRequestData {
  id?: string;
  username: string;
  password?: string;
}

export interface GetTableRequestData {
  /** 当前页码 */
  currentPage: number;
  /** 查询条数 */
  size: number;
  /** 查询参数：用户名 */
  username?: string;
  /** 查询参数：手机号 */
  phone?: string;
}

export interface GetTableData {
  createTime: string;
  email: string;
  id: string;
  phone: string;
  roles: string;
  status: boolean;
  username: string;
}

export type GetTableResponseData = ApiResponseData<{
  list: GetTableData[];
  total: number;
}>;

export type IMarketCodes = ApiResponseData<{
  data: string[];
}>;

export interface GetPredictPriceRequestData {
  start_date: string;
  end_date: string;
  percentiles: string;
}
export interface GetPredictPriceResponseData {
  data: {
    date: string;
    price: number;
  }[];
}
