import * as constants from './db/constants';
import db from './db';
import columns from './datagrid/columns';
import { ISegment, ISegmentServiceRow, TColumn, TEmployee, TTicket } from '../types';

export const getDatagridRows = () => db.get(constants.DB_TICKETS);

export const getDatagridColumns = () => columns;

export const updateTicket = ({
	employee,
	ticket,
}: {
	employee: TEmployee;
	ticket: TTicket;
}): {
	tickets: TTicket[];
	columns: TColumn[];
} => {
	const tickets = [...db.get(constants.DB_TICKETS)].reduce((acc: TTicket[], record: TTicket) => {
		if (record.ticketValue === ticket.ticketValue) {
			record.employee = employee;
			record.confirmTime = new Date().toISOString();
			record.window = 9;
		}

		acc.push(record);

		return acc;
	}, []);

	db.set(constants.DB_TICKETS, tickets);

	return { tickets, columns };
};

export const getQueueConfig = (): ISegmentServiceRow[] => {
	const employees = db.get(constants.DB_EMPLOYEES) as TEmployee[];
	const tickets = db.get(constants.DB_TICKETS) as TTicket[];
	const segments = db.get(constants.DB_SEGMENTS) as ISegment[];

	return segments.reduce((acc: ISegmentServiceRow[], segment) => {
		const { length: numberOfTicketsInQueue } = tickets.filter((ticket) => ticket.segmentId === segment.id);
		const availableEmployeesForSegment = employees.filter((employee) => employee.segmentId === segment.id);

		const result = {
			numberOfTicketsInQueue,
			availableEmployeesForSegment,
			...segment,
		};

		acc.push(result);
		return acc;
	}, [] as ISegmentServiceRow[]);
};
