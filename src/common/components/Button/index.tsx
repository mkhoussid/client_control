import * as React from 'react';
import { clsx } from '../../utils';

interface ButtonProps {
	onClick?: (...args: any[]) => any;
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	disabledButton?: boolean;
}
const Button: React.FC<ButtonProps> = React.memo(({ onClick, children, disabled, className, disabledButton }) => {
	const handleClick = React.useCallback(() => {
		if (disabledButton) {
			return;
		}

		onClick?.();
	}, [onClick]);
	return (
		<div
			className={clsx([
				'datagrid-button',
				disabled && 'button-disabled',
				disabledButton && 'button-disable-button',
				className,
			])}
			onClick={handleClick}
		>
			{children}
		</div>
	);
});

export default Button;
