import * as React from "react";
import DataGrid from "./DataGrid";
import { Typography } from "./common/components";
import Modal, { TModalConfig } from "./Modal";
import * as server from "./mockServer";
import { initialModalState } from "./stock/modal";
import { ISegmentServiceRow, TDataGridConfig, TRow } from "./types";
import { Button } from "./common/components";
import { EmployeeIcon, TransferIcon } from "./stock/icons";
import { dateStringToMMSS } from "./DataGrid/utils";
import { TEmployee } from "./types";

const ClientControl = React.memo(() => {
  const selectedTicket = React.useRef<TRow | null>(null);

  const [datagridConfig, setDatagridConfig] = React.useState<TDataGridConfig>({
    columns: [],
    rows: []
  });
  const [modalConfig, setModalConfig] = React.useState<TModalConfig>({
    ...initialModalState
  });

  React.useEffect(() => {
    const [datagridRows, datagridColumns] = [
      server.getDatagridRows(),
      server.getDatagridColumns()
    ];

    setDatagridConfig({
      rows: datagridRows,
      columns: datagridColumns
    });
  }, []);

  const handleNumberOfClientsRef = React.useCallback(
    ({ isLastRow }: { isLastRow: boolean }) => (ref: HTMLDivElement) => {
      if (ref && isLastRow) {
        setTimeout(() => {
          const width = Math.ceil(ref.getBoundingClientRect().width);
          const nodes = document.getElementsByClassName(
            "segment-options-employee-status"
          );
          //@ts-ignore
          [...nodes].forEach((node) => {
            node.style.width = `${width + 10}px`;
          });
        }, 0);
      }
    },
    []
  );

  const handleClearSelectedTicket = React.useCallback(() => {
    selectedTicket.current = null;
  }, []);

  const handleTransferClient = React.useCallback(
    ({ employee }: { employee: TEmployee }) => () => {
      const { tickets, columns } = server.updateTicket({
        employee,
        ticket: selectedTicket.current as TRow
      });
      handleClearSelectedTicket();
      setDatagridConfig({
        rows: tickets,
        columns: columns
      });
    },
    []
  );

  const handlePromptClientControl = React.useCallback(
    ({ employee }: { employee: TEmployee }) => () => {
      setModalConfig({
        header: "Подтвердить перевод",
        body: (
          <div className="confirm-transfer-ticket-container">
            <div className="datagrid-row-ticket">
              {selectedTicket.current!.value}
            </div>
            <Typography
              variant="primary"
              textClassName="confirm-transfer-client-service-name"
            >
              {selectedTicket.current!.serviceName}
            </Typography>
            <Button
              className="confirm-transfer-client-icon-button"
              disabledButton
            >
              <TransferIcon />
            </Button>
            <div className="confirm-transfer-client-employee-container">
              <Typography containerClassName="confirm-transfer-client-employee-text">
                {employee.position}
              </Typography>
              <Typography
                containerClassName="confirm-transfer-client-employee-text"
                variant="link"
              >
                {employee.employeeName}
              </Typography>
            </div>
          </div>
        ),
        modalActionsClassName:
          "confirm-transfer-client-modal-actions-container",
        modalActionClassName: "confirm-transfer-client-modal-action",
        hideCancelButton: true,
        okText: "Перевести",
        onCloseModal: handleClearSelectedTicket,
        onOkClick: handleTransferClient({ employee })
      });
    },
    []
  );

  const handleMapAvailableEmployesForSegment = React.useCallback(
    (employee: TEmployee) => {
      const {
        id,
        position,
        employeeName,
        isActive,
        timeBeingActive,
        timeBeingInactive
      } = employee;
      return (
        <div
          key={`employee-${employeeName}`}
          className="segment-options-employee-container"
        >
          <Button
            className="segment-options-employee-avatar"
            disabled={isActive}
            onClick={handlePromptClientControl({ employee })}
          >
            <EmployeeIcon fill={isActive ? "#B0B5BD" : undefined} />
          </Button>
          <div className="segment-options-employee-details">
            <Typography>{position}</Typography>
            <Typography
              textClassName="segment-options-employee-name"
              variant="link"
            >
              {employeeName}
            </Typography>
          </div>
          <div className="segment-options-employee-status">
            <Typography
              textClassName={`segment-options-employee-status-${
                isActive ? "active" : "inactive"
              }`}
            >
              {isActive ? "Занят" : "Свободен"}
            </Typography>
            <Typography
              textClassName={`segment-options-employee-status-${
                isActive ? "active" : "inactive"
              }`}
            >
              {
                dateStringToMMSS({
                  date: timeBeingActive || timeBeingInactive
                })?.parsed
              }
            </Typography>
          </div>
        </div>
      );
    },
    []
  );

  const handleMapModalConfig = React.useCallback(
    (
      {
        segmentName,
        numberOfTicketsInQueue,
        availableEmployeesForSegment
      }: ISegmentServiceRow,
      index: number,
      self: ISegmentServiceRow[]
    ) => {
      return (
        <div
          key={`segment-${segmentName}`}
          className="segment-options-container"
        >
          <div className="segment-options-header">
            <Typography>{segmentName}</Typography>
            <Typography>
              <span
                ref={handleNumberOfClientsRef({
                  isLastRow: index + 1 === self.length
                })}
              >
                Клиентов в очереди:{" "}
              </span>
              <span className="tickets-in-queue">{numberOfTicketsInQueue}</span>
            </Typography>
          </div>

          <div className="segment-options-employees-container">
            {availableEmployeesForSegment.map(
              handleMapAvailableEmployesForSegment
            )}
          </div>
        </div>
      );
    },
    []
  );

  const handleRowClick = React.useCallback((row: TRow) => {
    selectedTicket.current = row;

    const modalConfig = server.getQueueConfig();

    setModalConfig({
      header: "Направить к ТРМ:",
      body: (
        <div className="client-transfer-control-segments-container">
          {modalConfig.map(handleMapModalConfig)}
          {/* {modalConfig.slice(0, 1).map(handleMapModalConfig)}
          {modalConfig.slice(1).map(handleMapModalConfig)} */}
        </div>
      ),
      showActionButtons: false,
      onCloseModal: () => {
        selectedTicket.current = null;
      }
    });
  }, []);

  return (
    <>
      <DataGrid datagridConfig={datagridConfig} onRowClick={handleRowClick} />
      <Modal modalConfig={modalConfig} setModalConfig={setModalConfig} />
    </>
  );
});

export default ClientControl;
