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

// Calendar Functionality

// Simple Calendar Widget
// Event Calendar with Availability & Festivals
const eventBookedDates = {
    2025: {
        7: [2, 10, 15, 22], // August (0-based)
        8: [5, 18], // September
        9: [12, 28], // October
    }
};
const maharashtrianFestivals = {
    2025: {
        7: [
            { day: 15, name: 'Independence Day', img: 'https://cdn-icons-png.flaticon.com/512/330/330176.png' },
            { day: 19, name: 'Janmashtami', img: 'https://cdn-icons-png.flaticon.com/512/1998/1998611.png' },
            { day: 26, name: 'Ganesh Chaturthi', img: 'https://cdn-icons-png.flaticon.com/512/1998/1998612.png' }
        ],
        8: [
            { day: 7, name: 'Ganesh Visarjan', img: 'https://cdn-icons-png.flaticon.com/512/1998/1998612.png' },
            { day: 15, name: 'Anant Chaturdashi', img: 'https://cdn-icons-png.flaticon.com/512/1998/1998612.png' },
            { day: 17, name: 'Other Festival', img: 'https://cdn-icons-png.flaticon.com/512/2721/2721087.png' }
        ],
        9: [
            { day: 2, name: 'Gandhi Jayanti', img: 'https://cdn-icons-png.flaticon.com/512/330/330176.png' },
            { day: 12, name: 'Dussehra', img: 'https://cdn-icons-png.flaticon.com/512/1998/1998613.png' },
            { day: 24, name: 'Karva Chauth', img: 'https://cdn-icons-png.flaticon.com/512/1998/1998614.png' },
            { day: 31, name: 'Diwali', img: 'https://cdn-icons-png.flaticon.com/512/1998/1998615.png' }
        ],
        10: [
            { day: 7, name: 'Bhai Dooj', img: 'https://cdn-icons-png.flaticon.com/512/1998/1998616.png' },
            { day: 15, name: 'Guru Nanak Jayanti', img: 'https://cdn-icons-png.flaticon.com/512/1998/1998617.png' }
        ]
    }
};
function renderEventCalendar(month, year) {
    const calendarGrid = document.getElementById('eventCalendar');
    const currentMonthLabel = document.getElementById('eventCurrentMonth');
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    calendarGrid.innerHTML = '';
    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.background = '#f5f5f5';
        dayHeader.style.padding = '1rem';
        dayHeader.style.textAlign = 'center';
        calendarGrid.appendChild(dayHeader);
    });
    // Empty days before first
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day outside-month';
        calendarGrid.appendChild(emptyCell);
    }
    // Days of month
    let festivalDays = [];
    if (maharashtrianFestivals[year] && maharashtrianFestivals[year][month]) {
        festivalDays = maharashtrianFestivals[year][month].map(f => f.day);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = d;
        // Highlight today
        if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayCell.style.background = '#FFD700';
            dayCell.style.color = '#8B0000';
            dayCell.style.fontWeight = 'bold';
            dayCell.title = 'Today';
        }
        // Booked
        if (eventBookedDates[year] && eventBookedDates[year][month] && eventBookedDates[year][month].includes(d)) {
            dayCell.classList.add('booked');
            dayCell.title = 'Booked';
        }
        // Festival
        if (festivalDays.includes(d)) {
            dayCell.classList.add('festival');
            const fest = maharashtrianFestivals[year][month].find(f => f.day === d);
            if (fest) dayCell.title = fest.name;
        }
        // Available (not booked/festival, not past)
        if (!dayCell.classList.contains('booked') && !dayCell.classList.contains('festival') && (year > today.getFullYear() || (year === today.getFullYear() && (month > today.getMonth() || (month === today.getMonth() && d >= today.getDate()))))) {
            dayCell.classList.add('available');
            dayCell.title = 'Available';
        }
        calendarGrid.appendChild(dayCell);
    }
    // Empty days after last
    const totalCells = startDay + daysInMonth;
    for (let i = totalCells; i < 42; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day outside-month';
        calendarGrid.appendChild(emptyCell);
    }
    currentMonthLabel.textContent = `${months[month]} ${year}`;
    // Render festival list below calendar
    const festListContainer = document.getElementById('festivalListContainer');
    festListContainer.innerHTML = '';
    if (maharashtrianFestivals[year] && maharashtrianFestivals[year][month] && maharashtrianFestivals[year][month].length > 0) {
        const festList = document.createElement('ul');
        festList.className = 'festival-list';
        maharashtrianFestivals[year][month].forEach(fest => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class=\"legend-color festival\" style=\"margin-right:8px;\"></span> 
                <strong>${fest.day}</strong>: ${fest.name}
            `;
            festList.appendChild(li);
        });
        festListContainer.appendChild(festList);
    } else {
        festListContainer.innerHTML = '<div class=\"festival-list-empty\">No highlighted festivals this month.</div>';
    }
}
let eventCurrentDate = new Date();
let eventMonth = eventCurrentDate.getMonth();
let eventYear = eventCurrentDate.getFullYear();
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('eventCalendar')) {
        renderEventCalendar(eventMonth, eventYear);
        document.getElementById('eventPrevMonth').onclick = function() {
            eventMonth--;
            if (eventMonth < 0) {
                eventMonth = 11;
                eventYear--;
            }
            renderEventCalendar(eventMonth, eventYear);
        };
        document.getElementById('eventNextMonth').onclick = function() {
            eventMonth++;
            if (eventMonth > 11) {
                eventMonth = 0;
                eventYear++;
            }
            renderEventCalendar(eventMonth, eventYear);
        };
    }
});

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

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar(currentMonth, currentYear);
    
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