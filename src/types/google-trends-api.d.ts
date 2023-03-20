// TODO: make this correct using this https://github.com/pat310/google-trends-api in near future
declare module "google-trends-api" {
  export interface TrendOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string | string[];
    hl?: string;
    timezone?: number;
    category?: number;
    property?: string;
    granularTimeResolution?: boolean;
  }

  interface InterestOverTimeResult {
    default: {
      timelineData: {
        time: string;
        formattedTime: string;
        formattedAxisTime: string;
        value: number[];
        formattedValue: string[];
      }[];
    };
  }

  export function interestOverTime(
    options: TrendOptions
  ): Promise<InterestOverTimeResult>;

  export function interestByRegion(options: any): Promise<any>;

  export function realTimeTrends(options: any): Promise<any>;
}
