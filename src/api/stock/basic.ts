import { Alova } from '@/utils/http/alova/index';

/**
 * @description: 获取图形验证码
 */
export function getStockBasicApi() {
  return Alova.Post<InResult>('/stock/tushare/stock_basic', { field_map: 1, format: 'array' }).then(
    (vo) => vo.data
  );
}
