// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Filter Functionality
const galleryBtns = document.querySelectorAll('.gallery-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        galleryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        galleryItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Calendar Functionality - Homepage Calendar
function initializeHomepageCalendar() {
    const calendar = document.getElementById('homepage-calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    // Only proceed if this is the homepage with calendar elements
    if (!calendar || !currentMonthElement || !prevMonthBtn || !nextMonthBtn) {
        console.log('Homepage calendar elements not found - skipping homepage calendar initialization');
        return;
    }
    
    console.log('Initializing homepage calendar...');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const maharashtrianFestivals = {
        2024: {
            0: [14, 26], // January - Makar Sankranti, Republic Day
            1: [19], // February - Chhatrapati Shivaji Maharaj Jayanti
            2: [8, 13, 25], // March - Holi, etc.
            3: [9, 14, 21], // April - Ram Navami, Ambedkar Jayanti, Hanuman Jayanti
            7: [15, 19, 26], // August - Independence Day, Janmashtami, Ganesh Chaturthi
            8: [7, 15, 17], // September - Ganesh Visarjan, Anant Chaturdashi
            9: [2, 12, 24, 31], // October - Gandhi Jayanti, Dussehra, Karva Chauth, Diwali
            10: [7, 15], // November - Bhai Dooj, Guru Nanak Jayanti
        }
    };

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Sample booked dates (in practice, this would come from a backend)
    const bookedDates = {
        2024: {
            0: [15, 28], // January
            1: [14, 25], // February
            2: [10, 22], // March
            3: [5, 18], // April
            4: [12, 29], // May
            5: [8, 20], // June
            6: [15, 27], // July
            7: [10, 22], // August
            8: [5, 18], // September
            9: [12, 28], // October
            10: [8, 24], // November
            11: [15, 30], // December
        }
    };

    function generateCalendar(month, year) {
        console.log(`Generating homepage calendar for ${months[month]} ${year}`);
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    calendar.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.background = '#f5f5f5';
        dayHeader.style.padding = '1rem';
        dayHeader.style.textAlign = 'center';
        calendar.appendChild(dayHeader);
    });
    
    // Generate calendar days
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = date.getDate();
        
        // Check if date is in current month
        if (date.getMonth() !== month) {
            dayElement.style.opacity = '0.3';
        }
        
        // Check if date is booked
        const dateKey = date.getDate();
        if (bookedDates[year] && bookedDates[year][month] && 
            bookedDates[year][month].includes(dateKey) && date.getMonth() === month) {
            dayElement.classList.add('booked');
        }
        // Check if date is a festival
        else if (maharashtrianFestivals[year] && maharashtrianFestivals[year][month] && 
                 maharashtrianFestivals[year][month].includes(dateKey) && date.getMonth() === month) {
            dayElement.classList.add('festival');
        }
        // Mark as available if in current month and not booked/festival
        else if (date.getMonth() === month && date >= new Date()) {
            dayElement.classList.add('available');
        }
        
        // Add click event for available dates
        if (dayElement.classList.contains('available')) {
            dayElement.addEventListener('click', () => {
                const dateStr = `${date.getDate()}/${month + 1}/${year}`;
                const message = `Hello! I would like to check availability for ${dateStr}.`;
                const whatsappUrl = `https://wa.me/919869373313?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
        }
        
        calendar.appendChild(dayElement);
    }
    
        currentMonthElement.textContent = `${months[month]} ${year}`;
        console.log(`Homepage calendar generated successfully for ${months[month]} ${year}`);
    }

    // Calendar navigation
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    // Initialize calendar
    generateCalendar(currentMonth, currentYear);
    console.log('Homepage calendar initialized successfully');
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `
New Enquiry from Website:
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Service: ${service}
Message: ${message || 'No additional message'}
    `.trim();
    
    const whatsappUrl = `https://wa.me/919869373313?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert('Thank you for your enquiry! You will be redirected to WhatsApp to send your message.');
    
    // Reset form
    this.reset();
});

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(139, 0, 0, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(139, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Initialize calendar on page load - only for homepage
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded: Attempting to initialize homepage calendar...');
    initializeHomepageCalendar();
    
    // Add fade-in class to elements for scroll animation
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .contact-content');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Initial check for visible elements
    handleScrollAnimations();
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize everything
window.addEventListener('load', () => {
    preloadImages();
});

// Service card click handlers with fallback
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const href = this.getAttribute('onclick');
        if (href) {
            const match = href.match(/'([^']+)'/);
            if (match) {
                window.location.href = match[1];
            }
        }
    });
});

// Gallery item click handlers
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        window.location.href = 'gallery.html';
    });
});

// Utility function to format phone numbers
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+91${cleaned}`;
    }
    return cleaned;
}

// Enhanced form validation
function validateForm(formData) {
    const name = formData.get('name').trim();
    const phone = formData.get('phone').trim();
    const service = formData.get('service');
    
    if (!name || name.length < 2) {
        alert('Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    if (!phone || phone.length < 10) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }
    
    if (!service) {
        alert('Please select a service');
        return false;
    }
    
    return true;
}

// Update contact form submission with validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    if (!validateForm(formData)) {
        return;
    }
    
    const name = formData.get('name').trim();
    const phone = formatPhoneNumber(formData.get('phone').trim());
    const email = formData.get('email').trim();
    const service = formData.get('service');
    const message = formData.get('message').trim();
    
    const whatsappMessage = `
🎉 New Enquiry from Website 🎉

👤 Name: ${name}
📱 Phone: ${phone}
📧 Email: ${email || 'Not provided'}
🎊 Service: ${service}
💬 Message: ${message || 'No additional message'}

Thank you for choosing श्री सद्गुरू कृपा डेकोरेटर्स!
    `.trim();
    
    const whatsappUrl = `https://wa.me/919869373313?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message with better UX
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.style.background = '#28a745';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        this.reset();
    }, 3000);
});