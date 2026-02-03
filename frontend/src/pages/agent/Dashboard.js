import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Badge,
  Stack,
  Tabs,
  Tab,
  Button,
  Avatar,
  Tooltip
} from '@mui/material';
import {
  Search,
  FilterList,
  OpenInNew,
  AccessTime,
  Warning,
  CheckCircle,
  Cancel,
  HourglassEmpty,
  Send,
  AttachMoney,
  Refresh
} from '@mui/icons-material';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');

  // Format date to readable format (e.g., "15 Jan 2025")
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState('all');
  const [visaTypeFilter, setVisaTypeFilter] = useState('all');
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    new: 0,
    awaitingDocs: 0,
    underReview: 0,
    submitted: 0,
    approved: 0,
    rejected: 0
  });

  // Mock data - replace with API call
  useEffect(() => {
    const mockApplications = [
      {
        id: 'AZVISA12345678',
        applicantName: 'John Smith',
        nationality: 'Singapore',
        passportNumber: 'K1234567',
        visaType: 'Tourist',
        status: 'new',
        travelDate: '2026-02-15',
        submittedDate: '2026-01-25',
        priority: 'high',
        slaHours: 2,
        email: 'john@example.com',
        phone: '+65 9123 4567',
        assignedAgent: 'Sarah Tan'
      },
      {
        id: 'AZVISA12345679',
        applicantName: 'Mary Johnson',
        nationality: 'United States',
        passportNumber: 'US987654',
        visaType: 'Business',
        status: 'awaitingDocs',
        travelDate: '2026-03-20',
        submittedDate: '2026-01-24',
        priority: 'normal',
        slaHours: 18,
        email: 'mary@example.com',
        phone: '+1 555 0123',
        assignedAgent: 'David Lee'
      },
      {
        id: 'AZVISA12345680',
        applicantName: 'Ahmad Rahman',
        nationality: 'Malaysia',
        passportNumber: 'MY456789',
        visaType: 'Medical',
        status: 'underReview',
        travelDate: '2026-02-28',
        submittedDate: '2026-01-23',
        priority: 'urgent',
        slaHours: 4,
        email: 'ahmad@example.com',
        phone: '+60 12 345 6789',
        assignedAgent: 'Sarah Tan'
      },
      {
        id: 'AZVISA12345681',
        applicantName: 'Emma Wilson',
        nationality: 'United Kingdom',
        passportNumber: 'GB123456',
        visaType: 'Tourist',
        status: 'submitted',
        travelDate: '2026-04-10',
        submittedDate: '2026-01-20',
        priority: 'normal',
        slaHours: 48,
        email: 'emma@example.com',
        phone: '+44 20 1234 5678',
        assignedAgent: 'David Lee',
        govtRefNumber: 'IN2026012001234'
      },
      {
        id: 'AZVISA12345682',
        applicantName: 'Chen Wei',
        nationality: 'China',
        passportNumber: 'CN789012',
        visaType: 'Business',
        status: 'approved',
        travelDate: '2026-03-05',
        submittedDate: '2026-01-18',
        priority: 'normal',
        email: 'chen@example.com',
        phone: '+86 138 0000 1234',
        assignedAgent: 'Sarah Tan',
        approvedDate: '2026-01-23'
      }
    ];

    setApplications(mockApplications);

    // Calculate stats
    const newStats = {
      new: mockApplications.filter(app => app.status === 'new').length,
      awaitingDocs: mockApplications.filter(app => app.status === 'awaitingDocs').length,
      underReview: mockApplications.filter(app => app.status === 'underReview').length,
      submitted: mockApplications.filter(app => app.status === 'submitted').length,
      approved: mockApplications.filter(app => app.status === 'approved').length,
      rejected: mockApplications.filter(app => app.status === 'rejected').length
    };
    setStats(newStats);
  }, []);

  const getStatusConfig = (status) => {
    const configs = {
      new: { label: 'New', color: '#2563eb', bgColor: '#dbeafe', icon: <HourglassEmpty /> },
      awaitingDocs: { label: 'Awaiting Documents', color: '#ea580c', bgColor: '#fed7aa', icon: <Warning /> },
      underReview: { label: 'Under Review', color: '#7c3aed', bgColor: '#ede9fe', icon: <AccessTime /> },
      submitted: { label: 'Submitted to Govt', color: '#0891b2', bgColor: '#cffafe', icon: <Send /> },
      approved: { label: 'Approved', color: '#16a34a', bgColor: '#dcfce7', icon: <CheckCircle /> },
      rejected: { label: 'Rejected', color: '#dc2626', bgColor: '#fee2e2', icon: <Cancel /> }
    };
    return configs[status] || configs.new;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      urgent: { label: 'URGENT', color: '#dc2626', bgColor: '#fee2e2' },
      high: { label: 'High', color: '#ea580c', bgColor: '#fed7aa' },
      normal: { label: 'Normal', color: '#64748b', bgColor: '#f1f5f9' }
    };
    return configs[priority] || configs.normal;
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.passportNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNationality = nationalityFilter === 'all' || app.nationality === nationalityFilter;
    const matchesVisaType = visaTypeFilter === 'all' || app.visaType === visaTypeFilter;
    
    return matchesStatus && matchesSearch && matchesNationality && matchesVisaType;
  });

  const handleOpenApplication = (id) => {
    navigate(`/agent/application/${id}`);
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Box>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '2rem',
                color: '#1a1a1a',
                mb: 0.5
              }}>
                Agent Dashboard
              </Typography>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                color: '#64748b'
              }}>
                Manage India e-Visa applications efficiently
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                startIcon={<Refresh />}
                variant="outlined"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: 'none',
                  borderRadius: '12px',
                  borderColor: '#e2e8f0',
                  color: '#64748b',
                  fontWeight: 500,
                  px: 3,
                  py: 1,
                  '&:hover': { 
                    borderColor: '#2c5aa0', 
                    bgcolor: 'rgba(44, 90, 160, 0.04)',
                    color: '#2c5aa0'
                  }
                }}
              >
                Refresh
              </Button>
              <Card sx={{ 
                px: 2, 
                py: 1, 
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: 'none'
              }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar sx={{ bgcolor: '#2c5aa0', width: 32, height: 32, fontSize: '0.9rem' }}>ST</Avatar>
                  <Box>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      lineHeight: 1.2
                    }}>
                      Sarah Tan
                    </Typography>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.75rem',
                      color: '#64748b',
                      lineHeight: 1.2
                    }}>
                      Visa Agent
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </Stack>
        </Box>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div>
            <Card sx={{ 
              p: 2, 
              borderRadius: '16px', 
              border: '1px solid #e2e8f0',
              boxShadow: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                transform: 'translateY(-2px)'
              }
            }}>
              <Stack spacing={1.5}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '10px', 
                  bgcolor: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563eb'
                }}>
                  <HourglassEmpty sx={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '0.8rem', 
                    color: '#64748b',
                    fontWeight: 500,
                    mb: 0.5
                  }}>
                    New Applications
                  </Typography>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '1.75rem', 
                    fontWeight: 700, 
                    color: '#1a1a1a',
                    lineHeight: 1
                  }}>
                    {stats.new}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </div>

          <div>
            <Card sx={{ 
              p: 2, 
              borderRadius: '16px', 
              border: '1px solid #e2e8f0',
              boxShadow: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                transform: 'translateY(-2px)'
              }
            }}>
              <Stack spacing={1.5}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '10px', 
                  bgcolor: '#fff7ed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ea580c'
                }}>
                  <Warning sx={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '0.8rem', 
                    color: '#64748b',
                    fontWeight: 500,
                    mb: 0.5
                  }}>
                    Awaiting Docs
                  </Typography>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '1.75rem', 
                    fontWeight: 700, 
                    color: '#1a1a1a',
                    lineHeight: 1
                  }}>
                    {stats.awaitingDocs}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </div>

          <div>
            <Card sx={{ 
              p: 2, 
              borderRadius: '16px', 
              border: '1px solid #e2e8f0',
              boxShadow: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                transform: 'translateY(-2px)'
              }
            }}>
              <Stack spacing={1.5}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '10px', 
                  bgcolor: '#faf5ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7c3aed'
                }}>
                  <AccessTime sx={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '0.8rem', 
                    color: '#64748b',
                    fontWeight: 500,
                    mb: 0.5
                  }}>
                    Under Review
                  </Typography>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '1.75rem', 
                    fontWeight: 700, 
                    color: '#1a1a1a',
                    lineHeight: 1
                  }}>
                    {stats.underReview}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </div>

          <div>
            <Card sx={{ 
              p: 2, 
              borderRadius: '16px', 
              border: '1px solid #e2e8f0',
              boxShadow: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                transform: 'translateY(-2px)'
              }
            }}>
              <Stack spacing={1.5}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '10px', 
                  bgcolor: '#ecfeff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0891b2'
                }}>
                  <Send sx={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '0.8rem', 
                    color: '#64748b',
                    fontWeight: 500,
                    mb: 0.5
                  }}>
                    Submitted
                  </Typography>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '1.75rem', 
                    fontWeight: 700, 
                    color: '#1a1a1a',
                    lineHeight: 1
                  }}>
                    {stats.submitted}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </div>

          <div>
            <Card sx={{ 
              p: 2, 
              borderRadius: '16px', 
              border: '1px solid #e2e8f0',
              boxShadow: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                transform: 'translateY(-2px)'
              }
            }}>
              <Stack spacing={1.5}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '10px', 
                  bgcolor: '#f0fdf4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#16a34a'
                }}>
                  <CheckCircle sx={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '0.8rem', 
                    color: '#64748b',
                    fontWeight: 500,
                    mb: 0.5
                  }}>
                    Approved
                  </Typography>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '1.75rem', 
                    fontWeight: 700, 
                    color: '#1a1a1a',
                    lineHeight: 1
                  }}>
                    {stats.approved}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </div>

          <div>
            <Card sx={{ 
              p: 2, 
              borderRadius: '16px', 
              border: '1px solid #e2e8f0',
              boxShadow: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                transform: 'translateY(-2px)'
              }
            }}>
              <Stack spacing={1.5}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '10px', 
                  bgcolor: '#fef2f2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dc2626'
                }}>
                  <Cancel sx={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '0.8rem', 
                    color: '#64748b',
                    fontWeight: 500,
                    mb: 0.5
                  }}>
                    Rejected
                  </Typography>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: '1.75rem', 
                    fontWeight: 700, 
                    color: '#1a1a1a',
                    lineHeight: 1
                  }}>
                    {stats.rejected}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <Card sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: 'none'
        }}>
          <Stack spacing={2.5}>
            {/* Search */}
            <TextField
              fullWidth
              size="medium"
              placeholder="Search by name, ID, or passport number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: '#94a3b8', mr: 1.5, fontSize: 22 }} />
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: "'Poppins', sans-serif",
                  borderRadius: '12px',
                  bgcolor: '#f8fafc',
                  fontSize: '0.95rem',
                  '& fieldset': {
                    borderColor: '#e2e8f0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#cbd5e1'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2563eb',
                    borderWidth: '2px'
                  }
                }
              }}
            />

            {/* Dropdowns Row */}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: '#2563eb'
                  }
                }}>
                  Nationality
                </InputLabel>
                <Select
                  value={nationalityFilter}
                  onChange={(e) => setNationalityFilter(e.target.value)}
                  label="Nationality"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    borderRadius: '12px',
                    bgcolor: '#f8fafc',
                    fontSize: '0.95rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e2e8f0'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#cbd5e1'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2563eb',
                      borderWidth: '2px'
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        mt: 1,
                        '& .MuiMenuItem-root': {
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.9rem',
                          py: 1.25,
                          '&:hover': {
                            bgcolor: '#f1f5f9'
                          },
                          '&.Mui-selected': {
                            bgcolor: '#eff6ff',
                            '&:hover': {
                              bgcolor: '#dbeafe'
                            }
                          }
                        }
                      }
                    }
                  }}
                >
                  <MenuItem value="all">All Nationalities</MenuItem>
                  <MenuItem value="Singapore">Singapore</MenuItem>
                  <MenuItem value="United States">United States</MenuItem>
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  <MenuItem value="Malaysia">Malaysia</MenuItem>
                  <MenuItem value="China">China</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: '#2563eb'
                  }
                }}>
                  Visa Type
                </InputLabel>
                <Select
                  value={visaTypeFilter}
                  onChange={(e) => setVisaTypeFilter(e.target.value)}
                  label="Visa Type"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    borderRadius: '12px',
                    bgcolor: '#f8fafc',
                    fontSize: '0.95rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e2e8f0'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#cbd5e1'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2563eb',
                      borderWidth: '2px'
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        mt: 1,
                        '& .MuiMenuItem-root': {
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.9rem',
                          py: 1.25,
                          '&:hover': {
                            bgcolor: '#f1f5f9'
                          },
                          '&.Mui-selected': {
                            bgcolor: '#eff6ff',
                            '&:hover': {
                              bgcolor: '#dbeafe'
                            }
                          }
                        }
                      }
                    }
                  }}
                >
                  <MenuItem value="all">All Visa Types</MenuItem>
                  <MenuItem value="Tourist">Tourist</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Medical">Medical</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {/* Status Tabs */}
            <Box sx={{ 
              borderRadius: '12px',
              bgcolor: '#f8fafc',
              p: 1
            }}>
              <Tabs 
                value={statusFilter} 
                onChange={(e, newValue) => setStatusFilter(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  minHeight: '44px',
                  '& .MuiTabs-indicator': {
                    display: 'none'
                  },
                  '& .MuiTab-root': {
                    minHeight: '44px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.85rem',
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: '8px',
                    color: '#64748b',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: '#e2e8f0',
                      color: '#1e293b'
                    },
                    '&.Mui-selected': {
                      bgcolor: '#fff',
                      color: '#2563eb',
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }
                  }
                }}
              >
                <Tab label="All Applications" value="all" />
                <Tab label="New" value="new" />
                <Tab label="Awaiting Docs" value="awaitingDocs" />
                <Tab label="Under Review" value="underReview" />
                <Tab label="Submitted" value="submitted" />
                <Tab label="Approved" value="approved" />
                <Tab label="Rejected" value="rejected" />
              </Tabs>
            </Box>
          </Stack>
        </Card>

        {/* Applications Table */}
        <Card sx={{ 
          borderRadius: '16px', 
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          boxShadow: 'none'
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  <TableCell sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 600, 
                    fontSize: '0.8rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 2
                  }}>
                    Application ID
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 600, 
                    fontSize: '0.8rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 2
                  }}>
                    Applicant
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 600, 
                    fontSize: '0.8rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 2
                  }}>
                    Nationality
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 600, 
                    fontSize: '0.8rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 2
                  }}>
                    Visa Type
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 600, 
                    fontSize: '0.8rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 2
                  }}>
                    Travel Date
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 600, 
                    fontSize: '0.8rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 2
                  }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 600, 
                    fontSize: '0.8rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 2
                  }}>
                    Priority
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 600, 
                    fontSize: '0.8rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 2
                  }}>
                    SLA
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 600, 
                    fontSize: '0.8rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 2
                  }}>
                    Assigned
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 600, 
                    fontSize: '0.8rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 2
                  }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplications.map((app) => {
                  const statusConfig = getStatusConfig(app.status);
                  const priorityConfig = getPriorityConfig(app.priority);
                  const slaWarning = app.slaHours < 6;

                  return (
                    <TableRow 
                      key={app.id}
                      hover
                      sx={{ 
                        '&:hover': { 
                          bgcolor: '#f8fafc',
                          cursor: 'pointer'
                        },
                        borderLeft: app.priority === 'urgent' ? '3px solid #dc2626' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleOpenApplication(app.id)}
                    >
                      <TableCell sx={{ py: 2.5 }}>
                        <Typography sx={{ 
                          fontFamily: "'Poppins', sans-serif", 
                          fontSize: '0.875rem', 
                          fontWeight: 600, 
                          color: '#2563eb',
                          mb: 0.5
                        }}>
                          {app.id}
                        </Typography>
                        <Typography sx={{ 
                          fontFamily: "'Poppins', sans-serif", 
                          fontSize: '0.75rem', 
                          color: '#94a3b8'
                        }}>
                          {formatDate(app.submittedDate)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Typography sx={{ 
                          fontFamily: "'Poppins', sans-serif", 
                          fontSize: '0.875rem', 
                          fontWeight: 500,
                          color: '#1e293b',
                          mb: 0.5
                        }}>
                          {app.applicantName}
                        </Typography>
                        <Typography sx={{ 
                          fontFamily: "'Poppins', sans-serif", 
                          fontSize: '0.75rem', 
                          color: '#64748b'
                        }}>
                          {app.passportNumber}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Typography sx={{ 
                          fontFamily: "'Poppins', sans-serif", 
                          fontSize: '0.875rem',
                          color: '#475569'
                        }}>
                          {app.nationality}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Chip 
                          label={app.visaType}
                          size="small"
                          sx={{ 
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            bgcolor: '#eff6ff',
                            color: '#2563eb',
                            borderRadius: '8px',
                            height: '26px'
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Typography sx={{ 
                          fontFamily: "'Poppins', sans-serif", 
                          fontSize: '0.875rem',
                          color: '#475569'
                        }}>
                          {formatDate(app.travelDate)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Chip
                          icon={statusConfig.icon}
                          label={statusConfig.label}
                          size="small"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            bgcolor: statusConfig.bgColor,
                            color: statusConfig.color,
                            borderRadius: '8px',
                            height: '26px',
                            '& .MuiChip-icon': { 
                              color: statusConfig.color,
                              fontSize: '16px'
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Chip
                          label={priorityConfig.label}
                          size="small"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            bgcolor: priorityConfig.bgColor,
                            color: priorityConfig.color,
                            borderRadius: '8px',
                            height: '26px'
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Chip
                          icon={<AccessTime sx={{ fontSize: '16px !important' }} />}
                          label={`${app.slaHours}h`}
                          size="small"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            bgcolor: slaWarning ? '#fef2f2' : '#f1f5f9',
                            color: slaWarning ? '#dc2626' : '#64748b',
                            borderRadius: '8px',
                            height: '26px',
                            '& .MuiChip-icon': { 
                              color: slaWarning ? '#dc2626' : '#64748b',
                              fontSize: '16px'
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Typography sx={{ 
                          fontFamily: "'Poppins', sans-serif", 
                          fontSize: '0.875rem', 
                          color: '#475569'
                        }}>
                          {app.assignedAgent}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenApplication(app.id);
                          }}
                          sx={{ 
                            color: '#2563eb',
                            bgcolor: '#eff6ff',
                            borderRadius: '8px',
                            width: '32px',
                            height: '32px',
                            '&:hover': {
                              bgcolor: '#dbeafe',
                              transform: 'scale(1.05)'
                            },
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <OpenInNew sx={{ fontSize: '18px' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Box>
  );
};

export default AgentDashboard;
