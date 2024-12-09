import { Dialog } from 'primereact/dialog'
import React from 'react'

const Modal = ({header, closable, maskClassName, headerClassName, visible, children}) => {
    return <Dialog header={header} maskClassName={`backdrop-blur ${maskClassName}`} closable={closable} headerClassName={headerClassName} draggable={false} resizable={false} visible={visible}>{children}</Dialog>
}

export default Modal