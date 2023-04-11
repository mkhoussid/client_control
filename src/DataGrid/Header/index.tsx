import * as React from "react";
import { Typography } from "../../../src/common/components";
import { clsx } from "../../../src/common/utils";
import { HeaderProps } from "../../types";

const Header: React.FC<HeaderProps> = React.memo(
  ({ activeTab, setActiveTab }) => {
    const handleOnTabClick = React.useCallback(
      (newActiveTab: 0 | 1) => () => {
        setActiveTab(newActiveTab);
      },
      []
    );

    return (
      <div className="datagrid-header-container">
        {["Ожидание", "Обслуживание"].map((tabName, index) => {
          return (
            <Typography
              key={`tab-${index}`}
              containerClassName="datagrid-header"
              textClassName={clsx([
                "datagrid-header-text",
                activeTab === index && "datagrid-header-text-active"
              ])}
              onClick={handleOnTabClick(index as 0 | 1)}
            >
              {tabName}
            </Typography>
          );
        })}
      </div>
    );
  }
);

export default Header;
