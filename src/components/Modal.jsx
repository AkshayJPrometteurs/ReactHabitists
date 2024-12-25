import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ header, closable, maskClassName, headerClassName, visible, children, onClose }) => {
    return (
        <Dialog open={visible} onClose={closable ? onClose : undefined} aria-labelledby="dialog-title">
            {header && (
                <DialogTitle className={headerClassName} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {header}
                    {closable && (
                        <IconButton onClick={onClose} size="small" edge="end" aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    )}
                </DialogTitle>
            )}
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default Modal;
