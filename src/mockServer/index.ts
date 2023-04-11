import * as constants from "./db/constants";
import db from "./db";
import columns from "./datagrid/columns";
import {
  ISegment,
  ISegmentServiceRow,
  TColumn,
  TEmployee,
  TRow
} from "../types";

export const getDatagridRows = () => db.get(constants.DB_TICKETS);

export const getDatagridColumns = () => columns;

export const updateTicket = ({
  employee,
  ticket
}: {
  employee: TEmployee;
  ticket: TRow;
}): {
  tickets: TRow[];
  columns: TColumn[];
} => {
  const tickets = [...db.get(constants.DB_TICKETS)].reduce(
    (acc: TRow[], record: TRow) => {
      if (record.value === ticket.value) {
        record.employee = employee;
        record.inServiceSince = new Date().toISOString();
        record.window = 9;
      }

      acc.push(record);

      return acc;
    },
    []
  );

  db.set(constants.DB_TICKETS, tickets);

  return { tickets, columns };
};

export const getQueueConfig = (): ISegmentServiceRow[] => {
  const empployees = db.get(constants.DB_EMPLOYEES) as TEmployee[];
  const tickets = db.get(constants.DB_TICKETS) as TRow[];
  const segments = db.get(constants.DB_SEGMENTS) as ISegment[];

  return segments.reduce((acc: ISegmentServiceRow[], segment) => {
    const { length: numberOfTicketsInQueue } = tickets.filter(
      (ticket) => ticket.segmentId === segment.id
    );
    const availableEmployeesForSegment = empployees.filter(
      (empployee) => empployee.segmentId === segment.id
    );

    const result = {
      numberOfTicketsInQueue,
      availableEmployeesForSegment,
      ...segment
    };

    acc.push(result);
    return acc;
  }, [] as ISegmentServiceRow[]);
};
