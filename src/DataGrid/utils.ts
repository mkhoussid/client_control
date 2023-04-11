export const getMinutesBetweenDates = ({
  startDate,
  endDate
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const difference = Math.floor(
    Math.abs(endDate.getTime() - startDate.getTime())
  );

  return {
    difference,
    parsed: new Date(difference).toISOString().slice(11, 19)
  };
};

export const dateStringToMMSS = ({ date }: { date: string | null }) => {
  if (!date) {
    return { parsed: "Дата неверна", status: "" };
  }

  const { difference, parsed } = getMinutesBetweenDates({
    startDate: new Date(date),
    endDate: new Date()
  });

  const differenceInMinutes = Math.floor(difference / 60000);

  const status =
    differenceInMinutes >= 30 ? "0" : differenceInMinutes >= 10 ? "1" : "2";

  return { parsed, status };
};

export const handleUpdateDataGridTime = ({
  tableRows
}: {
  tableRows: Record<number, HTMLTableRowElement | null>;
}) => {
  setInterval(() => {
    for (const prop in tableRows) {
      const node = tableRows[prop];

      if (node) {
        const waitSinceTableCell = node.getElementsByClassName(
          "datagrid-row-wait-time"
        )[0];
        const inServiceSinceTableCell =
          node.getElementsByClassName(
            "datagrid-row-in-service-since-time"
          )?.[0] ?? null;

        const waitSinceDate = waitSinceTableCell.getAttribute("data-date");

        const { parsed, status } = dateStringToMMSS({ date: waitSinceDate });
        waitSinceTableCell.innerHTML = parsed;

        if (inServiceSinceTableCell) {
          const inServiceSinceDate = inServiceSinceTableCell.getAttribute(
            "data-date"
          );

          const { parsed, status } = dateStringToMMSS({
            date: inServiceSinceDate
          });
          inServiceSinceTableCell.innerHTML = parsed;
        }

        const statusCell = node.getElementsByClassName(
          "datagrid-row-status"
        )[0];

        const ticketCell = node.getElementsByClassName(
          "datagrid-row-ticket"
        )[0];

        [waitSinceTableCell, statusCell, ticketCell].forEach((element) => {
          element.className = element?.className.replace(/[0-9]/, status);
        });
      }
    }
  }, 1000);
};
