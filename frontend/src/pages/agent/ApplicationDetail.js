import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Chip,
  TextField,
  Button,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  Stepper,
  Step,
  StepLabel,
  Badge
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Cancel,
  Warning,
  Edit,
  Send,
  Email,
  WhatsApp,
  AttachFile,
  ZoomIn,
  RotateRight,
  Download,
  ExpandMore,
  Timeline,
  Description,
  Person,
  Flight,
  ContactMail,
  Payment,
  Assignment,
  Visibility,
  ThumbUp,
  ThumbDown,
  AccessTime,
  Lock,
  Shield
} from '@mui/icons-material';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

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

  // Format datetime to readable format (e.g., "15 Jan 2025, 2:30 PM")
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  };
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showCommunicationDialog, setShowCommunicationDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [agentNote, setAgentNote] = useState('');
  const [application, setApplication] = useState(null);

  useEffect(() => {
    // Mock data - replace with API call
    const mockApplication = {
      id: id,
      status: 'underReview',
      submittedDate: '2026-01-23 14:30',
      lastUpdated: '2026-01-25 10:15',
      assignedAgent: 'Sarah Tan',
      
      // Applicant Info
      applicant: {
        firstName: 'Ahmad',
        lastName: 'Rahman',
        dateOfBirth: '1985-06-15',
        gender: 'Male',
        nationality: 'Malaysia',
        email: 'ahmad@example.com',
        phone: '+60 12 345 6789',
        emergencyContact: 'Siti Rahman +60 12 999 8888'
      },
      
      // Passport Info
      passport: {
        number: 'MY456789',
        type: 'Regular',
        issueDate: '2020-01-10',
        expiryDate: '2030-01-10',
        placeOfIssue: 'Kuala Lumpur'
      },
      
      // Travel Info
      travel: {
        purpose: 'Medical',
        arrivalDate: '2026-02-28',
        departureDate: '2026-03-15',
        portOfArrival: 'Chennai (Chennai International Airport)',
        durationDays: 16
      },
      
      // Payment Info
      payment: {
        customerPaid: true,
        customerAmount: 150,
        currency: 'SGD',
        paymentDate: '2026-01-23',
        paymentMethod: 'Credit Card',
        govtFeePaid: false,
        govtFeeAmount: 80,
        serviceFee: 70,
        refundEligible: true
      },
      
      // Documents
      documents: [
        {
          id: 1,
          type: 'Passport Bio Page',
          status: 'approved',
          uploadDate: '2026-01-23',
          reviewedBy: 'Sarah Tan',
          reviewDate: '2026-01-24',
          url: '/mock/passport.jpg',
          notes: 'Clear and legible'
        },
        {
          id: 2,
          type: 'Photograph',
          status: 'rejected',
          uploadDate: '2026-01-23',
          reviewedBy: 'Sarah Tan',
          reviewDate: '2026-01-24',
          rejectReason: 'Background not white - appears light grey',
          url: '/mock/photo.jpg',
          notes: 'Requested re-upload via email'
        },
        {
          id: 3,
          type: 'Medical Letter',
          status: 'pending',
          uploadDate: '2026-01-25',
          url: '/mock/medical.pdf',
          notes: null
        }
      ],
      
      // Eligibility Checks
      eligibilityChecks: [
        { check: 'Passport validity ≥ 6 months', status: 'pass', details: 'Valid until 2030-01-10 (3.96 years)' },
        { check: 'Eligible nationality', status: 'pass', details: 'Malaysia - Eligible for e-Visa' },
        { check: 'Blank passport pages', status: 'pass', details: 'Confirmed 2+ blank pages' },
        { check: 'Travel purpose matches visa type', status: 'pass', details: 'Medical purpose - Medical e-Visa' },
        { check: 'Travel date validity', status: 'warning', details: 'Travel in 34 days - expedite processing' },
        { check: 'Photo background', status: 'fail', details: 'Background not white - reupload requested' }
      ],
      
      // Agent Notes
      agentNotes: [
        {
          id: 1,
          agent: 'Sarah Tan',
          timestamp: '2026-01-24 09:30',
          note: 'Photo background slightly grey – requested reupload via email',
          type: 'action'
        },
        {
          id: 2,
          agent: 'Sarah Tan',
          timestamp: '2026-01-24 15:45',
          note: 'Customer travelling in 34 days for medical treatment - marked as URGENT',
          type: 'priority'
        },
        {
          id: 3,
          agent: 'David Lee',
          timestamp: '2026-01-25 10:15',
          note: 'Verified medical appointment letter from Apollo Hospital Chennai',
          type: 'verification'
        }
      ],
      
      // Communication Log
      communications: [
        {
          id: 1,
          timestamp: '2026-01-23 14:35',
          channel: 'Email',
          direction: 'Outbound',
          subject: 'Application Received - AZVISA12345680',
          status: 'Delivered',
          sentBy: 'System'
        },
        {
          id: 2,
          timestamp: '2026-01-24 09:32',
          channel: 'Email',
          direction: 'Outbound',
          subject: 'Photo Re-upload Required',
          status: 'Delivered',
          sentBy: 'Sarah Tan'
        },
        {
          id: 3,
          timestamp: '2026-01-25 08:20',
          channel: 'WhatsApp',
          direction: 'Inbound',
          subject: 'Photo re-uploaded',
          status: 'Read',
          sentBy: 'Ahmad Rahman'
        }
      ],
      
      // Audit Trail
      auditTrail: [
        { timestamp: '2026-01-23 14:30', action: 'Application Submitted', user: 'Ahmad Rahman (Customer)', details: 'Initial submission' },
        { timestamp: '2026-01-23 14:31', action: 'Auto-assigned', user: 'System', details: 'Assigned to Sarah Tan' },
        { timestamp: '2026-01-24 09:15', action: 'Status changed', user: 'Sarah Tan', details: 'New → Under Review' },
        { timestamp: '2026-01-24 09:20', action: 'Document approved', user: 'Sarah Tan', details: 'Passport Bio Page approved' },
        { timestamp: '2026-01-24 09:30', action: 'Document rejected', user: 'Sarah Tan', details: 'Photograph rejected - background issue' },
        { timestamp: '2026-01-24 15:45', action: 'Priority changed', user: 'Sarah Tan', details: 'Normal → Urgent' },
        { timestamp: '2026-01-25 08:25', action: 'Document uploaded', user: 'Ahmad Rahman (Customer)', details: 'New photograph uploaded' }
      ]
    };

    setApplication(mockApplication);
  }, [id]);

  if (!application) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const getStatusConfig = (status) => {
    const configs = {
      pass: { color: '#16a34a', bgColor: '#dcfce7', icon: <CheckCircle /> },
      warning: { color: '#ea580c', bgColor: '#fed7aa', icon: <Warning /> },
      fail: { color: '#dc2626', bgColor: '#fee2e2', icon: <Cancel /> },
      pending: { color: '#64748b', bgColor: '#f1f5f9', icon: <AccessTime /> },
      approved: { color: '#16a34a', bgColor: '#dcfce7', icon: <ThumbUp /> },
      rejected: { color: '#dc2626', bgColor: '#fee2e2', icon: <ThumbDown /> }
    };
    return configs[status] || configs.pending;
  };

  const handleAddNote = () => {
    if (!agentNote.trim()) return;
    
    const newNote = {
      id: application.agentNotes.length + 1,
      agent: 'Sarah Tan',
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      note: agentNote,
      type: 'general'
    };
    
    setApplication({
      ...application,
      agentNotes: [newNote, ...application.agentNotes]
    });
    setAgentNote('');
  };

  const handleStatusChange = (newStatus) => {
    setApplication({
      ...application,
      status: newStatus,
      lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
    });
  };

  const handleViewDocument = (doc) => {
    setSelectedDocument(doc);
    setShowDocumentViewer(true);
  };

  // Generate example document based on type
  const getExampleDocument = (docType) => {
    // You can replace these with actual document URLs
    const examples = {
      'Passport Bio Page': 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=800',
      'Photograph': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      'Medical Letter': 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800'
    };
    return examples[docType] || 'https://via.placeholder.com/800x1000?text=Document';
  };

  return (
    <>
      <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4, px: 4 }}>
      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton 
          onClick={() => navigate('/agent/dashboard')} 
          sx={{ 
            color: '#2563eb',
            bgcolor: '#eff6ff',
            borderRadius: '10px',
            width: 40,
            height: 40,
            '&:hover': {
              bgcolor: '#dbeafe'
            }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#1a1a1a',
            mb: 0.5
          }}>
            {application.id}
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.875rem',
              color: '#64748b'
            }}>
              Submitted: {formatDateTime(application.submittedDate)}
            </Typography>
            <Typography sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.875rem',
              color: '#64748b'
            }}>
              Last Updated: {formatDateTime(application.lastUpdated)}
            </Typography>
          </Stack>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Email />}
            onClick={() => setShowCommunicationDialog(true)}
            sx={{
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'none',
              borderRadius: '12px',
              borderColor: '#e2e8f0',
              color: '#64748b',
              fontWeight: 500,
              px: 2.5,
              '&:hover': {
                borderColor: '#2563eb',
                bgcolor: '#eff6ff',
                color: '#2563eb'
              }
            }}
          >
            Send Email
          </Button>
          <Button
            variant="contained"
            startIcon={<Send />}
            onClick={() => setShowSubmitDialog(true)}
            disabled={application.eligibilityChecks.some(c => c.status === 'fail')}
            sx={{
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'none',
              borderRadius: '12px',
              bgcolor: '#2563eb',
              fontWeight: 500,
              px: 2.5,
              boxShadow: 'none',
              '&:hover': { 
                bgcolor: '#1d4ed8',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }
            }}
          >
            Submit to Govt
          </Button>
        </Stack>
      </Stack>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
        {/* Left Column - Main Content */}
        <div>
          {/* Tabs */}
          <Card sx={{ borderRadius: '16px', mb: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Box sx={{ borderBottom: '1px solid #e2e8f0', bgcolor: '#f8fafc', px: 3, borderRadius: '16px 16px 0 0' }}>
              <Tabs 
                value={activeTab} 
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  '& .MuiTabs-indicator': {
                    height: '3px',
                    borderRadius: '3px 3px 0 0',
                    bgcolor: '#2563eb'
                  },
                  '& .MuiTab-root': {
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#64748b',
                    minHeight: '60px',
                    '&.Mui-selected': {
                      color: '#2563eb',
                      fontWeight: 600
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '20px'
                    }
                  }
                }}
              >
                <Tab label="Application Details" icon={<Description />} iconPosition="start" />
                <Tab label="Documents" icon={<AttachFile />} iconPosition="start" />
                <Tab label="Communications" icon={<Email />} iconPosition="start" />
                <Tab label="Audit Trail" icon={<Timeline />} iconPosition="start" />
              </Tabs>
            </Box>

            <Box sx={{ p: 4 }}>
                {/* Tab 0: Application Details */}
                {activeTab === 0 && (
                  <Stack spacing={4}>
                    {/* Eligibility Checks */}
                    <Box>
                      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                        <Box sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '8px',
                          bgcolor: '#eff6ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#2563eb'
                        }}>
                          <Shield sx={{ fontSize: 20 }} />
                        </Box>
                        <Typography sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          fontSize: '1rem',
                          color: '#1a1a1a'
                        }}>
                          Eligibility Auto-Checks
                        </Typography>
                      </Stack>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        {application.eligibilityChecks.map((check, index) => {
                          const config = getStatusConfig(check.status);
                          return (
                            <Paper key={index} sx={{ 
                              p: 2.5, 
                              borderRadius: '12px', 
                              border: `1px solid ${config.bgColor}`,
                              bgcolor: check.status === 'pass' ? '#f0fdf4' : check.status === 'fail' ? '#fef2f2' : '#fff',
                              boxShadow: 'none'
                            }}>
                              <Stack direction="row" spacing={2} alignItems="flex-start">
                                <Box sx={{ 
                                  width: 32,
                                  height: 32,
                                  borderRadius: '8px',
                                  bgcolor: config.bgColor,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: config.color,
                                  flexShrink: 0
                                }}>
                                  {config.icon}
                                </Box>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography sx={{ 
                                    fontFamily: "'Poppins', sans-serif", 
                                    fontWeight: 600, 
                                    fontSize: '0.875rem',
                                    color: '#1a1a1a',
                                    mb: 0.5
                                  }}>
                                    {check.check}
                                  </Typography>
                                  <Typography sx={{ 
                                    fontFamily: "'Poppins', sans-serif", 
                                    fontSize: '0.8rem', 
                                    color: '#64748b',
                                    lineHeight: 1.4
                                  }}>
                                    {check.details}
                                  </Typography>
                                </Box>
                                <Chip 
                                  label={check.status.toUpperCase()}
                                  size="small"
                                  sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    bgcolor: config.bgColor,
                                    color: config.color,
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                    height: '24px',
                                    borderRadius: '6px'
                                  }}
                                />
                              </Stack>
                            </Paper>
                          );
                        })}
                      </div>
                    </Box>

                    {/* Personal Information */}
                    <Card sx={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'none', overflow: 'hidden' }}>
                      <Box sx={{ 
                        bgcolor: '#f8fafc', 
                        px: 3, 
                        py: 2, 
                        borderBottom: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5
                      }}>
                        <Box sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '8px',
                          bgcolor: '#eff6ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#2563eb'
                        }}>
                          <Person sx={{ fontSize: 18 }} />
                        </Box>
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem' }}>
                          Personal Information
                        </Typography>
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Full Name
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.applicant.firstName} {application.applicant.lastName}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Date of Birth
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {formatDate(application.applicant.dateOfBirth)}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Gender
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.applicant.gender}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Nationality
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.applicant.nationality}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Email
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#2563eb' }}>
                              {application.applicant.email}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Phone
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.applicant.phone}
                            </Typography>
                          </Box>
                          <Box sx={{ gridColumn: '1 / -1' }}>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Emergency Contact
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.applicant.emergencyContact}
                            </Typography>
                          </Box>
                        </div>
                      </Box>
                    </Card>

                    {/* Passport Details */}
                    <Card sx={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'none', overflow: 'hidden' }}>
                      <Box sx={{ 
                        bgcolor: '#f8fafc', 
                        px: 3, 
                        py: 2, 
                        borderBottom: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5
                      }}>
                        <Box sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '8px',
                          bgcolor: '#eff6ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#2563eb'
                        }}>
                          <Description sx={{ fontSize: 18 }} />
                        </Box>
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem' }}>
                          Passport Details
                        </Typography>
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Passport Number
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: '#2563eb' }}>
                              {application.passport.number}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Passport Type
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.passport.type}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Issue Date
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {formatDate(application.passport.issueDate)}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Expiry Date
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {formatDate(application.passport.expiryDate)}
                            </Typography>
                          </Box>
                          <Box sx={{ gridColumn: '1 / -1' }}>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Place of Issue
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.passport.placeOfIssue}
                            </Typography>
                          </Box>
                        </div>
                      </Box>
                    </Card>

                    {/* Travel Details */}
                    <Card sx={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'none', overflow: 'hidden' }}>
                      <Box sx={{ 
                        bgcolor: '#f8fafc', 
                        px: 3, 
                        py: 2, 
                        borderBottom: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5
                      }}>
                        <Box sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '8px',
                          bgcolor: '#eff6ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#2563eb'
                        }}>
                          <Flight sx={{ fontSize: 18 }} />
                        </Box>
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem' }}>
                          Travel Details
                        </Typography>
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Purpose of Visit
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.travel.purpose}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Duration
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.travel.durationDays} days
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Arrival Date
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {formatDate(application.travel.arrivalDate)}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Departure Date
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {formatDate(application.travel.departureDate)}
                            </Typography>
                          </Box>
                          <Box sx={{ gridColumn: '1 / -1' }}>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Port of Arrival
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.travel.portOfArrival}
                            </Typography>
                          </Box>
                        </div>
                      </Box>
                    </Card>

                    {/* Payment Information */}
                    <Card sx={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'none', overflow: 'hidden' }}>
                      <Box sx={{ 
                        bgcolor: '#f8fafc', 
                        px: 3, 
                        py: 2, 
                        borderBottom: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5
                      }}>
                        <Box sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '8px',
                          bgcolor: '#eff6ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#2563eb'
                        }}>
                          <Payment sx={{ fontSize: 18 }} />
                        </Box>
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem' }}>
                          Payment Information
                        </Typography>
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Customer Payment
                            </Typography>
                            <Chip 
                              label={application.payment.customerPaid ? 'PAID' : 'PENDING'}
                              size="small"
                              sx={{
                                fontFamily: "'Poppins', sans-serif",
                                bgcolor: application.payment.customerPaid ? '#dcfce7' : '#fee2e2',
                                color: application.payment.customerPaid ? '#16a34a' : '#dc2626',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: '26px',
                                borderRadius: '8px'
                              }}
                            />
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Total Amount
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>
                              {application.payment.currency} ${application.payment.customerAmount}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Service Fee
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.payment.currency} ${application.payment.serviceFee}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Govt Fee (to pay)
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              USD ${application.payment.govtFeeAmount}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Payment Date
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {formatDate(application.payment.paymentDate)}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Payment Method
                            </Typography>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a' }}>
                              {application.payment.paymentMethod}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                              Refund Eligible
                            </Typography>
                            <Chip 
                              label={application.payment.refundEligible ? 'YES' : 'NO'}
                              size="small"
                              sx={{
                                fontFamily: "'Poppins', sans-serif",
                                bgcolor: application.payment.refundEligible ? '#dcfce7' : '#fee2e2',
                                color: application.payment.refundEligible ? '#16a34a' : '#dc2626',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: '26px',
                                borderRadius: '8px'
                              }}
                            />
                          </Box>
                        </div>
                      </Box>
                    </Card>
                  </Stack>
                )}

                {/* Tab 1: Documents */}
                {activeTab === 1 && (
                  <Stack spacing={3}>
                    {application.documents.map((doc) => {
                      const config = getStatusConfig(doc.status);
                      return (
                        <Card key={doc.id} sx={{ p: 3, borderRadius: '16px', border: `2px solid ${config.bgColor}` }}>
                          <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Box sx={{
                              width: 120,
                              height: 160,
                              borderRadius: '12px',
                              bgcolor: '#f1f5f9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden'
                            }}>
                              <Description sx={{ fontSize: 60, color: '#94a3b8' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <Typography sx={{ 
                                  fontFamily: "'Poppins', sans-serif",
                                  fontWeight: 700,
                                  fontSize: '1.1rem'
                                }}>
                                  {doc.type}
                                </Typography>
                                <Chip
                                  icon={config.icon}
                                  label={doc.status.toUpperCase()}
                                  size="small"
                                  sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    bgcolor: config.bgColor,
                                    color: config.color,
                                    fontWeight: 700,
                                    '& .MuiChip-icon': { color: config.color }
                                  }}
                                />
                              </Stack>
                              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#64748b', mb: 1 }}>
                                Uploaded: {formatDate(doc.uploadDate)}
                              </Typography>
                              {doc.reviewedBy && (
                                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#64748b', mb: 1 }}>
                                  Reviewed by {doc.reviewedBy} on {formatDate(doc.reviewDate)}
                                </Typography>
                              )}
                              {doc.rejectReason && (
                                <Alert severity="error" sx={{ mt: 2, fontFamily: "'Poppins', sans-serif" }}>
                                  <strong>Rejection Reason:</strong> {doc.rejectReason}
                                </Alert>
                              )}
                              {doc.notes && (
                                <Alert severity="info" sx={{ mt: 2, fontFamily: "'Poppins', sans-serif" }}>
                                  <strong>Notes:</strong> {doc.notes}
                                </Alert>
                              )}
                              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Button
                                  size="small"
                                  startIcon={<Visibility />}
                                  variant="outlined"
                                  onClick={() => handleViewDocument(doc)}
                                  sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    textTransform: 'none'
                                  }}
                                >
                                  View
                                </Button>
                                <Button
                                  size="small"
                                  startIcon={<ZoomIn />}
                                  variant="outlined"
                                  sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    textTransform: 'none'
                                  }}
                                >
                                  Zoom
                                </Button>
                                <Button
                                  size="small"
                                  startIcon={<Download />}
                                  variant="outlined"
                                  sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    textTransform: 'none'
                                  }}
                                >
                                  Download
                                </Button>
                                {doc.status === 'pending' && (
                                  <>
                                    <Button
                                      size="small"
                                      startIcon={<ThumbUp />}
                                      variant="contained"
                                      sx={{
                                        fontFamily: "'Poppins', sans-serif",
                                        textTransform: 'none',
                                        bgcolor: '#16a34a',
                                        '&:hover': { bgcolor: '#15803d' }
                                      }}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      size="small"
                                      startIcon={<ThumbDown />}
                                      variant="contained"
                                      sx={{
                                        fontFamily: "'Poppins', sans-serif",
                                        textTransform: 'none',
                                        bgcolor: '#dc2626',
                                        '&:hover': { bgcolor: '#b91c1c' }
                                      }}
                                    >
                                      Reject
                                    </Button>
                                  </>
                                )}
                              </Stack>
                            </Box>
                          </Stack>
                        </Card>
                      );
                    })}
                  </Stack>
                )}

                {/* Tab 2: Communications */}
                {activeTab === 2 && (
                  <Stack spacing={2}>
                    {application.communications.map((comm) => (
                      <Card key={comm.id} sx={{ p: 2.5, borderRadius: '12px' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '10px',
                            bgcolor: comm.channel === 'Email' ? '#dbeafe' : '#dcfce7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: comm.channel === 'Email' ? '#2563eb' : '#16a34a'
                          }}>
                            {comm.channel === 'Email' ? <Email /> : <WhatsApp />}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                                {comm.subject}
                              </Typography>
                              <Chip 
                                label={comm.direction}
                                size="small"
                                sx={{
                                  fontFamily: "'Poppins', sans-serif",
                                  fontSize: '0.7rem',
                                  bgcolor: comm.direction === 'Outbound' ? '#f1f5f9' : '#fef3c7',
                                  color: comm.direction === 'Outbound' ? '#64748b' : '#92400e'
                                }}
                              />
                            </Stack>
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#64748b' }}>
                              {formatDateTime(comm.timestamp)} • {comm.sentBy} • {comm.status}
                            </Typography>
                          </Box>
                        </Stack>
                      </Card>
                    ))}
                  </Stack>
                )}

                {/* Tab 3: Audit Trail */}
                {activeTab === 3 && (
                  <Stack spacing={0}>
                    {application.auditTrail.map((audit, index) => (
                      <Box key={index} sx={{ position: 'relative', pl: 4, pb: 3 }}>
                        {index !== application.auditTrail.length - 1 && (
                          <Box sx={{
                            position: 'absolute',
                            left: 11,
                            top: 24,
                            bottom: 0,
                            width: 2,
                            bgcolor: '#e2e8f0'
                          }} />
                        )}
                        <Box sx={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: '#2c5aa0',
                          border: '3px solid #dbeafe'
                        }} />
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.8rem', color: '#94a3b8', mb: 0.5 }}>
                          {formatDateTime(audit.timestamp)}
                        </Typography>
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem', mb: 0.5 }}>
                          {audit.action}
                        </Typography>
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#64748b' }}>
                          By: {audit.user} • {audit.details}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Status Card */}
            <Card sx={{ p: 3, borderRadius: '20px', mb: 3 }}>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                mb: 2
              }}>
                Status Management
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>Change Status</InputLabel>
                <Select
                  value={application.status}
                  label="Change Status"
                  onChange={(e) => handleStatusChange(e.target.value)}
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="awaitingDocs">Awaiting Documents</MenuItem>
                  <MenuItem value="underReview">Under Review</MenuItem>
                  <MenuItem value="submitted">Submitted to Govt</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#64748b', mb: 1 }}>
                Assigned Agent: {application.assignedAgent}
              </Typography>
            </Card>

            {/* Agent Notes */}
            <Card sx={{ p: 3, borderRadius: '20px', mb: 3 }}>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                mb: 2
              }}>
                Agent Notes (Internal)
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Add private note..."
                value={agentNote}
                onChange={(e) => setAgentNote(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiInputBase-root': {
                    fontFamily: "'Poppins', sans-serif"
                  }
                }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddNote}
                disabled={!agentNote.trim()}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: 'none',
                  bgcolor: '#2c5aa0',
                  mb: 3
                }}
              >
                Add Note
              </Button>
              <Stack spacing={2}>
                {application.agentNotes.slice(0, 3).map((note) => (
                  <Paper key={note.id} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '12px' }}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.8rem', color: '#94a3b8', mb: 0.5 }}>
                      {note.timestamp} • {note.agent}
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem' }}>
                      {note.note}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Card>

            {/* Quick Actions */}
            <Card sx={{ p: 3, borderRadius: '20px' }}>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                mb: 2
              }}>
                Quick Actions
              </Typography>
              <Stack spacing={1.5}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Email />}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: 'none',
                    justifyContent: 'flex-start'
                  }}
                >
                  Send Email Template
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<WhatsApp />}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: 'none',
                    justifyContent: 'flex-start'
                  }}
                >
                  WhatsApp Message
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AttachFile />}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: 'none',
                    justifyContent: 'flex-start'
                  }}
                >
                  Request Documents
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Lock />}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    color: '#dc2626',
                    borderColor: '#dc2626'
                  }}
                >
                  Lock Application
                </Button>
              </Stack>
            </Card>
          </div>
        </div>
      </Box>

      <Dialog 
        open={showDocumentViewer} 
        onClose={() => setShowDocumentViewer(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          fontFamily: "'Poppins', sans-serif", 
          fontWeight: 700,
          borderBottom: '1px solid #e2e8f0',
          bgcolor: '#f8fafc'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}>
                {selectedDocument?.type}
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#64748b', fontWeight: 400 }}>
                Uploaded: {selectedDocument && formatDate(selectedDocument.uploadDate)}
              </Typography>
            </Box>
            <Chip
              icon={selectedDocument && getStatusConfig(selectedDocument.status).icon}
              label={selectedDocument?.status?.toUpperCase()}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                bgcolor: selectedDocument && getStatusConfig(selectedDocument.status).bgColor,
                color: selectedDocument && getStatusConfig(selectedDocument.status).color,
                fontWeight: 700,
                '& .MuiChip-icon': { color: selectedDocument && getStatusConfig(selectedDocument.status).color }
              }}
            />
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ p: 0, bgcolor: '#f1f5f9' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '500px',
            p: 3
          }}>
            {selectedDocument && (
              <Box sx={{
                maxWidth: '100%',
                maxHeight: '70vh',
                overflow: 'auto',
                bgcolor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src={getExampleDocument(selectedDocument.type)} 
                  alt={selectedDocument.type}
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    display: 'block',
                    borderRadius: '12px'
                  }}
                />
              </Box>
            )}
          </Box>
          {selectedDocument?.notes && (
            <Alert severity="info" sx={{ m: 3, fontFamily: "'Poppins', sans-serif" }}>
              <strong>Notes:</strong> {selectedDocument.notes}
            </Alert>
          )}
          {selectedDocument?.rejectReason && (
            <Alert severity="error" sx={{ m: 3, fontFamily: "'Poppins', sans-serif" }}>
              <strong>Rejection Reason:</strong> {selectedDocument.rejectReason}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
          <Button 
            onClick={() => setShowDocumentViewer(false)}
            sx={{ 
              fontFamily: "'Poppins', sans-serif", 
              textTransform: 'none',
              color: '#64748b'
            }}
          >
            Close
          </Button>
          <Button
            startIcon={<ZoomIn />}
            variant="outlined"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'none',
              borderColor: '#2563eb',
              color: '#2563eb',
              '&:hover': {
                borderColor: '#1d4ed8',
                bgcolor: '#eff6ff'
              }
            }}
          >
            Zoom In
          </Button>
          <Button
            startIcon={<Download />}
            variant="contained"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'none',
              bgcolor: '#2563eb',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1d4ed8',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }
            }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>

      {/* 
      {/* Submit to Government Dialog */}
      <Dialog open={showSubmitDialog} onClose={() => setShowSubmitDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
          Submit to Indian Government
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2, fontFamily: "'Poppins', sans-serif" }}>
            Once submitted, this application cannot be edited. Please verify all information.
          </Alert>
          <Stack spacing={2}>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
              Pre-Submission Checklist:
            </Typography>
            <Stack spacing={1}>
              {[
                'All required fields verified',
                'All documents approved',
                'Customer fees collected',
                'Government fee ready to pay',
                'No pending eligibility issues'
              ].map((item, index) => (
                <Stack key={index} direction="row" spacing={1} alignItems="center">
                  <CheckCircle sx={{ fontSize: 20, color: '#16a34a' }} />
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setShowSubmitDialog(false)} sx={{ fontFamily: "'Poppins', sans-serif", textTransform: 'none' }}>
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={() => {
              handleStatusChange('submitted');
              setShowSubmitDialog(false);
            }}
            sx={{
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'none',
              bgcolor: '#2c5aa0'
            }}
          >
            Confirm Submission
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplicationDetail;
