import * as React from 'react';
import { Button } from '../../common/components';
import { clsx } from '../../common/utils';
import { DataGridBodyProps, TTicket } from '../../types';
import { EmployeeIcon } from '../../stock/icons';
import { dateStringToMMSS, handleUpdateDataGridTime } from '../utils';

const DataGridBody: React.FC<DataGridBodyProps> = React.memo(({ rows, onRowClick, activeTab }) => {
	const intervalsRef = React.useRef<Array<NodeJS.Timeout>>([]);
	const columnRefs = React.useRef<Record<number, HTMLTableRowElement | null>>({});

	const handleForwardClientClick = React.useCallback(
		({ row }: { row: TTicket }) =>
			() => {
				onRowClick(row);
			},
		[onRowClick],
	);

	const handleColumnRef = React.useCallback(
		({ isLastRow, rowIndex }: { rowIndex: number; isLastRow: boolean }) =>
			(ref: HTMLTableRowElement) => {
				if (ref) {
					columnRefs.current[rowIndex] = ref;

					if (isLastRow) {
						handleUpdateDataGridTime({
							tableRows: columnRefs.current,
							updateColumn: activeTab === 0 ? 'startTime' : 'confirmTime',
							intervalsRef,
						});
					}
				}
			},
		[activeTab],
	);

	const getRowValue = React.useCallback(
		({ value, field, index, row }: { field: string; value: any; index: number; row: TTicket }) => {
			const enableDatagridRowWidth = [2].some((cell) => cell === index);
			let content: null | React.ReactNode = null;

			if (index === 0) {
				content = (
					<div
						className={clsx([
							'datagrid-row-status',
							`datagrid-row-status-${row.status}`,
						])}
					/>
				);
			} else if (field === 'ticketValue') {
				content = (
					<div
						className={clsx([
							'datagrid-row-ticket',
							`datagrid-row-ticket-${row.status}`,
						])}
					>
						{value}
					</div>
				);
			} else if (field === 'employee') {
				content = value?.employeeName ?? '';
			} else if (field === 'startTime') {
				content = (
					<div
						data-date={value}
						className={clsx([
							'datagrid-row-wait-time',
							`datagrid-row-wait-time-${row.status}`,
						])}
					>
						{
							dateStringToMMSS({
								startDate: new Date(value as string),
								endDate: row.confirmTime
									? (() => {
											const adjustedDate = new Date(
												new Date(
													row.confirmTime,
												).getTime(),
											);

											return adjustedDate;
									  })()
									: undefined,
							})?.parsed
						}
					</div>
				);
			} else if (field === 'trm') {
				content = value?.trmName ?? '';
			} else if (field === 'confirmTime') {
				content = value ? (
					<div
						data-date={value}
						className={clsx([
							'datagrid-row-wait-time',
							'datagrid-row-in-service-since-time',
						])}
					>
						{dateStringToMMSS({ startDate: new Date(value as string) })?.parsed}
					</div>
				) : (
					''
				);
			} else if (field === 'serviceName') {
				content = value;
			}

			return (
				<div
					className={clsx([
						'datagrid-row-wrapper',
						enableDatagridRowWidth && 'datagrid-row-wrapper-min-width',
					])}
				>
					{content}
				</div>
			);
		},
		[],
	);

	return (
		<tbody>
			{rows.map((row, rowIndex) => (
				<tr
					key={`row-${rowIndex}`}
					ref={handleColumnRef({
						isLastRow: rowIndex === rows.length - 1,
						rowIndex,
					})}
					className='datagrid-row'
				>
					{Object.entries(row)
						.filter(([key]) => !['id'].includes(key))
						.map(([field, value], index) => {
							return (
								<React.Fragment key={`cell-${field}`}>
									{index === 4 ? (
										<td className='datagrid-row-cell'>
											{row.confirmTime ? (
												<Button
													className={clsx(
														[
															'data-grid-button-transfer',
															'data-grid-button-in-service',
														],
													)}
													onClick={handleForwardClientClick(
														{ row },
													)}
													disabledButton
												>
													Окно{' '}
													{row.window}
												</Button>
											) : (
												<Button
													className='data-grid-button-transfer'
													onClick={handleForwardClientClick(
														{ row },
													)}
												>
													<EmployeeIcon />
												</Button>
											)}
										</td>
									) : (
										<td
											key={`table-cell-${field}`}
											className='datagrid-row-cell'
										>
											{getRowValue({
												field,
												value,
												index,
												row,
											})}
										</td>
									)}
								</React.Fragment>
							);
						})}
				</tr>
			))}
		</tbody>
	);
});

export default DataGridBody;
