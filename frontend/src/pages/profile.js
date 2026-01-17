import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Avatar,
    Grid,
    Divider,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
    Switch,
    FormControlLabel,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Fade,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    CameraAlt as CameraIcon,
    Security as SecurityIcon,
    Notifications as NotificationsIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { profileAPI } from '../api';
import { useToast } from '../contexts/ToastContext';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const navigate = useNavigate();
    const { showToast } = useToast();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        dateOfBirth: '',
        newsletter: true,
        notifications: false
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const fontStyle = {
        fontFamily: "'Poppins', sans-serif",
    };

    // Fix for Switch boolean values - convert numeric to boolean
    const getBooleanValue = (value) => {
        if (typeof value === 'number') {
            return Boolean(value);
        }
        return !!value;
    };

    // Updated profile picture upload function
    const handleProfilePictureUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type and size
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file.', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size must be less than 5MB.', 'error');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('profilePicture', file);

            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:3000/api/user/profile-picture',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    },
                }
            );

            if (response.data.success) {
                const updatedUser = { ...user, profile_picture: response.data.imageUrl };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                showToast('Profile picture updated successfully!', 'success');
            }
        } catch (error) {
            console.error('Profile picture upload failed:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to upload profile picture.'
            });
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    // Updated remove profile picture function
    const handleRemoveProfilePicture = async () => {
        if (!window.confirm('Are you sure you want to remove your profile picture?')) {
            return;
        }

        try {
            const response = await profileAPI.deleteProfilePicture();

            if (response.success) {
                const updatedUser = { ...user, profile_picture: null };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                showToast('Profile picture removed successfully!', 'success');
            }
        } catch (error) {
            console.error('Profile picture removal failed:', error);
            setMessage({
                type: 'error',
                text: error.message || 'Failed to remove profile picture.'
            });
        }
    };

    // Load user data on component mount - UPDATED
    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            // Updated API call
            const response = await profileAPI.getProfile();

            if (response.success) {
                const userData = response.user;
                setUser(userData);

                // Format date for input field (YYYY-MM-DD)
                let formattedDateOfBirth = '';
                if (userData.date_of_birth) {
                    const date = new Date(userData.date_of_birth);
                    if (!isNaN(date.getTime())) {
                        formattedDateOfBirth = date.toISOString().split('T')[0];
                    }
                }

                // Use getBooleanValue to ensure proper boolean values
                setFormData({
                    firstName: userData.first_name || '',
                    lastName: userData.last_name || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    address: userData.address || '',
                    city: userData.city || '',
                    country: userData.country || '',
                    dateOfBirth: formattedDateOfBirth,
                    newsletter: getBooleanValue(userData.newsletter),
                    notifications: getBooleanValue(userData.notifications)
                });
            }
        } catch (error) {
            console.error('Profile load failed:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Updated save profile function
    const handleSaveProfile = async () => {
        setSaving(true);
        

        try {
            // Updated API call
            const response = await profileAPI.updateProfile(formData);

            if (response.success) {
                const updatedUser = { ...user, ...response.user };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);

                if (response.token) {
                    localStorage.setItem('token', response.token);
                }

                showToast('Profile updated successfully!', 'success');
                setEditMode(false);
            }
        } catch (error) {
            console.error('Profile update failed:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setMessage({
                    type: 'error',
                    text: error.message || 'Failed to update profile. Please try again.'
                });
            }
        } finally {
            setSaving(false);
        }
    };

    // Updated change password function
    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showToast('New passwords do not match.', 'error');
            return;
        }

        if (passwordData.newPassword.length < 8) {
            showToast('New password must be at least 8 characters long.', 'error');
            return;
        }

        setSaving(true);
        

        try {
            // Updated API call
            const response = await profileAPI.changePassword(
                passwordData.currentPassword,
                passwordData.newPassword
            );

            if (response.success) {
                showToast('Password changed successfully!', 'success');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            console.error('Password change failed:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setMessage({
                    type: 'error',
                    text: error.message || 'Failed to change password. Please try again.'
                });
            }
        } finally {
            setSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setFormData({
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || '',
            city: user.city || '',
            country: user.country || '',
            dateOfBirth: user.date_of_birth || '',
            newsletter: getBooleanValue(user.newsletter),
            notifications: getBooleanValue(user.notifications)
        });
        setEditMode(false);
        
    };

    const handleDeleteAccount = async () => {
        if (!deletePassword) {
            showToast('Please enter your password to delete your account.', 'error');
            return;
        }

        setDeleting(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete('http://localhost:3000/api/user/account', {
                headers: { Authorization: `Bearer ${token}` },
                data: { password: deletePassword }
            });

            if (response.data.success) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                showToast('Account deleted successfully.', 'success');
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (error) {
            console.error('Account deletion failed:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'Failed to delete account. Please try again.'
                });
            }
        } finally {
            setDeleting(false);
            setDeleteDialogOpen(false);
            setDeletePassword('');
        }
    };

    const textFieldStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            ...fontStyle,
            '&:hover fieldset': {
                borderColor: '#1153a5',
            },
            '&.Mui-focused fieldset': {
                border: '2px solid #1153a5',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#1153a5',
            fontWeight: 600
        }
    };

    const buttonStyle = {
        ...fontStyle,
        borderRadius: '12px',
        textTransform: 'none',
        fontWeight: 600,
        px: 3,
        py: 1.2,
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                marginTop: '67px'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress
                        size={60}
                        sx={{
                            color: '#1153a5',
                            mb: 2
                        }}
                    />
                    <Typography sx={{ ...fontStyle, color: '#666' }}>
                        Loading your profile...
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="profile-container" style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: isMobile ? '8px 0' : '16px 0',
            marginTop: '18px'
        }}>
            <div className="profile-content" style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                padding: isMobile ? '0 8px' : '0 16px' 
            }}>
                
                {/* Mobile Layout */}
                {isMobile ? (
                    <div className="mobile-layout" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Profile Summary Card for Mobile */}
                        <Fade in={true} timeout={1000}>
                            <Card sx={{
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #1153a5 0%, #1a6fd6 100%)',
                                color: 'white',
                                boxShadow: '0 8px 25px rgba(17, 83, 165, 0.3)',
                            }}>
                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                                        <Avatar
                                            src={user.profile_picture}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mx: 'auto',
                                                mb: 2,
                                                border: '3px solid rgba(255,255,255,0.3)',
                                                bgcolor: 'rgba(255,255,255,0.2)',
                                                color: 'white'
                                            }}
                                        >
                                            <PersonIcon sx={{ fontSize: '3rem' }} />
                                        </Avatar>

                                        {/* Upload Button */}
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="profile-picture-upload-mobile"
                                            type="file"
                                            onChange={handleProfilePictureUpload}
                                            disabled={uploading}
                                        />

                                        <label htmlFor="profile-picture-upload-mobile">
                                            <IconButton
                                                component="span"
                                                disabled={uploading}
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 4,
                                                    right: 4,
                                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                                    color: '#1153a5',
                                                    '&:hover': {
                                                        backgroundColor: 'white'
                                                    },
                                                    '&:disabled': {
                                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                                    },
                                                    width: 28,
                                                    height: 28
                                                }}
                                            >
                                                {uploading ? (
                                                    <CircularProgress size={14} />
                                                ) : (
                                                    <CameraIcon sx={{ fontSize: '0.9rem' }} />
                                                )}
                                            </IconButton>
                                        </label>

                                        {/* Remove Button */}
                                        {user.profile_picture && (
                                            <IconButton
                                                onClick={handleRemoveProfilePicture}
                                                disabled={uploading}
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 4,
                                                    left: 4,
                                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                                    color: '#d9534f',
                                                    '&:hover': {
                                                        backgroundColor: 'white'
                                                    },
                                                    '&:disabled': {
                                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                                    },
                                                    width: 28,
                                                    height: 28
                                                }}
                                            >
                                                <DeleteIcon sx={{ fontSize: '0.9rem' }} />
                                            </IconButton>
                                        )}
                                    </div>

                                    {uploading && (
                                        <Box sx={{ width: '100%', mt: 1 }}>
                                            <Typography variant="caption" sx={{ ...fontStyle, color: 'white', display: 'block', textAlign: 'center' }}>
                                                Uploading: {uploadProgress}%
                                            </Typography>
                                            <Box sx={{
                                                width: '100%',
                                                height: 4,
                                                backgroundColor: 'rgba(255,255,255,0.3)',
                                                borderRadius: 2,
                                                mt: 0.5
                                            }}>
                                                <Box
                                                    sx={{
                                                        height: '100%',
                                                        backgroundColor: 'white',
                                                        borderRadius: 2,
                                                        width: `${uploadProgress}%`,
                                                        transition: 'width 0.3s ease'
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    )}

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            ...fontStyle,
                                            fontWeight: 700,
                                            mb: 1
                                        }}
                                    >
                                        {user.first_name} {user.last_name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ...fontStyle,
                                            opacity: 0.9,
                                            mb: 3
                                        }}
                                    >
                                        {user.email}
                                    </Typography>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '16px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        marginBottom: '16px'
                                    }}>
                                        {/* Member Since */}
                                        <div style={{ textAlign: 'center' }}>
                                            <Typography variant="caption" sx={{ ...fontStyle, opacity: 0.8, display: 'block', mb: 1 }}>
                                                Member since
                                            </Typography>
                                            <Typography variant="body2" sx={{ ...fontStyle, fontWeight: 600, fontSize: '0.9rem' }}>
                                                {new Date(user.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short'
                                                })}
                                            </Typography>
                                        </div>

                                        {/* AZ Coins */}
                                        {user.az_coins !== undefined && (
                                            <div style={{ textAlign: 'center' }}>
                                                <Typography variant="caption" sx={{ ...fontStyle, opacity: 0.8, display: 'block', mb: 1 }}>
                                                    AZ Coins
                                                </Typography>
                                                <Typography variant="body2" sx={{ ...fontStyle, fontWeight: 600, fontSize: '0.9rem' }}>
                                                    {user.az_coins}
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Fade>

                        {/* Edit Button for Mobile */}
                        {!editMode && (
                            <Button
                                fullWidth
                                startIcon={<EditIcon />}
                                onClick={() => setEditMode(true)}
                                sx={{
                                    ...buttonStyle,
                                    background: '#1153a5',
                                    color: 'white',
                                    '&:hover': {
                                        background: '#0e478c',
                                        boxShadow: '0 6px 20px rgba(17, 83, 165, 0.4)',
                                    }
                                }}
                                variant="contained"
                            >
                                Edit Profile
                            </Button>
                        )}

                        {/* Main Content for Mobile */}
                        <Fade in={true} timeout={1200}>
                            <div className="mobile-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {/* Personal Info */}
                                <Card sx={{
                                    borderRadius: '16px',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                ...fontStyle,
                                                fontWeight: 700,
                                                color: '#333',
                                                mb: 3
                                            }}
                                        >
                                            Personal Information
                                        </Typography>

                                        <div className="mobile-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            {[
                                                { label: "First Name", name: "firstName", icon: <PersonIcon /> },
                                                { label: "Last Name", name: "lastName", icon: <PersonIcon /> },
                                                { label: "Email Address", name: "email", type: "email", icon: <EmailIcon /> },
                                                { label: "Phone Number", name: "phone", icon: <PhoneIcon /> },
                                                { label: "Date of Birth", name: "dateOfBirth", type: "date" },
                                                { label: "Address", name: "address", icon: <LocationIcon /> },
                                                { label: "City", name: "city" },
                                                { label: "Country", name: "country" },
                                            ].map((field) => (
                                                <TextField
                                                    key={field.name}
                                                    fullWidth
                                                    label={field.label}
                                                    name={field.name}
                                                    type={field.type || 'text'}
                                                    value={formData[field.name]}
                                                    onChange={handleInputChange}
                                                    disabled={!editMode}
                                                    InputProps={{
                                                        startAdornment: field.icon ? (
                                                            <InputAdornment position="start">
                                                                {field.icon}
                                                            </InputAdornment>
                                                        ) : null,
                                                    }}
                                                    InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                                                    sx={textFieldStyle}
                                                    size={isSmallMobile ? "small" : "medium"}
                                                />
                                            ))}
                                        </div>

                                        {/* Action Buttons for Mobile */}
                                        {editMode && (
                                            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                                                <Button
                                                    fullWidth
                                                    startIcon={<CancelIcon />}
                                                    onClick={handleCancelEdit}
                                                    sx={{
                                                        ...buttonStyle,
                                                        color: '#666',
                                                        borderColor: '#ddd',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(102, 102, 102, 0.1)',
                                                            borderColor: '#666'
                                                        }
                                                    }}
                                                    variant="outlined"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    fullWidth
                                                    startIcon={<SaveIcon />}
                                                    onClick={handleSaveProfile}
                                                    disabled={saving}
                                                    sx={{
                                                        ...buttonStyle,
                                                        background: '#1153a5',
                                                        color: 'white',
                                                        '&:hover': {
                                                            background: '#0e478c',
                                                            boxShadow: '0 6px 20px rgba(17, 83, 165, 0.4)',
                                                        },
                                                        '&:disabled': {
                                                            background: '#ccc'
                                                        }
                                                    }}
                                                    variant="contained"
                                                >
                                                    {saving ? <CircularProgress size={20} /> : 'Save'}
                                                </Button>
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Security Settings */}
                                <Card sx={{
                                    borderRadius: '16px',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                ...fontStyle,
                                                fontWeight: 700,
                                                color: '#333',
                                                mb: 3
                                            }}
                                        >
                                            Security Settings
                                        </Typography>

                                        <div className="mobile-security" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    ...fontStyle,
                                                    fontWeight: 600,
                                                    color: '#333',
                                                }}
                                            >
                                                Change Password
                                            </Typography>

                                            {[
                                                { label: "Current Password", name: "currentPassword" },
                                                { label: "New Password", name: "newPassword" },
                                                { label: "Confirm New Password", name: "confirmPassword" }
                                            ].map((field) => (
                                                <TextField
                                                    key={field.name}
                                                    fullWidth
                                                    label={field.label}
                                                    name={field.name}
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={passwordData[field.name]}
                                                    onChange={handlePasswordChange}
                                                    sx={textFieldStyle}
                                                    size={isSmallMobile ? "small" : "medium"}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    edge="end"
                                                                    size="small"
                                                                >
                                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            ))}

                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={showPassword}
                                                        onChange={() => setShowPassword(!showPassword)}
                                                        sx={{
                                                            color: '#1153a5',
                                                            '&.Mui-checked': { color: '#1153a5' },
                                                        }}
                                                        size={isSmallMobile ? "small" : "medium"}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={{ ...fontStyle, fontSize: '0.9rem' }}>
                                                        Show passwords
                                                    </Typography>
                                                }
                                            />

                                            <Button
                                                fullWidth
                                                onClick={handleChangePassword}
                                                disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                                                sx={{
                                                    ...buttonStyle,
                                                    background: '#1153a5',
                                                    color: 'white',
                                                    '&:hover': {
                                                        background: '#0e478c',
                                                        boxShadow: '0 6px 20px rgba(17, 83, 165, 0.4)',
                                                    },
                                                    '&:disabled': {
                                                        background: '#ccc'
                                                    },
                                                    mt: 1
                                                }}
                                                variant="contained"
                                            >
                                                {saving ? <CircularProgress size={20} /> : 'Update Password'}
                                            </Button>

                                            <Divider sx={{ my: 2 }} />

                                            {/* Danger Zone */}
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    ...fontStyle,
                                                    fontWeight: 600,
                                                    color: '#d9534f',
                                                }}
                                            >
                                                Danger Zone
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    ...fontStyle,
                                                    color: '#666',
                                                    mb: 2
                                                }}
                                            >
                                                Once you delete your account, there is no going back.
                                            </Typography>
                                            <Button
                                                fullWidth
                                                startIcon={<DeleteIcon />}
                                                onClick={() => setDeleteDialogOpen(true)}
                                                sx={{
                                                    ...buttonStyle,
                                                    color: '#d9534f',
                                                    borderColor: '#d9534f',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(217, 83, 79, 0.1)',
                                                        borderColor: '#d9534f',
                                                    }
                                                }}
                                                variant="outlined"
                                            >
                                                Delete Account
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Preferences */}
                                <Card sx={{
                                    borderRadius: '16px',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                ...fontStyle,
                                                fontWeight: 700,
                                                color: '#333',
                                                mb: 3
                                            }}
                                        >
                                            Notification Preferences
                                        </Typography>

                                        <div className="mobile-preferences" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name="newsletter"
                                                        checked={getBooleanValue(formData.newsletter)}
                                                        onChange={handleInputChange}
                                                        disabled={!editMode}
                                                        sx={{
                                                            color: '#1153a5',
                                                            '&.Mui-checked': { color: '#1153a5' },
                                                        }}
                                                        size={isSmallMobile ? "small" : "medium"}
                                                    />
                                                }
                                                label={
                                                    <div>
                                                        <Typography sx={{ ...fontStyle, fontWeight: 500, fontSize: '0.9rem' }}>
                                                            Newsletter Subscription
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ ...fontStyle, color: '#666', fontSize: '0.8rem' }}>
                                                            Receive weekly travel updates
                                                        </Typography>
                                                    </div>
                                                }
                                            />

                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name="notifications"
                                                        checked={getBooleanValue(formData.notifications)}
                                                        onChange={handleInputChange}
                                                        disabled={!editMode}
                                                        sx={{
                                                            color: '#1153a5',
                                                            '&.Mui-checked': { color: '#1153a5' },
                                                        }}
                                                        size={isSmallMobile ? "small" : "medium"}
                                                    />
                                                }
                                                label={
                                                    <div>
                                                        <Typography sx={{ ...fontStyle, fontWeight: 500, fontSize: '0.9rem' }}>
                                                            Push Notifications
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ ...fontStyle, color: '#666', fontSize: '0.8rem' }}>
                                                            Get instant notifications
                                                        </Typography>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </Fade>
                    </div>
                ) : (
                    /* Desktop Layout */
                    <div className="profile-grid" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '0.5fr 2fr', 
                        gap: '32px', 
                        alignItems: 'start' 
                    }}>
                        {/* Left Column - Profile Summary */}
                        <div className="left-column" style={{ height: '100vh', position: 'sticky', top: '16px' }}>
                            <Fade in={true} timeout={1000}>
                                <div>
                                    <Card sx={{
                                        borderRadius: '20px',
                                        background: 'linear-gradient(135deg, #1153a5 0%, #1a6fd6 100%)',
                                        color: 'white',
                                        boxShadow: '0 10px 30px rgba(17, 83, 165, 0.3)',
                                        height: 'fit-content'
                                    }}>
                                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                                                <Avatar
                                                    src={user.profile_picture}
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                        mx: 'auto',
                                                        mb: 2,
                                                        border: '3px solid rgba(255,255,255,0.3)',
                                                        bgcolor: 'rgba(255,255,255,0.2)',
                                                        color: 'white'
                                                    }}
                                                >
                                                    <PersonIcon sx={{ fontSize: '4rem' }} />
                                                </Avatar>

                                                <input
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    id="profile-picture-upload"
                                                    type="file"
                                                    onChange={handleProfilePictureUpload}
                                                    disabled={uploading}
                                                />

                                                <label htmlFor="profile-picture-upload">
                                                    <IconButton
                                                        component="span"
                                                        disabled={uploading}
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 8,
                                                            right: 8,
                                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                                            color: '#1153a5',
                                                            '&:hover': {
                                                                backgroundColor: 'white'
                                                            },
                                                            '&:disabled': {
                                                                backgroundColor: 'rgba(255,255,255,0.5)',
                                                            },
                                                            width: 32,
                                                            height: 32
                                                        }}
                                                    >
                                                        {uploading ? (
                                                            <CircularProgress size={16} />
                                                        ) : (
                                                            <CameraIcon sx={{ fontSize: '1rem' }} />
                                                        )}
                                                    </IconButton>
                                                </label>

                                                {user.profile_picture && (
                                                    <IconButton
                                                        onClick={handleRemoveProfilePicture}
                                                        disabled={uploading}
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 8,
                                                            left: 8,
                                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                                            color: '#d9534f',
                                                            '&:hover': {
                                                                backgroundColor: 'white'
                                                            },
                                                            '&:disabled': {
                                                                backgroundColor: 'rgba(255,255,255,0.5)',
                                                            },
                                                            width: 32,
                                                            height: 32
                                                        }}
                                                    >
                                                        <DeleteIcon sx={{ fontSize: '1rem' }} />
                                                    </IconButton>
                                                )}
                                            </div>

                                            {uploading && (
                                                <Box sx={{ width: '100%', mt: 1 }}>
                                                    <Typography variant="caption" sx={{ ...fontStyle, color: 'white', display: 'block', textAlign: 'center' }}>
                                                        Uploading: {uploadProgress}%
                                                    </Typography>
                                                    <Box sx={{
                                                        width: '100%',
                                                        height: 4,
                                                        backgroundColor: 'rgba(255,255,255,0.3)',
                                                        borderRadius: 2,
                                                        mt: 0.5
                                                    }}>
                                                        <Box
                                                            sx={{
                                                                height: '100%',
                                                                backgroundColor: 'white',
                                                                borderRadius: 2,
                                                                width: `${uploadProgress}%`,
                                                                transition: 'width 0.3s ease'
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                            )}

                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    ...fontStyle,
                                                    fontWeight: 700,
                                                    mb: 1
                                                }}
                                            >
                                                {user.first_name} {user.last_name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    ...fontStyle,
                                                    opacity: 0.9,
                                                    mb: 3
                                                }}
                                            >
                                                {user.email}
                                            </Typography>

                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '20px',
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '16px',
                                                padding: '20px',
                                                marginBottom: '16px'
                                            }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <Typography variant="caption" sx={{ ...fontStyle, opacity: 0.8, display: 'block', mb: 1 }}>
                                                        Member since
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ ...fontStyle, fontWeight: 600, fontSize: '1rem' }}>
                                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: '2-digit'
                                                        })}
                                                    </Typography>
                                                </div>

                                                {user.az_coins !== undefined && (
                                                    <div style={{
                                                        textAlign: 'center',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '12px'
                                                    }}>
                                                        <Typography variant="caption" sx={{ ...fontStyle, opacity: 0.8 }}>
                                                            AZ Coins
                                                        </Typography>
                                                        <div style={{
                                                            alignItems: 'center',
                                                            gap: '12px',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <img
                                                                src="https://azholidays.s3.ap-southeast-1.amazonaws.com/coin.png"
                                                                alt="AZ Coins"
                                                                style={{
                                                                    width: '200px',
                                                                    height: '200px',
                                                                    objectFit: 'contain'
                                                                }}
                                                            />
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    ...fontStyle,
                                                                    fontWeight: 700,
                                                                    fontSize: '1.5rem'
                                                                }}
                                                            >
                                                                {user.az_coins} coins
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    ...fontStyle,
                                                                    fontWeight: 600,
                                                                    color: 'rgba(255,255,255,0.9)',
                                                                    fontSize: '1.1rem',
                                                                    mt: 1
                                                                }}
                                                            >
                                                                ≈ SGD ${(user.az_coins * 0.01).toFixed(2)}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Fade>
                        </div>

                        {/* Right Column - Main Content */}
                        <div className="right-column">
                            <Fade in={true} timeout={1200}>
                                <div className="content-stack" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {/* Personal Info Container */}
                                    <Card sx={{
                                        borderRadius: '20px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    }}>
                                        <CardContent sx={{ p: 4 }}>
                                            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        ...fontStyle,
                                                        fontWeight: 700,
                                                        color: '#333'
                                                    }}
                                                >
                                                    Personal Information
                                                </Typography>
                                                {!editMode ? (
                                                    <Button
                                                        startIcon={<EditIcon />}
                                                        onClick={() => setEditMode(true)}
                                                        sx={{
                                                            ...buttonStyle,
                                                            background: '#1153a5',
                                                            color: 'white',
                                                            '&:hover': {
                                                                background: '#0e478c',
                                                                boxShadow: '0 6px 20px rgba(17, 83, 165, 0.4)',
                                                                transform: 'translateY(-2px)'
                                                            }
                                                        }}
                                                        variant="contained"
                                                    >
                                                        Edit Profile
                                                    </Button>
                                                ) : (
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <Button
                                                            startIcon={<CancelIcon />}
                                                            onClick={handleCancelEdit}
                                                            sx={{
                                                                ...buttonStyle,
                                                                color: '#666',
                                                                borderColor: '#ddd',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(102, 102, 102, 0.1)',
                                                                    borderColor: '#666'
                                                                }
                                                            }}
                                                            variant="outlined"
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            startIcon={<SaveIcon />}
                                                            onClick={handleSaveProfile}
                                                            disabled={saving}
                                                            sx={{
                                                                ...buttonStyle,
                                                                background: '#1153a5',
                                                                color: 'white',
                                                                '&:hover': {
                                                                    background: '#0e478c',
                                                                    boxShadow: '0 6px 20px rgba(17, 83, 165, 0.4)',
                                                                    transform: 'translateY(-2px)'
                                                                },
                                                                '&:disabled': {
                                                                    background: '#ccc'
                                                                }
                                                            }}
                                                            variant="contained"
                                                        >
                                                            {saving ? <CircularProgress size={20} /> : 'Save Changes'}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                                {[
                                                    { label: "First Name", name: "firstName", icon: <PersonIcon /> },
                                                    { label: "Last Name", name: "lastName", icon: <PersonIcon /> },
                                                    { label: "Email Address", name: "email", type: "email", icon: <EmailIcon />, fullWidth: true },
                                                    { label: "Phone Number", name: "phone", icon: <PhoneIcon /> },
                                                    { label: "Date of Birth", name: "dateOfBirth", type: "date" },
                                                    { label: "Address", name: "address", icon: <LocationIcon />, fullWidth: true },
                                                    { label: "City", name: "city" },
                                                    { label: "Country", name: "country" },
                                                ].map((field) => (
                                                    <div key={field.name} style={{ gridColumn: field.fullWidth ? 'span 2' : 'span 1' }}>
                                                        <TextField
                                                            fullWidth
                                                            label={field.label}
                                                            name={field.name}
                                                            type={field.type || 'text'}
                                                            value={formData[field.name]}
                                                            onChange={handleInputChange}
                                                            disabled={!editMode}
                                                            InputProps={{
                                                                startAdornment: field.icon ? (
                                                                    <InputAdornment position="start">
                                                                        {field.icon}
                                                                    </InputAdornment>
                                                                ) : null,
                                                            }}
                                                            InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                                                            sx={textFieldStyle}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Security Container */}
                                    <Card sx={{
                                        borderRadius: '20px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    }}>
                                        <CardContent sx={{ p: 4 }}>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    ...fontStyle,
                                                    fontWeight: 700,
                                                    color: '#333',
                                                    mb: 4
                                                }}
                                            >
                                                Security Settings
                                            </Typography>

                                            <div className="security-content" style={{ maxWidth: '500px' }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        ...fontStyle,
                                                        fontWeight: 600,
                                                        color: '#333',
                                                        mb: 3
                                                    }}
                                                >
                                                    Change Password
                                                </Typography>

                                                <div className="password-fields" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                                                    {[
                                                        { label: "Current Password", name: "currentPassword" },
                                                        { label: "New Password", name: "newPassword" },
                                                        { label: "Confirm New Password", name: "confirmPassword" }
                                                    ].map((field) => (
                                                        <TextField
                                                            key={field.name}
                                                            fullWidth
                                                            label={field.label}
                                                            name={field.name}
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={passwordData[field.name]}
                                                            onChange={handlePasswordChange}
                                                            sx={textFieldStyle}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            onClick={() => setShowPassword(!showPassword)}
                                                                            edge="end"
                                                                        >
                                                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    ))}

                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={showPassword}
                                                                onChange={() => setShowPassword(!showPassword)}
                                                                sx={{
                                                                    color: '#1153a5',
                                                                    '&.Mui-checked': { color: '#1153a5' },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <Typography sx={{ ...fontStyle, fontSize: '0.9rem' }}>
                                                                Show passwords
                                                            </Typography>
                                                        }
                                                    />

                                                    <Button
                                                        onClick={handleChangePassword}
                                                        disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                                                        sx={{
                                                            ...buttonStyle,
                                                            background: '#1153a5',
                                                            color: 'white',
                                                            '&:hover': {
                                                                background: '#0e478c',
                                                                boxShadow: '0 6px 20px rgba(17, 83, 165, 0.4)',
                                                                transform: 'translateY(-2px)'
                                                            },
                                                            '&:disabled': {
                                                                background: '#ccc'
                                                            },
                                                            marginTop: '16px'
                                                        }}
                                                        variant="contained"
                                                    >
                                                        {saving ? <CircularProgress size={20} /> : 'Update Password'}
                                                    </Button>
                                                </div>

                                                <Divider sx={{ my: 4 }} />

                                                {/* Danger Zone */}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        ...fontStyle,
                                                        fontWeight: 600,
                                                        color: '#d9534f',
                                                        mb: 2
                                                    }}
                                                >
                                                    Danger Zone
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        ...fontStyle,
                                                        color: '#666',
                                                        mb: 3
                                                    }}
                                                >
                                                    Once you delete your account, there is no going back. Please be certain.
                                                </Typography>
                                                <Button
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => setDeleteDialogOpen(true)}
                                                    sx={{
                                                        ...buttonStyle,
                                                        color: '#d9534f',
                                                        borderColor: '#d9534f',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(217, 83, 79, 0.1)',
                                                            borderColor: '#d9534f',
                                                            transform: 'translateY(-2px)'
                                                        }
                                                    }}
                                                    variant="outlined"
                                                >
                                                    Delete Account
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Preferences Container */}
                                    <Card sx={{
                                        borderRadius: '20px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    }}>
                                        <CardContent sx={{ p: 4 }}>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    ...fontStyle,
                                                    fontWeight: 700,
                                                    color: '#333',
                                                    mb: 4
                                                }}
                                            >
                                                Notification Preferences
                                            </Typography>

                                            <div className="preferences-content" style={{ maxWidth: '600px' }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        ...fontStyle,
                                                        fontWeight: 600,
                                                        color: '#333',
                                                        mb: 3
                                                    }}
                                                >
                                                    Communication Settings
                                                </Typography>

                                                <div className="preference-switches" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                name="newsletter"
                                                                checked={getBooleanValue(formData.newsletter)}
                                                                onChange={handleInputChange}
                                                                disabled={!editMode}
                                                                sx={{
                                                                    color: '#1153a5',
                                                                    '&.Mui-checked': { color: '#1153a5' },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <div>
                                                                <Typography sx={{ ...fontStyle, fontWeight: 500 }}>
                                                                    Newsletter Subscription
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ ...fontStyle, color: '#666' }}>
                                                                    Receive weekly travel updates and exclusive deals
                                                                </Typography>
                                                            </div>
                                                        }
                                                    />

                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                name="notifications"
                                                                checked={getBooleanValue(formData.notifications)}
                                                                onChange={handleInputChange}
                                                                disabled={!editMode}
                                                                sx={{
                                                                    color: '#1153a5',
                                                                    '&.Mui-checked': { color: '#1153a5' },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <div>
                                                                <Typography sx={{ ...fontStyle, fontWeight: 500 }}>
                                                                    Push Notifications
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ ...fontStyle, color: '#666' }}>
                                                                    Get instant notifications about your bookings and promotions
                                                                </Typography>
                                                            </div>
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Fade>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Account Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: '16px' }
                }}
            >
                <DialogTitle sx={{ ...fontStyle, color: '#d9534f', fontWeight: 600, textAlign: 'center' }}>
                    <DeleteIcon sx={{ fontSize: isMobile ? 32 : 40, mb: 1, display: 'block', mx: 'auto' }} />
                    Delete Account
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ ...fontStyle, mb: 2, textAlign: 'center', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                        This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                    </Typography>
                    <TextField
                        fullWidth
                        label="Enter your password to confirm"
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        sx={textFieldStyle}
                        size={isMobile ? "small" : "medium"}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3, gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                    <Button
                        fullWidth={isMobile}
                        onClick={() => setDeleteDialogOpen(false)}
                        sx={{
                            ...fontStyle,
                            color: '#666',
                            borderRadius: '12px',
                            px: 3
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        fullWidth={isMobile}
                        onClick={handleDeleteAccount}
                        disabled={deleting || !deletePassword}
                        sx={{
                            ...fontStyle,
                            color: '#d9534f',
                            borderColor: '#d9534f',
                            borderRadius: '12px',
                            px: 3,
                            '&:hover': {
                                backgroundColor: 'rgba(217, 83, 79, 0.1)'
                            }
                        }}
                        variant="outlined"
                    >
                        {deleting ? <CircularProgress size={20} /> : 'Delete Account'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Profile;
