import Currencies from 'tf2-currencies-2';

export interface PricerOptions {
    pricerUrl?: string;
    pricerApiToken?: string;
}

export type GetPricerFn = (options: PricerOptions) => Pricer;

/**
 * Basic pricer interface
 *
 * Those wishing to plug in something other than PricesTf should provide at least
 * the following interface plus a "pricer" module with the following method to get the constructor:
 * static getPricer(options: PricerOptions): Pricer
 */
export default interface Pricer {
    getOptions(): PricerOptions;

    requestCheck(sku: string, source: string): Promise<RequestCheckResponse>;

    getPrice(sku: string, source: string): Promise<GetItemPriceResponse>;

    getSnapshots(sku: string, source: string): Promise<GetItemSnapshotsResponse>;

    getPricelist(source: string): Promise<GetPricelistResponse>;

    getSchema(): Promise<GetSchemaResponse>;
}

export type RequestCheckFn = (sku: string, source: string) => Promise<RequestCheckResponse>;
export type GetPriceFn = (sku: string, source: string) => Promise<GetItemPriceResponse>;
export type GetSnapshotsFn = (sku: string, source: string) => Promise<GetItemSnapshotsResponse>;
export type GetPrice = (sku: string, source: string) => Promise<GetItemPriceResponse>;
export type GetPricelist = (source: string) => Promise<GetPricelistResponse>;
export type GetSchema = () => Promise<GetSchemaResponse>;

export interface PricesResponse {
    success: boolean;
    message?: string;
}

export interface GetSchemaResponse extends PricesResponse {
    version: string;
    time: number;
    raw: any;
}

export interface GetOverviewResponse extends PricesResponse {
    items: ItemOverview[];
}

export interface ItemOverview {
    name: string;
    sku: string;
}

export interface GetPricelistResponse extends PricesResponse {
    currency?: any;
    items?: Item[];
}

export interface Item {
    sku: string;
    name: string;
    source: string;
    time: number;
    buy: Currencies | null;
    sell: Currencies | null;
}

export interface Links {
    ptf: string;
    mptf: string;
    scm: string;
    bptf: string;
}

export interface GetItemPriceResponse extends PricesResponse {
    sku?: string;
    name?: string;
    currency?: string;
    source?: string;
    time?: number;
    buy?: Currencies;
    sell?: Currencies;
    message?: string;
}

export interface GetItemSnapshotsResponse extends PricesResponse {
    sku: string;
    name: string;
    sales: Sale[];
}

export interface Sale {
    id: string;
    steamid: string;
    automatic: boolean;
    attributes: any;
    intent: number;
    currencies: Currencies;
    time: number;
}

export interface RequestCheckResponse extends PricesResponse {
    sku: string;
    name: string;
}
