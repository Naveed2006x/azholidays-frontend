import React, { createContext, useContext, useState, useEffect } from 'react';
import { Snackbar, Alert, AlertTitle, Slide } from '@mui/material';

const ToastContext = createContext();

export const GLOBAL_FONT_FAMILY = "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// Global function to check if the site is in production
export const isProduction = () => {
    const hostname = window.location.hostname;
    return hostname === 'azholidays.com' || hostname === 'www.azholidays.com';
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
}

export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [lastShown, setLastShown] = useState({ msg: '', time: 0 });

    const showToast = (msg, type = 'success') => {
        const now = Date.now();
        // Prevent showing same message within 5 seconds
        if (lastShown.msg === msg && (now - lastShown.time) < 5000) {
            console.log('Toast recently shown, ignoring');
            return;
        }
        console.log('Showing toast:', msg);
        setMessage(msg);
        setSeverity(type);
        setOpen(true);
        setLastShown({ msg, time: now });
    };

    const hideToast = () => {
        console.log('Hiding toast');
        setOpen(false);
    };

    // Auto-hide after 3 seconds using useEffect
    useEffect(() => {
        if (open) {
            console.log('Toast opened, setting 3s timer');
            const timer = setTimeout(() => {
                console.log('3 seconds passed, closing toast');
                hideToast();
            }, 3000);
            return () => {
                console.log('Cleanup timer');
                clearTimeout(timer);
            };
        }
    }, [open]);

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <Snackbar
                open={open}
                TransitionComponent={SlideTransition}
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
                    width: { xs: 'calc(100% - 32px)', sm: 'auto' },
                    maxWidth: { sm: '400px' }
                }}
            >
                <Alert 
                    severity={severity}
                    variant="filled"
                    sx={{ 
                        width: '100%',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                        borderRadius: '12px',
                        fontFamily: GLOBAL_FONT_FAMILY,
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        backdropFilter: 'blur(10px)',
                        '& .MuiAlert-icon': {
                            fontSize: '24px'
                        },
                        '& .MuiAlert-message': {
                            padding: '4px 0'
                        }
                    }}
                >
                    <AlertTitle sx={{ fontFamily: GLOBAL_FONT_FAMILY, fontWeight: 700, fontSize: '1rem' }}>
                        {severity === 'success' ? 'Success' :
                         severity === 'error' ? 'Error' :
                         severity === 'warning' ? 'Warning' : 'Information'}
                    </AlertTitle>
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};