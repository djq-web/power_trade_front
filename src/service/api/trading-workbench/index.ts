import { Request } from '../../index';
import type * as Trade from './types/trading-workbench';

/**** 获取可用的合约代码*/
export function getContractCodeApi(): Promise<Trade.IMarketCodes> {
  return Request({
    url: 'market-codes',
    method: 'get',
  });
}

/** 请求价格预测数据 */
export function getPredictPriceApi(
  data: Trade.GetPredictPriceRequestData,
): Promise<Trade.GetPredictPriceResponseData> {
  return Request({
    url: 'predict-price',
    method: 'get',
    params: data,
  });
}
