import { Modal as _Modal, ModalProps } from "@hakit/components";

export function Modal({ cssStyles = "", children, ...props }: ModalProps) {
  return (
    <_Modal
      {...props}
      cssStyles={`
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    backdrop-filter: blur(5px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    ${cssStyles}
  `}
    >
      {children}
    </_Modal>
  );
}
