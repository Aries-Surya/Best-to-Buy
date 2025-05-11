document.addEventListener("DOMContentLoaded", () => {
    // Lightbox functionality
    const productImages = document.querySelectorAll(".product-item img, #featured-image");
    productImages.forEach((img) => {
        img.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.id = "lightbox-overlay";
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
            `;

            const lightboxImage = document.createElement("img");
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxImage.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 8px;
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            `;

            overlay.appendChild(lightboxImage);
            overlay.addEventListener("click", () => document.body.removeChild(overlay));
            document.body.appendChild(overlay);
        });
    });

    // Dark mode persistence
    const checkbox = document.getElementById("checkbox");
    const darkMode = localStorage.getItem('darkMode') === 'true';
    
    document.body.classList.toggle("dark", darkMode);
    checkbox.checked = darkMode;

    checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem('darkMode', checkbox.checked);
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", () => {
        scrollToTopBtn.style.display = window.pageYOffset > 100 ? "flex" : "none";
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Affiliate link tracking
    document.body.addEventListener("click", (event) => {
        if (event.target.matches("a.btn")) {
            console.log(`Affiliate link clicked: ${event.target.href}`);
        }
    });
});