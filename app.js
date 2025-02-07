
// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    onscroll: true,
});

// Add event listener to the WhatsApp link (check if it exists)
let whatsappLink = document.getElementById("whatsapp-link");
if (whatsappLink) {
    whatsappLink.addEventListener("click", function () {
        var phoneNumber = "1234567890";
        var message = encodeURIComponent("Hello, I would like to know more about your services.");
        var whatsappUrl = "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + message;
        window.open(whatsappUrl, "_blank");
    });
}

// Function to show inline error messages
function showError(inputId, message) {
    let inputField = document.getElementById(inputId);
    let errorSpan = document.getElementById(inputId + "-error");

    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.id = inputId + "-error";
        errorSpan.style.color = "red";
        inputField.parentNode.appendChild(errorSpan);
    }
    errorSpan.innerText = message;
}

// Function to clear all error messages
function clearErrors() {
    document.querySelectorAll("span[id$='-error']").forEach((span) => span.innerText = "");
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    let contactForm = document.getElementById("contactForm");
    let submitButton = contactForm.querySelector("button[type='submit']");

    // Add event listener to the contact form submission
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        clearErrors();

        // Get values from the form fields
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let message = document.getElementById("message").value.trim();

        let valid = true; // Track validation status

        if (name === "") {
            showError("name", "Name is required.");
            valid = false;
        } else if (!/^[A-Za-z ]+$/.test(name)) {
            showError("name", "Name should contain only letters and spaces.");
            valid = false;
        }

        if (email === "") {
            showError("email", "Email is required.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("email", "Enter a valid email address.");
            valid = false;
        }

        if (subject.length < 5) {
            showError("subject", "Subject must be at least 5 characters.");
            valid = false;
        }

        if (message.length < 10) {
            showError("message", "Message must be at least 10 characters.");
            valid = false;
        }

        if (valid) {
            // Show loading effect
            submitButton.innerHTML = "Sending...";
            submitButton.disabled = true;

            setTimeout(() => {
                alert("Thank you! Your message has been sent successfully.");
                contactForm.reset(); // Reset the form
                submitButton.innerHTML = "Submit";
                submitButton.disabled = false;
            }, 2000);
        }
    });
});

// Close offcanvas menu when clicking outside (for mobile navbar)
document.addEventListener("click", function (event) {
    let navbarToggler = document.querySelector(".navbar-toggler");
    let navbarCollapse = document.querySelector(".navbar-collapse");

    if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains("show")) {
        if (!navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
            navbarToggler.click(); // Close menu when clicking outside
        }
    }
});

