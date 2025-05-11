// JavaScript functionalities for interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Image pop-up (lightbox) functionality
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt);
        });
    });

    // Function to create and show lightbox
    function openLightbox(src, alt) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = 1000;
        overlay.style.cursor = 'pointer';

        // Create image element
        const lightboxImage = document.createElement('img');
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightboxImage.style.maxWidth = '90%';
        lightboxImage.style.maxHeight = '90%';
        lightboxImage.style.borderRadius = '8px';
        lightboxImage.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';

        overlay.appendChild(lightboxImage);

        // Close lightbox on click
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        document.body.appendChild(overlay);
    }

    // Placeholder for product slider/carousel functionality
    // This can be implemented later or with a library if needed

    // Placeholder for dynamic content loading from JSON or API

    // Placeholder for smooth scroll if navigation is added

    // Basic affiliate link click tracking (console log)
    const affiliateLinks = document.querySelectorAll('a.btn');
    affiliateLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log(`Affiliate link clicked: ${link.href}`);
            // Here you can add analytics tracking code if needed
        });
    });
});
