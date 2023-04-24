export type TColumn = {
	id: string;
	columnName: string;
};

export type TTicket = {
	id: number;
	status: number;
	trackNo: string;
	ticketValue: string;
	workStation: string;
	serviceName: string;
	startTime: string;
	window?: number | null;
	confirmTime: string | null;
	employee: TEmployee | null;
	segmentId: string | null;
};

export type TDataGridConfig = {
	columns: TColumn[];
	rows: TTicket[];
};

export interface DataGridProps {
	datagridConfig: TDataGridConfig;
	onRowClick: (row: TTicket) => void;
}

export interface ColumnProps {
	columns: TColumn[];
}

export interface DataGridBodyProps {
	rows: TTicket[];
	onRowClick: (row: TTicket) => void;
	activeTab: 0 | 1;
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
	segmentId: string;
}

interface IEmployeeActive extends IEmployeeBase {
	timeBeingActive: any;
	timeBeingInactive: any;
}

interface IEmployeeInActive extends IEmployeeBase {
	timeBeingActive: any;
	timeBeingInactive: any;
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
