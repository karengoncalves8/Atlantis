import { ReactNode } from "react";

interface ModalProps {
    onAction: () => void;
    closeModal: () => void;
    children: ReactNode;
    title: string;
}

import styles from './modal.module.css'
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const Modal: React.FC<ModalProps> = ({
    children,
    title,
    onAction,
    closeModal,
}) => {
    return (
        <>
            <div className={styles.modal_container} onClick={closeModal}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className="flex w-full justify-between items-center">
                        <h4 className={styles.modalTitle}>{title}</h4>
                        <Button variant={'ghost'} onClick={closeModal}> <FontAwesomeIcon icon={faClose} size={"10x"}/> </Button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};