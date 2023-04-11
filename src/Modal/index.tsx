import * as React from "react";
import { CloseIcon } from "../stock/icons";
import { initialModalState } from "../stock/modal";
import { Button } from "../common/components";
import { clsx } from "../common/utils";

interface IModalConfigBase {
  header: React.ReactNode;
  body: React.ReactNode;
  onCloseModal?: () => void;
}
interface IModalConfigWithAction extends IModalConfigBase {
  showActionButtons?: true;
  onOkClick?: ((...params: any[]) => void) | null;
  onCancelClick?: ((...params: any[]) => void) | null;
  hideCancelButton?: boolean;
  okText?: string;
  modalActionsClassName?: string;
  modalActionClassName?: string;
}
interface IModalConfigWithoutActions extends IModalConfigBase {
  onOkClick?: never;
  okText?: never;
  onCancelClick?: never;
  showActionButtons: false;
  hideCancelButton?: never;
  modalActionsClassName?: never;
  modalActionClassName?: never;
}

export type TModalConfig = IModalConfigWithoutActions | IModalConfigWithAction;
interface ModalProps {
  modalConfig: TModalConfig;
  setModalConfig: (modalConfig: TModalConfig) => void;
}
const Modal: React.FC<ModalProps> = React.memo(
  ({
    modalConfig: {
      modalActionsClassName,
      hideCancelButton = false,
      showActionButtons = true,
      okText = "Ok",
      onCloseModal,
      modalActionClassName,
      ...modalConfig
    },
    setModalConfig
  }) => {
    const { header, body, onCancelClick, onOkClick } = modalConfig;

    const handleCloseModal = React.useCallback(() => {
      onCloseModal?.();
      setModalConfig({ ...initialModalState });
    }, [onCloseModal]);

    const handleStopPropagation = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      },
      []
    );

    const handleOnCancelClick = React.useCallback(() => {
      onCancelClick?.();

      handleCloseModal();
    }, [onCancelClick]);

    const handleOnOkClick = React.useCallback(() => {
      onOkClick?.();

      handleCloseModal();
    }, [onOkClick]);

    const showModal = Object.values(modalConfig).every((val) => val);

    if (!showModal) {
      return null;
    }

    return (
      <div className="modal-container" onClick={handleCloseModal}>
        <div className="modal" onClick={handleStopPropagation}>
          <div className="modal-close-icon-container">
            <Button className="modal-close-icon" onClick={handleCloseModal}>
              <CloseIcon />
            </Button>
          </div>
          <div className="modal-header">{header}</div>
          <div className="modal-body">{body}</div>
          {showActionButtons && (
            <div className={clsx(["modal-actions", modalActionsClassName])}>
              {!hideCancelButton && (
                <Button
                  className={clsx(["modal-action", modalActionClassName])}
                  onClick={handleOnCancelClick}
                >
                  Cancel
                </Button>
              )}
              <Button
                className={clsx(["modal-action", modalActionClassName])}
                onClick={handleOnOkClick}
              >
                {okText}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Modal;
