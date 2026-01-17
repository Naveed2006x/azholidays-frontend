// src/pages/AttractionDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AttractionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [attraction, setAttraction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [ticketOptions, setTicketOptions] = useState([]);
    const [media, setMedia] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTicket, setSelectedTicket] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    // Booking states
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingData, setBookingData] = useState(null);
    const [currentStep, setCurrentStep] = useState('reserve');
    const [customerInfo, setCustomerInfo] = useState({
        customerName: 'John Doe',
        email: 'john.doe@example.com',
        mobileNumber: '91234567',
        mobilePrefix: '+65'
    });

    // Backend API URL - pointing to your Express server
    const BACKEND_BASE_URL = 'http://localhost:3000/api/attractions';

    // Create SVG placeholder as data URL
    const createPlaceholderSVG = (width = 800, height = 400, text = "No Image Available") => {
        const svg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#2c5aa0"/>
                <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle" dy=".3em">${text}</text>
            </svg>
        `;
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    };

    // Get image URL - with SVG fallback
    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return createPlaceholderSVG(800, 400, "No Image Available");
        }
        // Handle both UUID and full URL formats
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        return `https://product-image.globaltix.com/stg-gtImage/${imagePath}`;
    };

    // Add this handler function
    const handleTimeSlotSelect = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    // Helper function to format time slots
    const formatTimeSlot = (timeString) => {
        if (!timeString) return '';
        // Convert "14:00" to "2:00 PM"
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    };

    // Format price with currency
    const formatPrice = (price, currency = 'SGD') => {
        if (price === null || price === undefined) return 'Price on request';
        const currencySymbols = {
            'SGD': 'S$',
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'MYR': 'RM'
        };
        const symbol = currencySymbols[currency] || currency;
        return `${symbol} ${parseFloat(price).toFixed(2)}`;
    };

    // Safe Image Component
    const SafeImage = ({ src, alt, onClick, style, className }) => {
        const [imgSrc, setImgSrc] = useState(src);
        const [hasError, setHasError] = useState(false);

        useEffect(() => {
            setImgSrc(src);
            setHasError(false);
        }, [src]);

        const handleError = () => {
            if (!hasError) {
                setHasError(true);
                setImgSrc(createPlaceholderSVG(800, 400, "Image Not Available"));
            }
        };

        return (
            <img
                src={imgSrc}
                alt={alt}
                onClick={hasError ? undefined : onClick}
                onError={handleError}
                style={style}
                className={className}
                loading="lazy"
            />
        );
    };

    // Updated fetchAttractionDetails function
    const fetchAttractionDetails = async () => {
        try {
            setLoading(true);
            setError('');

            console.log(`🎯 Fetching details for attraction ID: ${id}`);

            const response = await axios.get(`${BACKEND_BASE_URL}/product/${id}/options`, {
                timeout: 15000
            });

            console.log('✅ Product options response:', response.data);

            if (response.data.success && response.data.data) {
                const productData = response.data.data;
                const products = Array.isArray(productData) ? productData : [productData];

                if (products.length > 0) {
                    const mainProduct = products[0];

                    setAttraction({
                        id: mainProduct.id,
                        name: mainProduct.name,
                        description: mainProduct.description,
                        termsAndConditions: mainProduct.termsAndConditions,
                        image: mainProduct.image,
                        currency: mainProduct.currency,
                        ticketValidity: mainProduct.ticketValidity,
                        definedDuration: mainProduct.definedDuration,
                        isCancellable: mainProduct.isCancellable,
                        cancellationNotes: mainProduct.cancellationNotes,
                        howToUse: mainProduct.howToUse,
                        inclusions: mainProduct.inclusions,
                        exclusions: mainProduct.exclusions,
                        visitDate: mainProduct.visitDate,
                        sourceName: mainProduct.sourceName,
                        isOpenDated: mainProduct.visitDate?.isOpenDated || false,
                        isInstantConfirmation: mainProduct.isInstantConfirmation || true,
                        // NEW: Add time slot information
                        hasTimeSlots: mainProduct.timeSlot && mainProduct.timeSlot.length > 0,
                        timeSlots: mainProduct.timeSlot || [],
                        // NEW: Add capacity information
                        isCapacity: mainProduct.isCapacity || false,
                        // NEW: Add advance booking information
                        advanceBooking: mainProduct.advanceBooking
                    });

                    // FLATTEN ALL TICKET TYPES FROM ALL PRODUCTS with time slot info
                    const allTicketTypes = products.flatMap(product =>
                        (product.ticketType || []).map(ticket => ({
                            ...ticket,
                            productId: product.id,
                            productName: product.name,
                            // NEW: Include time slot info from parent product
                            hasTimeSlots: product.timeSlot && product.timeSlot.length > 0,
                            timeSlots: product.timeSlot || [],
                            // NEW: Include other product-level info
                            isCapacity: product.isCapacity || false,
                            visitDate: product.visitDate,
                            advanceBooking: product.advanceBooking
                        }))
                    );

                    console.log(`🎫 Loaded ${allTicketTypes.length} ticket types from ${products.length} products`);
                    console.log('⏰ Time slot data:', allTicketTypes.map(t => ({
                        name: t.name,
                        hasTimeSlots: t.hasTimeSlots,
                        timeSlots: t.timeSlots
                    })));

                    setTicketOptions(allTicketTypes);

                    // Media handling remains the same...
                    const allMedia = products.flatMap(product =>
                        product.media || product.images || []
                    );

                    if (allMedia.length > 0) {
                        setMedia(allMedia.map((item, index) => ({
                            id: item.id || `media-${index}`,
                            path: item.path || item.url || item,
                            name: item.name || 'Attraction Image'
                        })));
                    } else if (mainProduct.image) {
                        setMedia([{
                            id: 'main-image',
                            path: mainProduct.image,
                            name: 'Main Image'
                        }]);
                    }

                } else {
                    throw new Error('No product data found in response');
                }
            } else {
                throw new Error(response.data.error || 'Failed to fetch product details');
            }
        } catch (error) {
            console.error('❌ Error fetching attraction details:', error);
            setError('Failed to load attraction details. Please try again.');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    // Fetch availability for selected ticket
    const fetchAvailability = async (ticketTypeId, dateFrom, dateTo) => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URL}/ticket-type/${ticketTypeId}/availability`,
                {
                    params: { dateFrom, dateTo }
                }
            );
            if (response.data.success) {
                setAvailability(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching availability:', error);
            setAvailability([]);
        }
    };

    // Handle date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (selectedTicket && date) {
            const dateFrom = formatDate(date);
            const dateTo = formatDate(new Date(new Date(date).getTime() + 7 * 24 * 60 * 60 * 1000));
            fetchAvailability(selectedTicket, dateFrom, dateTo);
        }
    };

    // Format date for API (YYYY-MM-DD)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Format date for display
    const formatDisplayDate = (dateString) => {
        if (!dateString) return 'Open Date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Handle ticket selection
    const handleTicketSelect = (ticketId) => {
        setSelectedTicket(ticketId);
        if (selectedDate) {
            const dateFrom = formatDate(selectedDate);
            const dateTo = formatDate(new Date(new Date(selectedDate).getTime() + 7 * 24 * 60 * 60 * 1000));
            fetchAvailability(ticketId, dateFrom, dateTo);
        }
    };

    // Handle booking
    // Update the handleBookNow function to require time slots when available
    const handleBookNow = () => {
        if (!selectedTicket) {
            setError('Please select a ticket type');
            setSnackbarOpen(true);
            return;
        }

        const selectedTicketData = getSelectedTicketData();

        if (!attraction?.isOpenDated && !selectedDate) {
            setError('Please select a visit date');
            setSnackbarOpen(true);
            return;
        }

        // NEW: Check if time slot is required but not selected
        if (selectedTicketData?.hasTimeSlots && !selectedTimeSlot) {
            setError('Please select a time slot');
            setSnackbarOpen(true);
            return;
        }

        setActiveStep(1);
    };

    // Complete booking process
    const handleProceedToPayment = async () => {
        try {
            setBookingLoading(true);
            setBookingError('');
            setCurrentStep('reserve');

            if (!selectedTicket) {
                setBookingError('Please select a ticket type');
                setSnackbarOpen(true);
                return;
            }

            if (!attraction?.isOpenDated && !selectedDate) {
                setBookingError('Please select a visit date');
                setSnackbarOpen(true);
                return;
            }

            console.log('🚀 Starting booking process...');

            // Simulate booking process (replace with actual API call when ready)
            setCurrentStep('confirm');
            await new Promise(resolve => setTimeout(resolve, 2000));

            setCurrentStep('get_tickets');
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Set booking data
            setBookingData({
                bookingId: `BK${Date.now()}`,
                referenceNumber: `REF${Date.now()}`,
                customerName: customerInfo.customerName,
                email: customerInfo.email,
                attractionName: attraction.name,
                ticketType: selectedTicketData?.name,
                quantity: quantity,
                visitDate: selectedDate,
                totalAmount: calculateTotalPrice(),
                currency: attraction.currency,
                status: 'CONFIRMED'
            });

            setBookingSuccess(true);
            setError('Booking completed successfully!');
            setSnackbarOpen(true);

            console.log('🎉 Booking process completed successfully!');

        } catch (error) {
            console.error('❌ Booking error:', error);
            setBookingError(error.response?.data?.error || error.message || 'Booking failed. Please try again.');
            setSnackbarOpen(true);
        } finally {
            setBookingLoading(false);
        }
    };

    // Handle booking modification
    const handleModifyBooking = () => {
        setActiveStep(0);
        setBookingSuccess(false);
        setBookingData(null);
        setCurrentStep('reserve');
    };

    // Handle image click
    const handleImageClick = (imagePath) => {
        setSelectedImage(imagePath);
        setImageModalOpen(true);
    };

    // Handle modal close
    const handleModalClose = () => {
        setImageModalOpen(false);
        setSelectedImage(null);
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Handle tab change
    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };

    // Get selected ticket data
    const getSelectedTicketData = () => {
        if (!selectedTicket || ticketOptions.length === 0) return null;
        return ticketOptions.find(t =>
            String(t.id) === String(selectedTicket) ||
            t.id === selectedTicket
        );
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        if (!selectedTicket || ticketOptions.length === 0) {
            return 0;
        }

        const ticketData = getSelectedTicketData();
        if (!ticketData) {
            console.warn('Ticket data not found for ID:', selectedTicket);
            return 0;
        }

        const price = ticketData.recommendedSellingPrice ??
            ticketData.minimumSellingPrice ??
            ticketData.originalPrice ?? 0;

        return price * quantity;
    };

    // Get lowest price from all ticket options
    const getLowestPrice = () => {
        if (ticketOptions.length === 0) return 0;
        return Math.min(...ticketOptions.map(ticket =>
            ticket.recommendedSellingPrice || ticket.minimumSellingPrice || ticket.originalPrice || 0
        ));
    };


    // Enhanced ticket display with product context
    const getTicketDisplayName = (ticket) => {
        if (ticket.productName && ticket.productName !== attraction?.name) {
            return `${ticket.productName} - ${ticket.name}`;
        }
        return ticket.name;
    };

    // Get age range text
    const getAgeRangeText = (ticket) => {
        if (ticket.ageFrom && ticket.ageTo) {
            return `${ticket.ageFrom}-${ticket.ageTo} years`;
        }
        return '';
    };

    // Get tomorrow's date for min date
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    // Initial load
    useEffect(() => {
        if (id) {
            fetchAttractionDetails();
        }
    }, [id]);

    // Get main image URL
    const getMainImageUrl = () => {
        if (media.length > 0) {
            return getImageUrl(media[0].path);
        }
        return getImageUrl(attraction?.image);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <div className="loading-text">Loading attraction details...</div>
            </div>
        );
    }

    if (!attraction) {
        return (
            <div className="error-container">
                <div className="error-message">Attraction not found</div>
                <button className="back-button" onClick={() => navigate('/attractions')}>
                    Back to Attractions
                </button>
            </div>
        );
    }

    const selectedTicketData = getSelectedTicketData();

    return (
        <div className="attraction-detail-page">
            {/* Improved Back Button */}
            <div className="back-button-container">
                <button className="back-button" onClick={() => navigate('/attractions')}>
                    <span className="back-arrow">←</span>
                    Back to Attractions
                </button>
            </div>

            <div className="container">
                <div className="attraction-layout">
                    {/* Left Column - Attraction Details */}
                    <div className="attraction-content">
                        {/* Main Image */}
                        <div className="main-image-card">
                            <div className="image-container">
                                <SafeImage
                                    src={getMainImageUrl()}
                                    alt={attraction.name}
                                    onClick={() => media.length > 0 && handleImageClick(media[0].path)}
                                    className="main-image"
                                />
                                {/* Price Badge */}
                                <div className="price-badge">
                                    From {formatPrice(getLowestPrice(), attraction.currency)}
                                </div>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        {media.length > 0 && (
                            <div className="gallery-card">
                                <div className="gallery-title">Photo Gallery</div>
                                <div className="gallery-grid">
                                    {media.slice(0, 6).map((item, index) => (
                                        <div key={item.id || index} className="gallery-item">
                                            <SafeImage
                                                src={getImageUrl(item.path)}
                                                alt={item.name || `Gallery image ${index + 1}`}
                                                onClick={() => handleImageClick(item.path)}
                                                className="gallery-image"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Attraction Info with Tabs */}
                        <div className="info-card">
                            <div className="tabs-container">
                                <div className="tabs-header">
                                    <button
                                        className={`tab-button ${tabValue === 0 ? 'active' : ''}`}
                                        onClick={() => handleTabChange(0)}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        className={`tab-button ${tabValue === 1 ? 'active' : ''}`}
                                        onClick={() => handleTabChange(1)}
                                    >
                                        Ticket Options
                                    </button>
                                    <button
                                        className={`tab-button ${tabValue === 2 ? 'active' : ''}`}
                                        onClick={() => handleTabChange(2)}
                                    >
                                        Important Info
                                    </button>
                                </div>

                                {/* Overview Tab */}
                                {tabValue === 0 && (
                                    <div className="tab-content">
                                        <h1 className="attraction-title">{attraction.name}</h1>

                                        {/* Provider Info */}
                                        {attraction.sourceName && (
                                            <div className="provider-info">
                                                <span className="provider-label">Provided by:</span>
                                                <span className="provider-name">{attraction.sourceName}</span>
                                            </div>
                                        )}

                                        {/* Features */}
                                        <div className="features-container">
                                            {attraction.isInstantConfirmation && (
                                                <span className="feature-chip instant-confirmation">
                                                    ✓ Instant Confirmation
                                                </span>
                                            )}
                                            {attraction.isOpenDated && (
                                                <span className="feature-chip flexible-date">
                                                    📅 Flexible Date
                                                </span>
                                            )}
                                            {attraction.isCancellable ? (
                                                <span className="feature-chip cancellable">
                                                    ✓ Free Cancellation
                                                </span>
                                            ) : (
                                                <span className="feature-chip non-refundable">
                                                    ✗ Non-refundable
                                                </span>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="description">
                                            {attraction.description || 'No description available.'}
                                        </div>

                                        {/* How to Use */}
                                        {attraction.howToUse && attraction.howToUse.length > 0 && (
                                            <div className="how-to-use-section">
                                                <h3 className="section-title">How to Use</h3>
                                                <div className="how-to-use-list">
                                                    {attraction.howToUse.map((step, index) => (
                                                        <div key={index} className="how-to-use-item">
                                                            <span className="check-icon">✓</span>
                                                            <span>{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Inclusions & Exclusions */}
                                        <div className="inclusions-exclusions">
                                            {attraction.inclusions && attraction.inclusions.length > 0 && (
                                                <div className="inclusions-section">
                                                    <h3 className="section-title">What's Included</h3>
                                                    <div className="inclusions-list">
                                                        {attraction.inclusions.map((item, index) => (
                                                            <div key={index} className="inclusion-item">
                                                                <span className="check-icon">✓</span>
                                                                <span>{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {attraction.exclusions && attraction.exclusions.length > 0 && (
                                                <div className="exclusions-section">
                                                    <h3 className="section-title">Not Included</h3>
                                                    <div className="exclusions-list">
                                                        {attraction.exclusions.map((item, index) => (
                                                            <div key={index} className="exclusion-item">
                                                                <span className="warning-icon">⚠</span>
                                                                <span>{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Ticket Options Tab */}
                                {tabValue === 1 && (
                                    <div className="tab-content">
                                        <h2 className="section-title">Available Ticket Types</h2>

                                        {ticketOptions.length > 0 ? (
                                            // In the ticket options grid, update the ticket card to show time slot availability
                                            <div className="ticket-options-grid">
                                                {ticketOptions.map((ticket) => (
                                                    <div
                                                        key={ticket.id}
                                                        className={`ticket-card ${selectedTicket === ticket.id ? 'selected' : ''}`}
                                                        onClick={() => handleTicketSelect(ticket.id)}
                                                    >
                                                        <div className="ticket-header">
                                                            <div className="ticket-name">{getTicketDisplayName(ticket)}</div>
                                                            {getAgeRangeText(ticket) && (
                                                                <div className="ticket-age">
                                                                    Age: {getAgeRangeText(ticket)}
                                                                </div>
                                                            )}
                                                            {/* NEW: Show time slot availability */}
                                                            {ticket.hasTimeSlots && (
                                                                <div className="time-slot-indicator">
                                                                    ⏰ Time slots available
                                                                </div>
                                                            )}
                                                            {ticket.isCapacity && (
                                                                <div className="capacity-indicator">
                                                                    📊 Limited capacity
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ticket-pricing">
                                                            <div className="current-price">
                                                                {formatPrice(ticket.recommendedSellingPrice || ticket.minimumSellingPrice, attraction.currency)}
                                                            </div>
                                                            {ticket.originalPrice > (ticket.recommendedSellingPrice || ticket.minimumSellingPrice) && (
                                                                <div className="original-price">
                                                                    {formatPrice(ticket.originalPrice, attraction.currency)}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* Additional ticket info */}
                                                        <div className="ticket-details">
                                                            {ticket.minPurchaseQty && (
                                                                <div className="ticket-detail">
                                                                    Min: {ticket.minPurchaseQty}
                                                                </div>
                                                            )}
                                                            {ticket.maxPurchaseQty && (
                                                                <div className="ticket-detail">
                                                                    Max: {ticket.maxPurchaseQty}
                                                                </div>
                                                            )}
                                                            {/* NEW: Show time slots if available */}
                                                            {ticket.hasTimeSlots && ticket.timeSlots.length > 0 && (
                                                                <div className="ticket-detail time-slots-preview">
                                                                    Times: {ticket.timeSlots.slice(0, 3).map(formatTimeSlot).join(', ')}
                                                                    {ticket.timeSlots.length > 3 && '...'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="no-tickets-message">
                                                No ticket options available.
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Important Info Tab */}
                                {tabValue === 2 && (
                                    <div className="tab-content">
                                        {/* Ticket Validity */}
                                        {attraction.ticketValidity && (
                                            <div className="info-section">
                                                <h3 className="section-title">Ticket Validity</h3>
                                                <div className="info-text">
                                                    {attraction.ticketValidity === 'Duration' && attraction.definedDuration ?
                                                        `Valid for ${attraction.definedDuration} days from purchase` :
                                                        'Please check specific validity period'
                                                    }
                                                </div>
                                            </div>
                                        )}

                                        {/* Cancellation Policy */}
                                        <div className="info-section">
                                            <h3 className="section-title">Cancellation Policy</h3>
                                            {attraction.isCancellable ? (
                                                <div className="info-text">
                                                    Free cancellation available. Please check terms for specific cancellation window.
                                                </div>
                                            ) : (
                                                <div className="cancellation-info">
                                                    <div className="non-refundable-text">Non-refundable</div>
                                                    {attraction.cancellationNotes && attraction.cancellationNotes.map((note, index) => (
                                                        <div key={index} className="cancellation-note">
                                                            • {note}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Terms and Conditions */}
                                        {attraction.termsAndConditions && (
                                            <div className="info-section">
                                                <h3 className="section-title">Terms & Conditions</h3>
                                                <div className="terms-container">
                                                    {attraction.termsAndConditions}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Section */}
                    <div className="booking-sidebar">
                        <div className="booking-card">
                            <h2 className="booking-title">Book Your Experience</h2>

                            <div className="booking-stepper">
                                <div className="step-indicator">
                                    <div className={`step ${activeStep >= 0 ? 'active' : ''}`}>
                                        <div className="step-number">1</div>
                                        <div className="step-label">Select Options</div>
                                    </div>
                                    <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>
                                        <div className="step-number">2</div>
                                        <div className="step-label">Review & Pay</div>
                                    </div>
                                </div>
                            </div>

                            {activeStep === 0 && (
                                <div className="booking-form">
                                    {/* Date Selection */}
                                    <div className="form-group">
                                        <label className="form-label">
                                            {attraction.isOpenDated ? 'Preferred Visit Date (Optional)' : 'Select Visit Date *'}
                                        </label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => handleDateChange(e.target.value)}
                                            min={getTomorrowDate()}
                                            className="form-select"
                                        />
                                        {attraction.isOpenDated ? (
                                            <div className="date-note">
                                                📅 This ticket is open-dated. You can select a preferred date or book without one.
                                            </div>
                                        ) : (
                                            <div className="date-note">
                                                📅 Please select your visit date
                                            </div>
                                        )}
                                    </div>

                                    {/* Time Slot Selection */}
                                    {selectedTicketData?.hasTimeSlots && selectedDate && (
                                        <div className="form-group">
                                            <label className="form-label">Select Time Slot *</label>
                                            <div className="time-slots-grid">
                                                {selectedTicketData.timeSlots
                                                    .sort((a, b) => a.localeCompare(b)) // Sort times chronologically
                                                    .map((timeSlot, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            className={`time-slot-button ${selectedTimeSlot === timeSlot ? 'selected' : ''}`}
                                                            onClick={() => handleTimeSlotSelect(timeSlot)}
                                                        >
                                                            {formatTimeSlot(timeSlot)}
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                            {!selectedTimeSlot && (
                                                <div className="time-slot-note">
                                                    ⏰ Please select your preferred time slot
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Ticket Type Selection */}
                                    <div className="form-group">
                                        <label className="form-label">Select Ticket Type *</label>
                                        <select
                                            value={selectedTicket}
                                            onChange={(e) => handleTicketSelect(e.target.value)}
                                            className="form-select"
                                        >
                                            <option value="">Choose a ticket type</option>
                                            {ticketOptions.length > 0 ? (
                                                ticketOptions.map((ticket) => (
                                                    <option key={ticket.id} value={ticket.id}>
                                                        {getTicketDisplayName(ticket)} - {formatPrice(ticket.recommendedSellingPrice || ticket.minimumSellingPrice, attraction.currency)}
                                                        {getAgeRangeText(ticket) && ` (${getAgeRangeText(ticket)})`}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="" disabled>No tickets available</option>
                                            )}
                                        </select>
                                    </div>

                                    {/* Selected Ticket Details */}
                                    {selectedTicketData && (
                                        <div className="selected-ticket-info">
                                            <div className="selected-ticket-title">Selected Ticket</div>
                                            <div className="selected-ticket-name">{selectedTicketData.name}</div>
                                            {getAgeRangeText(selectedTicketData) && (
                                                <div className="selected-ticket-age">
                                                    Age: {getAgeRangeText(selectedTicketData)}
                                                </div>
                                            )}
                                            {/* NEW: Show time slot information */}
                                            {selectedTicketData.hasTimeSlots && (
                                                <div className="selected-ticket-timeslots">
                                                    <div className="timeslot-label">Available Time Slots:</div>
                                                    <div className="timeslots-list">
                                                        {selectedTicketData.timeSlots
                                                            .sort((a, b) => a.localeCompare(b))
                                                            .map((slot, index) => (
                                                                <span
                                                                    key={index}
                                                                    className={`timeslot-chip ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                                                    onClick={() => handleTimeSlotSelect(slot)}
                                                                >
                                                                    {formatTimeSlot(slot)}
                                                                </span>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                            <div className="selected-ticket-description">
                                                {attraction.isOpenDated ? 'Open-dated ticket' : 'Date-specific ticket'}
                                                {selectedTicketData.hasTimeSlots && ' • Time slot required'}
                                            </div>
                                            <div className="selected-ticket-price">
                                                <span className="current-price">
                                                    {formatPrice(selectedTicketData.recommendedSellingPrice || selectedTicketData.minimumSellingPrice, attraction.currency)}
                                                </span>
                                                {selectedTicketData.originalPrice > (selectedTicketData.recommendedSellingPrice || selectedTicketData.minimumSellingPrice) && (
                                                    <span className="original-price">
                                                        {formatPrice(selectedTicketData.originalPrice, attraction.currency)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Quantity Selection */}
                                    <div className="form-group">
                                        <label className="form-label">Number of Guests *</label>
                                        <select
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            className="form-select"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                <option key={num} value={num}>
                                                    {num} {num === 1 ? 'Person' : 'People'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Availability Calendar */}
                                    {selectedDate && availability.length > 0 && (
                                        <div className="availability-section">
                                            <h3 className="section-title">Available Dates</h3>
                                            <div className="availability-table">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Available</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {availability.slice(0, 7).map((slot, index) => (
                                                            <tr
                                                                key={index}
                                                                className={selectedDate && formatDate(selectedDate) === slot.time ? 'selected-date' : ''}
                                                            >
                                                                <td>{new Date(slot.time).toLocaleDateString()}</td>
                                                                <td>{slot.available} tickets</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    {/* Price Summary */}
                                    <div className="price-summary">
                                        <div className="price-title">Price Summary</div>
                                        <div className="price-row">
                                            <span>Price per person:</span>
                                            <span>
                                                {selectedTicketData ?
                                                    formatPrice(selectedTicketData.recommendedSellingPrice || selectedTicketData.minimumSellingPrice, attraction.currency) :
                                                    formatPrice(getLowestPrice(), attraction.currency)
                                                }
                                            </span>
                                        </div>
                                        <div className="price-row">
                                            <span>Quantity:</span>
                                            <span>{quantity}</span>
                                        </div>
                                        <div className="price-divider"></div>
                                        <div className="price-total">
                                            <span>Total Amount:</span>
                                            <span className="total-price">
                                                {formatPrice(calculateTotalPrice(), attraction.currency)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Book Button */}
                                    <button
                                        className={`book-button ${!selectedTicket ? 'disabled' : ''}`}
                                        onClick={handleBookNow}
                                        disabled={!selectedTicket || (!attraction.isOpenDated && !selectedDate)}
                                    >
                                        {!selectedTicket ? 'Select Ticket to Book' : 'Book Now'}
                                    </button>

                                    {/* Security Features */}
                                    <div className="security-features">
                                        <span className="security-icon">🔒</span>
                                        <span>Secure payment · Instant confirmation</span>
                                    </div>
                                </div>
                            )}

                            {activeStep === 1 && (
                                <div className="booking-summary">
                                    {!bookingSuccess ? (
                                        // Booking in progress
                                        <>
                                            <h3 className="summary-title">Booking Summary</h3>

                                            <div className="booking-progress">
                                                <div className="progress-steps">
                                                    <div className={`progress-step ${currentStep === 'reserve' ? 'active' : currentStep === 'confirm' || currentStep === 'get_tickets' ? 'completed' : ''}`}>
                                                        <div className="step-icon">1</div>
                                                        <div className="step-label">Reserve</div>
                                                    </div>
                                                    <div className={`progress-step ${currentStep === 'confirm' ? 'active' : currentStep === 'get_tickets' ? 'completed' : ''}`}>
                                                        <div className="step-icon">2</div>
                                                        <div className="step-label">Confirm</div>
                                                    </div>
                                                    <div className={`progress-step ${currentStep === 'get_tickets' ? 'active' : ''}`}>
                                                        <div className="step-icon">3</div>
                                                        <div className="step-label">Get Tickets</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="summary-details">
                                                <div className="summary-item">
                                                    <strong>{attraction.name}</strong>
                                                </div>
                                                {!attraction.isOpenDated && selectedDate && (
                                                    <div className="summary-item">
                                                        <span>Visit Date:</span>
                                                        <span>{formatDisplayDate(selectedDate)}</span>
                                                    </div>
                                                )}
                                                {selectedTimeSlot && (
                                                    <div className="summary-item">
                                                        <span>Time Slot:</span>
                                                        <span>{formatTimeSlot(selectedTimeSlot)}</span>
                                                    </div>
                                                )}
                                                <div className="summary-item">
                                                    <span>Ticket Type:</span>
                                                    <span>{selectedTicketData?.name}</span>
                                                </div>
                                                <div className="summary-item">
                                                    <span>Guests:</span>
                                                    <span>{quantity} {quantity === 1 ? 'person' : 'people'}</span>
                                                </div>
                                                <div className="summary-divider"></div>
                                                <div className="summary-total">
                                                    <strong>Total Amount:</strong>
                                                    <strong className="total-amount">
                                                        {formatPrice(calculateTotalPrice(), attraction.currency)}
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="customer-info-section">
                                                <h4>Customer Information</h4>
                                                <div className="customer-fields">
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={customerInfo.customerName}
                                                        onChange={(e) => setCustomerInfo({ ...customerInfo, customerName: e.target.value })}
                                                        className="customer-input"
                                                        required
                                                    />
                                                    <input
                                                        type="email"
                                                        placeholder="Email Address"
                                                        value={customerInfo.email}
                                                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                                        className="customer-input"
                                                        required
                                                    />
                                                    <div className="phone-input-group">
                                                        <select
                                                            value={customerInfo.mobilePrefix}
                                                            onChange={(e) => setCustomerInfo({ ...customerInfo, mobilePrefix: e.target.value })}
                                                            className="prefix-select"
                                                        >
                                                            <option value="+65">+65 SG</option>
                                                            <option value="+60">+60 MY</option>
                                                            <option value="+62">+62 ID</option>
                                                            <option value="+66">+66 TH</option>
                                                        </select>
                                                        <input
                                                            type="tel"
                                                            placeholder="Phone Number"
                                                            value={customerInfo.mobileNumber}
                                                            onChange={(e) => setCustomerInfo({ ...customerInfo, mobileNumber: e.target.value })}
                                                            className="phone-input"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                className="modify-button"
                                                onClick={handleModifyBooking}
                                                disabled={bookingLoading}
                                            >
                                                Modify Booking
                                            </button>

                                            <button
                                                className={`payment-button ${bookingLoading ? 'loading' : ''}`}
                                                onClick={handleProceedToPayment}
                                                disabled={bookingLoading || !customerInfo.customerName || !customerInfo.email || !customerInfo.mobileNumber}
                                            >
                                                {bookingLoading ? (
                                                    <>
                                                        <div className="loading-spinner-small"></div>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    'Confirm & Book Now'
                                                )}
                                            </button>

                                            {bookingLoading && (
                                                <div className="booking-status">
                                                    <div className="status-message">
                                                        {currentStep === 'reserve' && 'Reserving your booking...'}
                                                        {currentStep === 'confirm' && 'Confirming booking...'}
                                                        {currentStep === 'get_tickets' && 'Preparing your tickets...'}
                                                    </div>
                                                    <div className="status-note">
                                                        Please don't close this window
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        // Booking Success
                                        <div className="booking-success">
                                            <h3 className="success-title">Booking Confirmed!</h3>

                                            <div className="success-details">
                                                <div className="success-item">
                                                    <strong>Reference Number:</strong>
                                                    <span className="reference-number">{bookingData.referenceNumber}</span>
                                                </div>
                                                <div className="success-item">
                                                    <strong>Attraction:</strong>
                                                    <span>{bookingData.attractionName}</span>
                                                </div>
                                                <div className="success-item">
                                                    <strong>Ticket Type:</strong>
                                                    <span>{bookingData.ticketType}</span>
                                                </div>
                                                <div className="success-item">
                                                    <strong>Quantity:</strong>
                                                    <span>{bookingData.quantity} tickets</span>
                                                </div>
                                                {bookingData.visitDate && (
                                                    <div className="success-item">
                                                        <strong>Visit Date:</strong>
                                                        <span>{formatDisplayDate(bookingData.visitDate)}</span>
                                                    </div>
                                                )}
                                                <div className="success-item total">
                                                    <strong>Total Paid:</strong>
                                                    <span className="total-price">
                                                        {formatPrice(bookingData.totalAmount, bookingData.currency)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="ticket-ready">
                                                <div className="ticket-available">
                                                    <span className="ticket-icon">🎫</span>
                                                    <span>Your booking is confirmed!</span>
                                                </div>
                                                <div className="download-ticket-button">
                                                    View Booking Details
                                                </div>
                                            </div>

                                            <div className="success-actions">
                                                <button
                                                    onClick={() => navigate('/')}
                                                    className="continue-browsing"
                                                >
                                                    Continue Browsing
                                                </button>
                                                <button
                                                    onClick={handleModifyBooking}
                                                    className="book-another"
                                                >
                                                    Book Another
                                                </button>
                                            </div>

                                            <div className="booking-notes">
                                                <p>📧 A confirmation email has been sent to <strong>{bookingData.email}</strong></p>
                                                <p>📱 Present your booking confirmation at the attraction entrance</p>
                                                {attraction.cancellationNotes && (
                                                    <p>ℹ️ {attraction.cancellationNotes}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {imageModalOpen && (
                <div className="image-modal-overlay" onClick={handleModalClose}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-button" onClick={handleModalClose}>×</button>
                        <SafeImage
                            src={getImageUrl(selectedImage)}
                            alt="Enlarged view"
                            className="modal-image"
                        />
                    </div>
                </div>
            )}

            {/* Error Snackbar */}
            {snackbarOpen && (
                <div className="snackbar-overlay">
                    <div className="snackbar error">
                        <span>{error}</span>
                        <button className="snackbar-close" onClick={handleSnackbarClose}>×</button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .attraction-detail-page {
                    background-color: #f8f9fa;
                    min-height: 100vh;
                    overflow-x: hidden; /* Prevent horizontal scroll */
                }

                /* Improved Back Button */
                .back-button-container {
                    padding: 20px 24px 0;
                    background: transparent;
                    border-bottom: none;
                }

                .back-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: white;
                    color: #2c5aa0;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    padding: 10px 16px;
                    transition: all 0.2s ease;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }

                .back-button:hover {
                    background: #f8f9fa;
                    border-color: #2c5aa0;
                    transform: translateY(-1px);
                    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                }

                .back-arrow {
                    font-size: 16px;
                    font-weight: bold;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px 24px 40px;
                }

                .attraction-layout {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 24px;
                    align-items: start;
                }

                /* Loading States */
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                }

                .loading-spinner {
                    width: 60px;
                    height: 60px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #2c5aa0;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 16px;
                }

                .loading-text {
                    color: #666;
                    font-size: 16px;
                }

                .error-container {
                    text-align: center;
                    padding: 100px 24px;
                    background: #f8f9fa;
                    min-height: 100vh;
                }

                .error-message {
                    color: #666;
                    font-size: 18px;
                    margin-bottom: 24px;
                }

                /* Main Image */
                .main-image-card {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .image-container {
                    position: relative;
                    height: 400px;
                }

                .main-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    cursor: pointer;
                }

                .price-badge {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: rgba(44, 90, 160, 0.95);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: 600;
                    font-size: 1.1rem;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }

                /* Gallery */
                .gallery-card {
                    background: white;
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .gallery-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 16px;
                    color: #333;
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }

                .gallery-item {
                    cursor: pointer;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.2s ease;
                }

                .gallery-item:hover {
                    transform: scale(1.05);
                }

                .gallery-image {
                    width: 100%;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 8px;
                }

                /* Info Card */
                .info-card {
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    overflow: hidden;
                }

                .tabs-container {
                    border-bottom: 1px solid #e0e0e0;
                }

                .tabs-header {
                    display: flex;
                    padding: 0;
                    background: #f8f9fa;
                }

                .tab-button {
                    flex: 1;
                    padding: 16px 24px;
                    background: none;
                    border: none;
                    border-bottom: 3px solid transparent;
                    font-size: 14px;
                    cursor: pointer;
                    color: #666;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }

                .tab-button:hover {
                    background: rgba(44, 90, 160, 0.05);
                    color: #2c5aa0;
                }

                .tab-button.active {
                    color: #2c5aa0;
                    border-bottom-color: #2c5aa0;
                    font-weight: 600;
                    background: white;
                }

                .tab-content {
                    padding: 24px;
                }

                .attraction-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #333;
                    margin-bottom: 16px;
                    line-height: 1.2;
                }

                .provider-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 24px;
                }

                .provider-label {
                    color: #666;
                    font-size: 14px;
                }

                .provider-name {
                    background: #f5f7fa;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 14px;
                    border: 1px solid #e0e0e0;
                    font-weight: 500;
                }

                .features-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 24px;
                }

                .feature-chip {
                    padding: 8px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    border: 1px solid #e0e0e0;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }

                .feature-chip.instant-confirmation {
                    border-color: #2c5aa0;
                    color: #2c5aa0;
                    background: rgba(44, 90, 160, 0.05);
                }

                .feature-chip.flexible-date {
                    border-color: #2c5aa0;
                    color: #2c5aa0;
                    background: rgba(44, 90, 160, 0.05);
                }

                .feature-chip.cancellable {
                    border-color: #4caf50;
                    color: #4caf50;
                    background: rgba(76, 175, 80, 0.05);
                }

                .feature-chip.non-refundable {
                    border-color: #d32f2f;
                    color: #d32f2f;
                    background: rgba(211, 47, 47, 0.05);
                }

                .description {
                    color: #666;
                    line-height: 1.8;
                    margin-bottom: 24px;
                    white-space: pre-line;
                    font-size: 15px;
                }

                .section-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 16px;
                    color: #333;
                }

                .how-to-use-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .how-to-use-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 8px 0;
                }

                .check-icon {
                    color: #4caf50;
                    font-weight: bold;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .inclusions-exclusions {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }

                .inclusions-list, .exclusions-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .inclusion-item, .exclusion-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 4px 0;
                }

                .warning-icon {
                    color: #ff9800;
                    font-weight: bold;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                /* Ticket Options */
                .ticket-options-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .ticket-card {
                    border: 1px solid #e0e0e0;
                    border-radius: 12px;
                    padding: 20px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    background: white;
                }

                .ticket-card:hover {
                    border-color: #2c5aa0;
                    background-color: #f8f9fa;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .ticket-card.selected {
                    border: 2px solid #2c5aa0;
                    background-color: #f0f4ff;
                    box-shadow: 0 4px 12px rgba(44, 90, 160, 0.15);
                }

                .ticket-header {
                    margin-bottom: 12px;
                }

                .ticket-name {
                    font-weight: 600;
                    font-size: 1.1rem;
                    color: #333;
                    margin-bottom: 4px;
                }

                .ticket-age {
                    color: #666;
                    font-size: 14px;
                }

                .ticket-pricing {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .current-price {
                    font-weight: 700;
                    color: #2c5aa0;
                    font-size: 1.3rem;
                }

                .original-price {
                    color: #999;
                    text-decoration: line-through;
                    font-size: 14px;
                }

                .no-tickets-message {
                    text-align: center;
                    color: #666;
                    padding: 40px;
                    font-style: italic;
                }

                /* Info Sections */
                .info-section {
                    margin-bottom: 32px;
                }

                .info-text {
                    color: #666;
                    line-height: 1.6;
                }

                .cancellation-info {
                    color: #d32f2f;
                }

                .non-refundable-text {
                    font-weight: 600;
                    margin-bottom: 12px;
                    font-size: 16px;
                }

                .cancellation-note {
                    margin-bottom: 6px;
                    padding-left: 8px;
                }

                .terms-container {
                    background-color: #f5f7fa;
                    padding: 20px;
                    border-radius: 8px;
                    max-height: 300px;
                    overflow: auto;
                    white-space: pre-line;
                    font-size: 14px;
                    line-height: 1.6;
                    border: 1px solid #e0e0e0;
                }

                /* Booking Sidebar */
                .booking-sidebar {
                    position: sticky;
                    top: 20px;
                }

                .booking-card {
                    background: white;
                    border-radius: 16px;
                    padding: 24px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    border: 1px solid #e0e0e0;
                }

                .booking-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    text-align: center;
                    color: #2c5aa0;
                    margin-bottom: 24px;
                }

                .booking-stepper {
                    margin-bottom: 24px;
                }

                .step-indicator {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                }

                .step-number {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #e0e0e0;
                    color: #666;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    margin-bottom: 8px;
                    transition: all 0.2s ease;
                }

                .step.active .step-number {
                    background: #2c5aa0;
                    color: white;
                    box-shadow: 0 2px 8px rgba(44, 90, 160, 0.3);
                }

                .step-label {
                    font-size: 12px;
                    color: #666;
                    font-weight: 500;
                }

                .step.active .step-label {
                    color: #2c5aa0;
                    font-weight: 600;
                }

                .booking-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-label {
                    font-weight: 600;
                    font-size: 14px;
                    color: #333;
                }

                .form-select {
                    padding: 12px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: border-color 0.2s ease;
                }

                .form-select:focus {
                    outline: none;
                    border-color: #2c5aa0;
                    box-shadow: 0 0 0 2px rgba(44, 90, 160, 0.1);
                }

                .selected-ticket-info {
                    background: #f8f9fa;
                    padding: 16px;
                    border-radius: 8px;
                    border: 1px solid #e0e0e0;
                }

                .selected-ticket-title {
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #333;
                }

                .selected-ticket-name {
                    font-weight: 600;
                    margin-bottom: 4px;
                    color: #2c5aa0;
                }

                .selected-ticket-age {
                    color: #666;
                    font-size: 14px;
                    margin-bottom: 8px;
                }

                .selected-ticket-price {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }

                .availability-section {
                    margin-top: 16px;
                }

                .availability-table {
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .availability-table table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .availability-table th,
                .availability-table td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #e0e0e0;
                }

                .availability-table th {
                    background: #f5f7fa;
                    font-weight: 600;
                    color: #333;
                }

                .availability-table tr.selected-date {
                    background: #e3f2fd;
                }

                .price-summary {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid #e0e0e0;
                }

                .price-title {
                    font-weight: 600;
                    margin-bottom: 16px;
                    color: #333;
                    font-size: 16px;
                }

                .price-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    color: #666;
                }

                .price-divider {
                    height: 1px;
                    background: #e0e0e0;
                    margin: 16px 0;
                }

                .price-total {
                    display: flex;
                    justify-content: space-between;
                    font-weight: 600;
                    font-size: 1.1rem;
                }

                .total-price {
                    color: #2c5aa0;
                }

                .book-button {
                    background: #2c5aa0;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    padding: 16px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 8px rgba(44, 90, 160, 0.3);
                }

                .book-button:hover:not(.disabled) {
                    background: #1e3d6f;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(44, 90, 160, 0.4);
                }

                .book-button.disabled {
                    background: #cccccc;
                    cursor: not-allowed;
                    box-shadow: none;
                }

                .security-features {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    color: #666;
                    font-size: 14px;
                    padding: 12px;
                }

                /* Booking Progress */
                .booking-progress {
                    margin-bottom: 24px;
                }

                .progress-steps {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .progress-step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                    position: relative;
                }

                .progress-step:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    top: 16px;
                    right: -50%;
                    width: 100%;
                    height: 2px;
                    background: #e0e0e0;
                    z-index: 1;
                }

                .progress-step.completed:not(:last-child)::after {
                    background: #4caf50;
                }

                .step-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #e0e0e0;
                    color: #666;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    margin-bottom: 8px;
                    position: relative;
                    z-index: 2;
                    transition: all 0.2s ease;
                }

                .progress-step.active .step-icon {
                    background: #2c5aa0;
                    color: white;
                    box-shadow: 0 2px 8px rgba(44, 90, 160, 0.3);
                }

                .progress-step.completed .step-icon {
                    background: #4caf50;
                    color: white;
                    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
                }

                .step-label {
                    font-size: 12px;
                    color: #666;
                    text-align: center;
                    font-weight: 500;
                }

                .progress-step.active .step-label,
                .progress-step.completed .step-label {
                    color: #2c5aa0;
                    font-weight: 600;
                }

                /* Customer Information */
                .customer-info-section {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 16px;
                    border: 1px solid #e0e0e0;
                }

                .customer-info-section h4 {
                    margin: 0 0 16px 0;
                    color: #333;
                    font-size: 16px;
                }

                .customer-fields {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .customer-input {
                    padding: 12px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: border-color 0.2s ease;
                }

                .customer-input:focus {
                    outline: none;
                    border-color: #2c5aa0;
                    box-shadow: 0 0 0 2px rgba(44, 90, 160, 0.1);
                }

                .phone-input-group {
                    display: flex;
                    gap: 8px;
                }

                .prefix-select {
                    padding: 12px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 14px;
                    width: 100px;
                    transition: border-color 0.2s ease;
                }

                .prefix-select:focus {
                    outline: none;
                    border-color: #2c5aa0;
                    box-shadow: 0 0 0 2px rgba(44, 90, 160, 0.1);
                }

                .phone-input {
                    flex: 1;
                    padding: 12px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: border-color 0.2s ease;
                }

                .phone-input:focus {
                    outline: none;
                    border-color: #2c5aa0;
                    box-shadow: 0 0 0 2px rgba(44, 90, 160, 0.1);
                }

                /* Booking Status */
                .booking-status {
                    text-align: center;
                    padding: 20px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    margin-top: 16px;
                    border: 1px solid #e0e0e0;
                }

                .status-message {
                    font-weight: 600;
                    color: #2c5aa0;
                    margin-bottom: 8px;
                }

                .status-note {
                    font-size: 12px;
                    color: #666;
                }

                /* Loading States */
                .loading-spinner-small {
                    width: 16px;
                    height: 16px;
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid #2c5aa0;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    display: inline-block;
                    margin-right: 8px;
                }

                .payment-button.loading {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                /* Success State */
                .booking-success {
                    text-align: center;
                }

                .success-icon {
                    font-size: 48px;
                    margin-bottom: 16px;
                }

                .success-title {
                    color: #4caf50;
                    margin-bottom: 24px;
                    font-size: 1.5rem;
                }

                .success-details {
                    background: #f8f9fa;
                    padding: 24px;
                    border-radius: 12px;
                    margin-bottom: 24px;
                    text-align: left;
                    border: 1px solid #e0e0e0;
                }

                .success-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 16px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid #e0e0e0;
                }

                .success-item:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                }

                .success-item.total {
                    font-size: 1.1rem;
                    font-weight: 600;
                    padding-top: 16px;
                    border-top: 2px solid #e0e0e0;
                }

                .reference-number {
                    font-family: monospace;
                    font-weight: 600;
                    color: #2c5aa0;
                    background: #f0f4ff;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 14px;
                }

                /* Ticket Status */
                .ticket-ready,
                .ticket-pending {
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                }

                .ticket-ready {
                    background: #e8f5e8;
                    border: 1px solid #4caf50;
                }

                .ticket-pending {
                    background: #fff3e0;
                    border: 1px solid #ff9800;
                }

                .ticket-available {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    color: #2e7d32;
                }

                .download-ticket-button {
                    background: #4caf50;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: background 0.2s;
                    border: none;
                    cursor: pointer;
                    font-size: 14px;
                }

                .download-ticket-button:hover {
                    background: #45a049;
                    transform: translateY(-1px);
                }

                .retry-button {
                    background: #ff9800;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .retry-button:hover {
                    background: #f57c00;
                }

                /* Success Actions */
                .success-actions {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 24px;
                }

                .continue-browsing,
                .book-another {
                    flex: 1;
                    padding: 14px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 14px;
                }

                .continue-browsing {
                    background: #f8f9fa;
                    color: #333;
                    border: 1px solid #e0e0e0;
                }

                .continue-browsing:hover {
                    background: #e9ecef;
                    border-color: #2c5aa0;
                    color: #2c5aa0;
                }

                .book-another {
                    background: #2c5aa0;
                    color: white;
                    border: none;
                }

                .book-another:hover {
                    background: #1e3d6f;
                    transform: translateY(-1px);
                }

                /* Booking Notes */
                .booking-notes {
                    background: #f0f4ff;
                    padding: 20px;
                    border-radius: 8px;
                    font-size: 14px;
                    text-align: left;
                    border: 1px solid #dbeafe;
                }

                .booking-notes p {
                    margin: 8px 0;
                    color: #666;
                    line-height: 1.5;
                }

                .booking-notes p:last-child {
                    margin-bottom: 0;
                }

                /* Booking Summary */
                .booking-summary {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .summary-title {
                    text-align: center;
                    color: #2c5aa0;
                    font-weight: 600;
                    margin-bottom: 16px;
                    font-size: 1.25rem;
                }

                .summary-details {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid #e0e0e0;
                }

                .summary-item {
                    margin-bottom: 12px;
                    display: flex;
                    justify-content: space-between;
                }

                .summary-divider {
                    height: 1px;
                    background: #e0e0e0;
                    margin: 16px 0;
                }

                .summary-total {
                    display: flex;
                    justify-content: space-between;
                    font-weight: 600;
                    font-size: 1.1rem;
                }

                .total-amount {
                    color: #2c5aa0;
                }

                .modify-button {
                    background: #2c5aa0;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    padding: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .modify-button:hover {
                    background: #1e3d6f;
                    transform: translateY(-1px);
                }

                .payment-button {
                    background: white;
                    color: #2c5aa0;
                    border: 2px solid #2c5aa0;
                    border-radius: 8px;
                    padding: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .payment-button:hover:not(.loading) {
                    background: #2c5aa0;
                    color: white;
                    transform: translateY(-1px);
                }

                .date-note {
                    font-size: 12px;
                    color: #666;
                    margin-top: 4px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    line-height: 1.4;
                }

                /* Modal */
                .image-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(4px);
                }

                .image-modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }

                .modal-close-button {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                    cursor: pointer;
                    z-index: 1001;
                    transition: background 0.2s ease;
                }

                .modal-close-button:hover {
                    background: rgba(0,0,0,0.9);
                }

                .modal-image {
                    max-width: 100%;
                    max-height: 90vh;
                    object-fit: contain;
                }

                /* Snackbar */
                .snackbar-overlay {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1000;
                }

                .snackbar {
                    background: #d32f2f;
                    color: white;
                    padding: 16px 24px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    animation: slideDown 0.3s ease;
                }

                .snackbar-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes slideDown {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .attraction-layout {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }

                    .booking-sidebar {
                        position: static;
                        order: -1;
                    }

                    .container {
                        padding: 16px;
                    }

                    .inclusions-exclusions {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }

                    .gallery-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .success-actions {
                        flex-direction: column;
                    }

                    .back-button-container {
                        padding: 16px 16px 0;
                    }

                    .attraction-title {
                        font-size: 1.5rem;
                    }

                    .tabs-header {
                        flex-direction: column;
                    gap: 0;
                    background: white;
                    padding: 0;
                    border-bottom: 1px solid #e0e0e0;
                    border-radius: 8px 8px 0 0;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    margin-bottom: 0;
                    border: none;
                    border-bottom: 1px solid #e0e0e0;
                    background: #f8f9fa;
                    padding: 0;
                    border-radius: 0;
                    box-shadow: none;
                    border: none;
                    border-bottom: 1px solid #e0e0e0;
                    background: #f8f9fa;
                }

                    .tab-button {
                        border-bottom: none;
                        border-right: none;
                        border-radius: 0;
                        padding: 16px;
                        text-align: center;
                        border-bottom: 3px solid transparent;
                    }

                    .tab-button.active {
                        border-bottom: 3px solid #2c5aa0;
                        background: white;
                    }

                    .tabs-container {
                        border-bottom: none;
                    }
                }

                @media (max-width: 480px) {
                    .container {
                        padding: 12px;
                    }

                    .gallery-grid {
                        grid-template-columns: 1fr;
                    }

                    .image-container {
                        height: 300px;
                    }

                    .booking-card {
                        padding: 20px;
                    }

                    .tab-content {
                        padding: 20px;
                    }

                    .success-details {
                        padding: 20px;
                    }

                    .price-summary {
                        padding: 16px;
                    }
                        
                }

                .ticket-category {
                    font-size: 12px;
                    color: #666;
                    background: #f0f0f0;
                    padding: 2px 6px;
                    border-radius: 4px;
                    margin-top: 4px;
                    display: inline-block;
                }

                .ticket-details {
                    display: flex;
                    gap: 8px;
                    margin-top: 8px;
                    font-size: 12px;
                }

                .ticket-detail {
                    background: #f5f5f5;
                    padding: 2px 6px;
                    border-radius: 4px;
                    color: #666;
                }

                /* Time Slot Styles */
                .time-slots-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                    margin-top: 8px;
                }

                .time-slot-button {
                    padding: 12px 8px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    background: white;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 14px;
                    text-align: center;
                }

                .time-slot-button:hover {
                    border-color: #2c5aa0;
                    background: #f8f9fa;
                }

                .time-slot-button.selected {
                    border-color: #2c5aa0;
                    background: #2c5aa0;
                    color: white;
                }

                .time-slot-note {
                    font-size: 12px;
                    color: #666;
                    margin-top: 8px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .time-slot-indicator {
                    font-size: 12px;
                    color: #2c5aa0;
                    background: rgba(44, 90, 160, 0.1);
                    padding: 2px 6px;
                    border-radius: 4px;
                    margin-top: 4px;
                    display: inline-block;
                }

                .capacity-indicator {
                    font-size: 12px;
                    color: #d32f2f;
                    background: rgba(211, 47, 47, 0.1);
                    padding: 2px 6px;
                    border-radius: 4px;
                    margin-top: 4px;
                    display: inline-block;
                }

                .time-slots-preview {
                    font-size: 11px;
                    color: #666;
                }

                .selected-ticket-timeslots {
                    margin-top: 12px;
                    padding-top: 12px;
                    border-top: 1px solid #e0e0e0;
                }

                .timeslot-label {
                    font-size: 12px;
                    color: #666;
                    margin-bottom: 8px;
                    font-weight: 500;
                }

                .timeslots-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }

                .timeslot-chip {
                    padding: 4px 8px;
                    border: 1px solid #e0e0e0;
                    border-radius: 6px;
                    font-size: 11px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    background: white;
                }

                .timeslot-chip:hover {
                    border-color: #2c5aa0;
                }

                .timeslot-chip.selected {
                    border-color: #2c5aa0;
                    background: #2c5aa0;
                    color: white;
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .time-slots-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .timeslots-list {
                        gap: 4px;
                    }
                    
                    .timeslot-chip {
                        font-size: 10px;
                        padding: 3px 6px;
                    }
                }
            `}</style>
        </div>
    );
};

export default AttractionDetail;