import { Modal } from "antd-mobile";
import { FC } from "react";

export const InfoPop: FC<{
  className?: string;
  title?: string;
  children: JSX.Element | string;
  visibility: boolean;
  closeOnMaskClick?: boolean;
  onClose: () => void;
}> = ({
  className,
  title,
  children,
  visibility,
  onClose,
  closeOnMaskClick,
}) => {
  return (
    <Modal
      visible={visibility}
      title={title}
      content={children}
      className={className}
      closeOnMaskClick={closeOnMaskClick}
      actions={[
        {
          text: "确定",
          onClick: onClose,
          key: "confirm",
        },
      ]}
    />
  );
};
