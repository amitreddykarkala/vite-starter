
export interface SmartAlertsTableProps {
    columns: any;
    data : SmartAlertType[];
}

export interface SmartAlertType  {
    SmartAlertId: string;
    OrganizationId: string;
    UserId: string;
    DeviceId: string;
    Timestamp: string;
    Bound: string;
    LowerThreshold: number;
    UpperThreshold: number;
    ParameterKey: string;
    ParameterValue: number;
    Status: string;
    RowNumber: number;
    Ward: null | string;
    Remarks?: null| string;
    NurseInput?: null| string;
    More?: string
  }

  export enum FetchState {
    DEFAULT = 'DEFAULT',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
  }