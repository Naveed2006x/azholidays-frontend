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
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [originalFormData, setOriginalFormData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [deletePictureDialogOpen, setDeletePictureDialogOpen] = useState(false);
    const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());

    const navigate = useNavigate();
    const { showToast } = useToast();
    const { updateUser } = useAuth();
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

    // Helper to get profile image URL with cache-busting
    const getProfileImageUrl = () => {
        if (!user?.profile_image_url) return null;
        // Add timestamp to force refresh after upload
        return `${user.profile_image_url}?t=${user._imageRefresh || Date.now()}`;
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
            const response = await profileAPI.uploadProfilePicture(file, (progress) => {
                setUploadProgress(progress);
            });

            if (response.success) {
                // Update user with new profile picture - handle all possible response structures
                const profileImageUrl = response.imageUrl || response.user?.profile_image_url || response.user?.profileImageUrl || response.profileImageUrl;
                
                const updatedUser = {
                    ...user,
                    profile_image_url: profileImageUrl,
                    profileImage: profileImageUrl,
                    _imageRefresh: Date.now()
                };
                
                // Update all states synchronously
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                updateUser(updatedUser);
                
                // Force Avatar re-render by updating key
                setImageRefreshKey(Date.now());
                
                // Dispatch custom event to notify Navbar
                setTimeout(() => {
                    window.dispatchEvent(new Event('profileImageUpdated'));
                }, 100);
                
                showToast('Profile picture updated successfully!', 'success');
            }
        } catch (error) {
            console.error('Profile picture upload failed:', error);
            const errorMessage = error.response?.data?.message || 'Failed to upload profile picture';
            showToast(errorMessage, 'error');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    // Updated remove profile picture function
    const handleRemoveProfilePicture = async () => {
        try {
            const response = await profileAPI.deleteProfilePicture();

            if (response.success) {
                // Update user with removed profile picture
                const updatedUser = {
                    ...user,
                    profile_image_url: null,
                    profileImage: null, // Add this for consistency
                    _imageRefresh: Date.now() // Add refresh timestamp
                };
                
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                updateUser(updatedUser); // Sync with AuthContext
                
                // Force Avatar re-render by updating key
                setImageRefreshKey(Date.now());
                
                // Dispatch custom event to notify Navbar (with small delay to ensure localStorage is updated)
                setTimeout(() => {
                    window.dispatchEvent(new Event('profileImageUpdated'));
                }, 100);
                
                setDeletePictureDialogOpen(false);
                showToast('Profile picture removed successfully!', 'success');
            }
        } catch (error) {
            console.error('Profile picture removal failed:', error);
            const errorMessage = error.response?.data?.message || 'Failed to remove profile picture';
            showToast(errorMessage, 'error');
        }
    };

    // Load user data on component mount - UPDATED
    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login');
                return;
            }

            // Get profile from backend
            const response = await profileAPI.getProfile();

            if (response.success) {
                const userData = response.user;
                
                // Update localStorage with complete user data including profile image
                const userForStorage = {
                    ...userData,
                    profileImage: userData.profile_image_url || null,
                    firstName: userData.first_name,
                    lastName: userData.last_name
                };
                localStorage.setItem('user', JSON.stringify(userForStorage));
                
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
                const initialData = {
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
                };
                setFormData(initialData);
                setOriginalFormData(initialData);
                setHasChanges(false);
            }
        } catch (error) {
            console.error('Profile load failed:', error);
            showToast('Failed to load profile', 'error');
            if (error.response?.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => {
            const updated = {
                ...prev,
                [name]: newValue
            };
            
            // Check if there are any changes
            if (originalFormData) {
                const changed = Object.keys(updated).some(key => 
                    updated[key] !== originalFormData[key]
                );
                setHasChanges(changed);
            }
            
            return updated;
        });
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
            // Prepare data for backend (match backend field names)
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                country_code: user?.country_code || '+65',
                dateOfBirth: formData.dateOfBirth,
                newsletter: formData.newsletter,
                notifications: formData.notifications
            };

            const response = await profileAPI.updateProfile(updateData);

            if (response.success) {
                // Update user in state and localStorage
                const updatedUser = {
                    ...user,
                    first_name: response.user.first_name,
                    last_name: response.user.last_name,
                    email: response.user.email,
                    phone: response.user.phone,
                    address: response.user.address,
                    city: response.user.city,
                    country: response.user.country,
                    country_code: response.user.country_code,
                    date_of_birth: response.user.date_of_birth,
                    newsletter: response.user.newsletter,
                    notifications: response.user.notifications
                };

                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);

                // Update access token if email changed
                if (response.token) {
                    localStorage.setItem('accessToken', response.token);
                }

                showToast('Profile updated successfully!', 'success');
                setOriginalFormData(formData);
                setHasChanges(false);
            }
        } catch (error) {
            console.error('Profile update failed:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile';
            showToast(errorMessage, 'error');
            
            if (error.response?.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                navigate('/login');
            }
        } finally {
            setSaving(false);
        }
    };

    // Change password function
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
            const errorMessage = error.response?.data?.message || error.message || 'Failed to change password';
            showToast(errorMessage, 'error');
            
            if (error.response?.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                navigate('/login');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleCancelEdit = () => {
        if (originalFormData) {
            setFormData(originalFormData);
            setHasChanges(false);
        }
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
                                            src={getProfileImageUrl()}
                                            key={imageRefreshKey}
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
                                        {user.profile_image_url && (
                                            <IconButton
                                                onClick={() => setDeletePictureDialogOpen(true)}
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
                                                    src={getProfileImageUrl()}
                                                    key={user?._imageRefresh || 'default'}
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

                                                {user.profile_image_url && (
                                                    <IconButton
                                                        onClick={() => setDeletePictureDialogOpen(true)}
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

            {/* Sticky Bottom Action Bar - Shows only when there are changes */}
            {hasChanges && (
                <Fade in={hasChanges}>
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'white',
                            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
                            padding: isMobile ? '16px' : '20px 32px',
                            zIndex: 1000,
                            borderTop: '1px solid #e0e0e0',
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: '1200px',
                                margin: '0 auto',
                                display: 'flex',
                                justifyContent: isMobile ? 'center' : 'flex-end',
                                gap: 2,
                            }}
                        >
                            <Button
                                startIcon={<CancelIcon />}
                                onClick={handleCancelEdit}
                                sx={{
                                    ...buttonStyle,
                                    color: '#666',
                                    borderColor: '#ddd',
                                    minWidth: isMobile ? '120px' : '140px',
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
                                    minWidth: isMobile ? '120px' : '140px',
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
                                {saving ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Save Changes'}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            )}

            {/* Delete Profile Picture Confirmation Dialog */}
            <Dialog
                open={deletePictureDialogOpen}
                onClose={() => setDeletePictureDialogOpen(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: { 
                        borderRadius: '20px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    ...fontStyle, 
                    pt: 4, 
                    pb: 2,
                    textAlign: 'center'
                }}>
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(217, 83, 79, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2
                        }}
                    >
                        <DeleteIcon sx={{ fontSize: 32, color: '#d9534f' }} />
                    </Box>
                    <Typography
                        sx={{
                            ...fontStyle,
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: '#333'
                        }}
                    >
                        Remove Profile Picture?
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ pb: 2 }}>
                    <Typography sx={{ 
                        ...fontStyle, 
                        textAlign: 'center', 
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        color: '#666',
                        lineHeight: 1.6
                    }}>
                        Your profile picture will be permanently removed. You can always upload a new one later.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ 
                    p: 3, 
                    pt: 2,
                    gap: 2, 
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'center'
                }}>
                    <Button
                        fullWidth={isMobile}
                        onClick={() => setDeletePictureDialogOpen(false)}
                        sx={{
                            ...fontStyle,
                            color: '#666',
                            borderColor: '#ddd',
                            borderRadius: '12px',
                            px: 4,
                            py: 1.2,
                            fontWeight: 500,
                            textTransform: 'none',
                            '&:hover': {
                                borderColor: '#999',
                                backgroundColor: 'rgba(0,0,0,0.02)'
                            }
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        fullWidth={isMobile}
                        onClick={handleRemoveProfilePicture}
                        sx={{
                            ...fontStyle,
                            backgroundColor: '#d9534f',
                            color: 'white',
                            borderRadius: '12px',
                            px: 4,
                            py: 1.2,
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: '0 4px 14px rgba(217, 83, 79, 0.3)',
                            '&:hover': {
                                backgroundColor: '#c9302c',
                                boxShadow: '0 6px 20px rgba(217, 83, 79, 0.4)'
                            }
                        }}
                        variant="contained"
                    >
                        Yes, Remove
                    </Button>
                </DialogActions>
            </Dialog>

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

