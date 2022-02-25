import React from "react";
import './ModalStyle.css';

type ModalType = {
    active: boolean
    addNewPack: (name: string) => void
    setActive: (activeStatus: boolean) => void
    children: React.ReactChild | React.ReactNode
}
const Modal = ({active, setActive, children}: ModalType) => {
    return (
        <div className={active ? `modal active` : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modalContent active' : 'modalContent'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;