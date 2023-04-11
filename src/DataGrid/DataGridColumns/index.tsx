import * as React from "react";
import { Typography } from "../../common/components";
import { ColumnProps } from "../../types";

const DataGridColumns: React.FC<ColumnProps> = React.memo(({ columns }) => {
  return (
    <thead>
      <tr className="datagrid-columns-container">
        {columns.map(({ id, columnName }, index) => {
          return (
            <React.Fragment key={`th-${4}-${columnName}`}>
              {index === 4 && (
                <th className="datagrid-column">
                  <Typography variant="primary">
                    {"Перевести / номер окна"}
                  </Typography>
                </th>
              )}
              <th className="datagrid-column">
                <Typography variant="primary">{columnName}</Typography>
              </th>
            </React.Fragment>
          );
        })}
      </tr>
    </thead>
  );
});

export default DataGridColumns;
