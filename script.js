// JavaScript functionalities for interactivity

document.addEventListener("DOMContentLoaded", () => {
  // Image pop-up (lightbox) functionality limited to product images only
  const productImages = document.querySelectorAll(
    ".product-item img, #featured-image"
  );
  productImages.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      openLightbox(img.src, img.alt);
    });
  });

  // Function to create and show lightbox
  function openLightbox(src, alt) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "lightbox-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = 1000;
    overlay.style.cursor = "pointer";

    // Create image element
    const lightboxImage = document.createElement("img");
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxImage.style.maxWidth = "90%";
    lightboxImage.style.maxHeight = "90%";
    lightboxImage.style.borderRadius = "8px";
    lightboxImage.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.5)";

    overlay.appendChild(lightboxImage);

    // Close lightbox on click
    overlay.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });

    document.body.appendChild(overlay);
  }

  // Basic affiliate link click tracking (console log) using event delegation
  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches("a.btn")) {
      console.log(`Affiliate link clicked: ${target.href}`);
      // Here you can add analytics tracking code if needed
    }
  });

  // Dark mode toggle event listener inside DOMContentLoaded
  const checkbox = document.getElementById("checkbox");
  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });

  // Sync checkbox state with current theme on page load
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark");
    checkbox.checked = true;
  } else {
    document.body.classList.remove("dark");
    checkbox.checked = false;
  }

  // Scroll to top button functionality
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Show or hide the button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // Scroll smoothly to top when button is clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
