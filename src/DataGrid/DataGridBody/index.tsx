import * as React from "react";
import { Button } from "../../common/components";
import { clsx } from "../../common/utils";
import { DataGridBodyProps, TRow } from "../../types";
import { EmployeeIcon } from "../../stock/icons";
import { dateStringToMMSS, handleUpdateDataGridTime } from "../utils";

const DataGridBody: React.FC<DataGridBodyProps> = React.memo(
  ({ rows, onRowClick }) => {
    const columnRefs = React.useRef<Record<number, HTMLTableRowElement | null>>(
      {}
    );

    const handleForwardClientClick = React.useCallback(
      ({ row }: { row: TRow }) => () => {
        onRowClick(row);
      },
      [onRowClick]
    );

    const handleColumnRef = React.useCallback(
      ({ isLastRow, rowIndex }: { rowIndex: number; isLastRow: boolean }) => (
        ref: HTMLTableRowElement
      ) => {
        if (ref) {
          columnRefs.current[rowIndex] = ref;

          if (isLastRow) {
            handleUpdateDataGridTime({ tableRows: columnRefs.current });
          }
        }
      },
      []
    );

    const getRowValue = React.useCallback(
      ({
        value,
        field,
        index,
        row
      }: {
        field: string;
        value: any;
        index: number;
        row: TRow;
      }) => {
        const enableDatagridRowWidth = [2].some((cell) => cell === index);
        let content: null | React.ReactNode = null;
        if (field === "status") {
          content = (
            <div
              className={clsx([
                "datagrid-row-status",
                `datagrid-row-status-${row.status}`
              ])}
            />
          );
        } else if (field === "value") {
          content = (
            <div
              className={clsx([
                "datagrid-row-ticket",
                `datagrid-row-ticket-${row.status}`
              ])}
            >
              {value}
            </div>
          );
        } else if (field === "employee") {
          content = value?.employeeName ?? "";
        } else if (field === "waitSince") {
          content = (
            <div
              data-date={value}
              className={clsx([
                "datagrid-row-wait-time",
                `datagrid-row-wait-time-${row.status}`
              ])}
            >
              {dateStringToMMSS({ date: value })?.parsed}
            </div>
          );
        } else if (field === "trm") {
          content = value?.trmName ?? "";
        } else if (field === "inServiceSince") {
          content = value ? (
            <div
              data-date={value}
              className={clsx([
                "datagrid-row-wait-time",
                "datagrid-row-in-service-since-time"
              ])}
            >
              {dateStringToMMSS({ date: value })?.parsed}
            </div>
          ) : (
            ""
          );
        } else if (field === "serviceName") {
          content = value;
        }
        if (field === "employee") {
          console.log("value", value);
        }
        return (
          <div
            className={clsx([
              "datagrid-row-wrapper",
              enableDatagridRowWidth && "datagrid-row-wrapper-min-width"
            ])}
          >
            {content}
          </div>
        );
      },
      []
    );

    return (
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={`row-${rowIndex}`}
            ref={handleColumnRef({
              isLastRow: rowIndex === rows.length - 1,
              rowIndex
            })}
            className="datagrid-row"
          >
            {Object.entries(row).map(([field, value], index) => {
              return (
                <React.Fragment key={`cell-${field}`}>
                  {index === 4 ? (
                    <td className="datagrid-row-cell">
                      {row.inServiceSince ? (
                        <Button
                          className={clsx([
                            "data-grid-button-transfer",
                            "data-grid-button-in-service"
                          ])}
                          onClick={handleForwardClientClick({ row })}
                          disabledButton
                        >
                          Окно {row.window}
                        </Button>
                      ) : (
                        <Button
                          className="data-grid-button-transfer"
                          onClick={handleForwardClientClick({ row })}
                        >
                          <EmployeeIcon />
                        </Button>
                      )}
                    </td>
                  ) : (
                    <td
                      key={`table-cell-${field}`}
                      className="datagrid-row-cell"
                    >
                      {getRowValue({ field, value, index, row })}
                    </td>
                  )}
                </React.Fragment>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  }
);

export default DataGridBody;
