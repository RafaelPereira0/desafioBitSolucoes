import { X } from "lucide-react";
import type { ReactNode } from "react";

import "./styles.css";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    width?: string;
};

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    width = "500px",
}: ModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="modal-overlay"
            onMouseDown={onClose}
        >
            <div
                className="modal"
                style={{ maxWidth: width }}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="modal-header">
                    <h2>{title}</h2>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Fechar modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}