document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // 1. Mobile Menu Toggle Functionality
    // ===============================================
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMain = document.getElementById('navbar-main');

    if (menuToggle && navbarMain) {
        menuToggle.addEventListener('click', function() {
            // Toggle the 'active' class on the navigation bar
            navbarMain.classList.toggle('active');
            
            // Update aria-expanded state for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when a link is clicked (useful for single-page scrolling)
        const navLinks = navbarMain.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Only on mobile
                    navbarMain.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }


    // ===============================================
    // 2. Booking Form Time Select Population
    // ===============================================
    const startTimeSelect = document.getElementById('startTimeSelect');
    const endTimeSelect = document.getElementById('endTimeSelect');
    
    function populateTimeSelects() {
        const startPlaceholder = startTimeSelect.querySelector('option[value=""]');
        const endPlaceholder = endTimeSelect.querySelector('option[value=""]');

        // Clear existing options (except the placeholder)
        startTimeSelect.innerHTML = '';
        endTimeSelect.innerHTML = '';
        
        if(startPlaceholder) startTimeSelect.appendChild(startPlaceholder);
        if(endPlaceholder) endTimeSelect.appendChild(endPlaceholder);

        // Generate options from 06:00 to 22:00 in 30-minute intervals
        for (let h = 6; h <= 22; h++) {
            for (let m = 0; m < 60; m += 30) {
                // Format hours and minutes to ensure two digits
                const hour = String(h).padStart(2, '0');
                const minute = String(m).padStart(2, '0');
                const timeValue = `${hour}:${minute}`;

                const option = new Option(timeValue, timeValue);
                startTimeSelect.appendChild(option.cloneNode(true));
                endTimeSelect.appendChild(option);
            }
        }
    }

    populateTimeSelects();


    // ===============================================
    // 3. Decoration Toggle Functionality
    // ===============================================
    const decoButtons = document.querySelectorAll('.deco-btn');
    const decorationTypeInput = document.getElementById('decorationType');

    decoButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons
            decoButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            this.classList.add('active');

            // Update the hidden input field's value
            decorationTypeInput.value = this.getAttribute('data-value');
        });
    });


    // ===============================================
    // 4. Form Validation (Basic Example)
    // ===============================================
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            
            const dateInput = document.querySelector('input[name="wedding-date"]');
            const phoneInput = document.querySelector('input[name="phone"]');

            // Simple Date Check (must be in the future)
            const today = new Date().toISOString().split('T')[0];
            if (dateInput.value && dateInput.value < today) {
                alert('Please select a wedding date in the future.');
                e.preventDefault();
                return;
            }

            // Simple Phone Number Check (just checks if it's 10 digits if provided)
            if (phoneInput.value && !/^\d{10}$/.test(phoneInput.value.replace(/[^0-9]/g, ''))) {
                 alert('Please enter a valid 10-digit phone number.');
                 e.preventDefault();
                 return;
            }
            
            // Check if both start and end times are selected
            if (!startTimeSelect.value || !endTimeSelect.value) {
                alert('Please select both a start time and an end time.');
                e.preventDefault();
                return;
            }

            // Note: More robust validation is typically done server-side, 
            // but this provides a good client-side user experience.
        });
    }

});

// ===============================================
// 5. Scroll Animation Functionality
// ===============================================
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const viewportHeight = window.innerHeight;

    animatedElements.forEach(element => {
        // Get the position of the element relative to the viewport
        const elementTop = element.getBoundingClientRect().top;
        
        // If the top of the element is within the bottom 20% of the viewport (or less)
        // it triggers the animation.
        const triggerPoint = viewportHeight * 0.85; 

        if (elementTop < triggerPoint) {
            element.classList.add('in-view');
        } else {
            // Optional: Remove in-view class if you want the animation to repeat on scroll up
            // element.classList.remove('in-view'); 
        }
    });
}

// Attach the function to the scroll and load events
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);