import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Box
} from '@mui/material';
import { Lock, Timer } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SessionExpiredModal = () => {
  const { sessionExpired, dismissSessionExpired } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    dismissSessionExpired();
    navigate('/login');
  };

  return (
    <Dialog
      open={sessionExpired}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          padding: '1rem'
        }
      }}
    >
      <Box sx={{ textAlign: 'center', pt: 2 }}>
        <Box
          sx={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            bgcolor: '#fff3e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2
          }}
        >
          <Timer sx={{ fontSize: 40, color: '#ff9800' }} />
        </Box>
      </Box>

      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            color: '#1a1a1a'
          }}
        >
          Session Expired
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: '#666',
            lineHeight: 1.6,
            mb: 2
          }}
        >
          Your session has expired for security reasons. Please log in again to continue.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            bgcolor: '#f5f5f5',
            padding: '12px 20px',
            borderRadius: '12px'
          }}
        >
          <Lock sx={{ fontSize: 20, color: '#2c5aa0' }} />
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: '#2c5aa0',
              fontWeight: 600
            }}
          >
            Sessions expire after 24 hours of inactivity.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
        <Button
          onClick={handleClose}
          variant="contained"
          fullWidth
          sx={{
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
            color: 'white',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            py: 1.5,
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: '0 8px 24px rgba(44, 90, 160, 0.25)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1e3d6f 0%, #2c5aa0 100%)',
              boxShadow: '0 12px 32px rgba(44, 90, 160, 0.35)'
            }
          }}
        >
          Go to Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionExpiredModal;
