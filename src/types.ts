export type TColumn = {
  id: string;
  columnName: string;
};

export type TRow = {
  status: string;
  value: string;
  serviceName: string;
  waitSince: string | null;
  employee: TEmployee | null;
  trm: string | null;
  inServiceSince: string | null;
  window?: number;
  segmentId: string | null;
};

export type TDataGridConfig = {
  columns: TColumn[];
  rows: TRow[];
};

export interface DataGridProps {
  datagridConfig: TDataGridConfig;
  onRowClick: (row: TRow) => void;
}

export interface ColumnProps {
  columns: TColumn[];
}

export interface DataGridBodyProps {
  rows: TRow[];
  onRowClick: (row: TRow) => void;
}

export interface HeaderProps {
  activeTab: number;
  setActiveTab: (activeTab: 0 | 1) => void;
}

interface IEmployeeBase {
  id: string;
  employeeName: string;
  position: string;
  isActive: boolean;
  segmentId: ISegment["id"];
}

interface IEmployeeActive extends IEmployeeBase {
  timeBeingActive: string;
  timeBeingInactive: null;
}

interface IEmployeeInActive extends IEmployeeBase {
  timeBeingActive: null;
  timeBeingInactive: string;
}

export type TEmployee = IEmployeeInActive | IEmployeeActive;

export interface ISegment {
  id: string;
  segmentName: string;
}
export interface ISegmentServiceRow extends ISegment {
  numberOfTicketsInQueue: number;
  availableEmployeesForSegment: TEmployee[];
}
