import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    // calculate and set values to be returned to table
    const [price_abc, price_def] = [...serverResponds.map(res => (res.top_ask.price + res.top_bid.price) / 2)];
    const ratio = price_abc / price_def;
    const timestamp = serverResponds[0].timestamp > serverResponds[1].timestamp ?
      serverResponds[0].timestamp : serverResponds[1].timestamp;
    const upper_bound = 1 + 0.05;
    const lower_bound = 1 - 0.05;
    const trigger_alert = (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined;
    return { price_abc, price_def, ratio, timestamp, upper_bound, lower_bound, trigger_alert }
  }
}
