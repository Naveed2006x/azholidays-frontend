import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const showToast = (msg, type = 'success') => {
        setMessage(msg);
        setSeverity(type);
        setOpen(true);
    };

    const hideToast = () => {
        setOpen(false);
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={hideToast}
                anchorOrigin={{ 
                    vertical: 'top', 
                    horizontal: window.innerWidth < 600 ? 'center' : 'right' 
                }}
                sx={{
                    position: 'fixed',
                    top: { xs: 16, sm: 24 },
                    left: { xs: 16, sm: 'auto' },
                    right: { xs: 16, sm: 24 },
                    zIndex: 9999,
                    width: { xs: 'calc(100% - 32px)', sm: 'auto' }
                }}
            >
                <Alert 
                    onClose={hideToast} 
                    severity={severity} 
                    sx={{ 
                        width: '100%',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.95rem'
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};