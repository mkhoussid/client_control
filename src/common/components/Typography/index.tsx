import * as React from "react";
import { clsx } from "../../utils";

interface TypographyProps {
  containerClassName?: string;
  textClassName?: string;
  variant?: "primary" | "secondary" | "link";
  children?: React.ReactNode;
  onClick?: (...args: any[]) => void;
}
const Typography: React.FC<TypographyProps> = React.memo(
  ({
    children,
    onClick,
    variant = "secondary",
    containerClassName = "",
    textClassName = ""
  }) => {
    return (
      <div className={containerClassName} onClick={onClick}>
        <p
          className={clsx([
            "typography",
            textClassName,
            `typography-${
              variant === "link"
                ? "link"
                : variant === "secondary"
                ? "secondary"
                : "primary"
            }`
          ])}
        >
          {children}
        </p>
      </div>
    );
  }
);

export default Typography;
