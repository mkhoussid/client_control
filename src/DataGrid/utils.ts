export const getMinutesBetweenDates = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
	const difference = Math.floor(Math.abs(endDate.getTime() - startDate.getTime()));

	return {
		difference,
		parsed: new Date(difference).toISOString().slice(11, 19),
	};
};

export const dateStringToMMSS = ({ startDate, endDate }: { startDate: Date | null; endDate?: Date }) => {
	if (!startDate) {
		return { parsed: 'Дата неверна', status: '' };
	}

	const { difference, parsed } = getMinutesBetweenDates({
		startDate: startDate,
		endDate: endDate || new Date(),
	});

	const differenceInMinutes = Math.floor(difference / 60000);

	const status = differenceInMinutes >= 30 ? '0' : differenceInMinutes >= 10 ? '1' : '2';

	return { parsed, status };
};

export const handleUpdateDataGridTime = ({
	tableRows,
	updateColumn,
	intervalsRef,
}: {
	tableRows: Record<number, HTMLTableRowElement | null>;
	updateColumn: 'startTime' | 'confirmTime';
	intervalsRef: React.RefObject<NodeJS.Timeout[]>;
}) => {
	if (intervalsRef.current) {
		intervalsRef.current.forEach((interval) => {
			clearInterval(interval);
		});
	}

	let interval: NodeJS.Timeout | null = null;
	let shouldClear = false;
	const doUpdate = () => {
		for (const prop in tableRows) {
			const node = tableRows[prop];

			if (node) {
				const className =
					updateColumn === 'startTime'
						? 'datagrid-row-wait-time'
						: 'datagrid-row-in-service-since-time';

				const cell = node.getElementsByClassName(className)[0];
				const date = cell?.getAttribute('data-date');

				if (date) {
					const { parsed, status } = dateStringToMMSS({
						startDate: new Date(date),
					});

					cell.innerHTML = parsed;

					if (updateColumn === 'startTime') {
						const statusCell =
							node.getElementsByClassName('datagrid-row-status')[0];

						const ticketCell =
							node.getElementsByClassName('datagrid-row-ticket')[0];

						[cell, statusCell, ticketCell].forEach((element) => {
							if (element) {
								element.className = element?.className.replace(
									/[0-9]/,
									status,
								);
							}
						});
					}
				} else {
					shouldClear = true;
					// clearInterval(interval as NodeJS.Timeout);
				}
			}
		}
	};
	doUpdate();
	interval = setInterval(doUpdate, 1000);

	intervalsRef.current?.push(interval);

	// if (shouldClear && intervalsRef.current) {
	// 	intervalsRef.current.forEach((interval) => {
	// 		clearInterval(interval);
	// 	});
	// }
};
