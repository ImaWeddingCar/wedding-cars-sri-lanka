document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // 1. Mobile Menu Toggle Functionality
    // ===============================================
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMain = document.getElementById('navbar-main');

    // IMPORTANT: This check ensures the code only runs if the elements are found
    if (menuToggle && navbarMain) {
        menuToggle.addEventListener('click', function() {
            // Toggle the 'active' class on the navigation bar
            navbarMain.classList.toggle('active');
            
            // Update aria-expanded state for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when a link is clicked
        const navLinks = navbarMain.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navbarMain.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // ===============================================
    // 2. Simple Form Submission Status (Client-side feedback)
    // ===============================================
    const contactForm = document.getElementById('advancedContactForm');
    const statusMessage = document.getElementById('form-status');

    if (contactForm) {
        
        contactForm.addEventListener('submit', function(e) {
            
            // Basic form validation check (browser handles 'required')
            const emailInput = contactForm.querySelector('input[name="email"]').value;
            
            // You may need to define var('--color-primary') in the script 
            // if you want to use it directly in JS. For simplicity, I'll use a color here.
            const primaryColor = '#008080'; // Emerald Green
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
                statusMessage.textContent = 'Please enter a valid email address.';
                statusMessage.style.color = 'red';
                e.preventDefault();
                return;
            }

            statusMessage.textContent = 'Sending message...';
            statusMessage.style.color = primaryColor;
        });
    }
    
    // Add other functions here (like scroll animation) if you had them in this file
    
}); // Closing brace of the DOMContentLoaded listener

document.getElementById("my-button").addEventListener("click", function() {
    // This function runs when the element is clicked
    window.open("https://www.new-destination.com/", "_blank");
});