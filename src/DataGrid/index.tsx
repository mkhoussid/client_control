import * as React from "react";
import { DataGridProps } from "../types";
import Header from "./Header";
import DataGridColumns from "./DataGridColumns";
import DataGridBody from "./DataGridBody";

const DataGrid: React.FC<DataGridProps> = React.memo(
  ({ datagridConfig: { rows, columns }, onRowClick }) => {
    const [activeTab, setActiveTab] = React.useState<0 | 1>(0);

    const getRows = React.useCallback(() => {
      return rows.filter((row) => !row.inServiceSince === !+activeTab);
    }, [rows, activeTab]);

    return (
      <div className="content-wrapper">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="datagrid-wrapper">
          <table className="datagrid">
            <DataGridColumns columns={columns} />
            <DataGridBody rows={getRows()} onRowClick={onRowClick} />
          </table>
        </div>
      </div>
    );
  }
);

export default DataGrid;
