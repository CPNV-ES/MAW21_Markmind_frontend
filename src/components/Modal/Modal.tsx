import { CircleX } from "lucide-react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

type ModalProps = PropsWithChildren & {
  isOpen?: boolean;
  title: string;
  footer?: ReactNode;
  header?: ReactNode;
  onClose?: () => void;
};
export default function Modal({
  children,
  isOpen,
  footer,
  header,
  title,
  onClose,
}: ModalProps) {
  const [open, setOpen] = useState(isOpen || false);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    setOpen(!!isOpen);
  }, [isOpen]);

  if (!open) return null;

  return (
    <dialog
      open={open}
      className="bg-black bg-opacity-50 w-full h-[100vh] flex justify-center items-center z-50"
    >
      <div className="h-auto w-[500px] bg-white rounded grid grid-rows-[auto_1fr_auto]">
        <div className="border-b border-gray-200 p-2 font-bold flex justify-between items-center">
          {header ? (
            header
          ) : (
            <>
              <span>{title}</span>
              <CircleX
                className="hover:text-red-500 cursor-pointer"
                onClick={handleClose}
              />
            </>
          )}
        </div>
        <div className="p-2">{children}</div>
        <div className="flex justify-between items-center border-t border-gray-200 p-2">
          {footer ? footer : null}
        </div>
      </div>
    </dialog>
  );
}
