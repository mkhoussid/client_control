import * as React from "react";

interface EmployeeIconProps {
  fill?: string;
}
const EmployeeIcon: React.FC<EmployeeIconProps> = React.memo(
  ({ fill: _fill }) => {
    const fill = _fill || "white";

    return (
      <svg
        width="17"
        height="19"
        viewBox="0 0 17 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.37705 14.9062C0.389894 14.5684 0.667712 14.3014 1.00568 14.302L4.46108 14.308L3.01053 12.9707C2.75917 12.7308 2.7636 12.3362 3.00358 12.0849C3.24321 11.8432 3.63806 11.838 3.88942 12.0779L6.4173 14.5333C6.70574 14.8131 6.68931 15.2746 6.38169 15.5332L3.68816 17.9164C3.55907 18.0273 3.41315 18.0702 3.25933 18.0648C3.08628 18.0586 2.92524 17.9855 2.80506 17.8464C2.58357 17.5787 2.61684 17.1852 2.87502 16.9633L4.42335 15.5581C4.42335 15.5581 2.63876 15.5674 0.997825 15.5566C0.644264 15.5543 0.363614 15.2595 0.37705 14.9062Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.00001 0C11.6651 0 13.7364 2.32002 13.4355 4.96802L13.1734 7.27398C12.9322 9.39656 11.1363 11 9.00001 11C6.86377 11 5.0678 9.39657 4.8266 7.27398L4.56456 4.96803C4.26365 2.32002 6.33496 0 9.00001 0ZM6.11829 7.1272L5.85625 4.82124C5.64297 2.94439 7.11108 1.3 9.00001 1.3C10.8889 1.3 12.3571 2.94439 12.1438 4.82124L11.8817 7.1272C11.7152 8.59283 10.4751 9.7 9.00001 9.7C7.52494 9.7 6.28484 8.59283 6.11829 7.1272Z"
          fill={fill}
        />
        <path
          d="M10.8536 12C13.6658 12 16.1007 13.9532 16.7108 16.6984L16.8107 17.1481C16.9079 17.5853 16.5752 18 16.1274 18H8.34295C7.98396 18 7.69295 17.709 7.69295 17.35C7.69295 16.991 7.98396 16.7 8.34295 16.7H15.3704C14.7953 14.6982 12.9595 13.3 10.8536 13.3H8.34295C7.98396 13.3 7.69295 13.009 7.69295 12.65C7.69295 12.291 7.98396 12 8.34295 12H10.8536Z"
          fill={fill}
        />
      </svg>
    );
  }
);

export default EmployeeIcon;