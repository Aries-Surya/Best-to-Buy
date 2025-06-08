document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode Toggle
  const checkbox = document.getElementById("checkbox");
  const body = document.body;

  // Set dark mode as default unless user has a saved preference
  let darkMode = localStorage.getItem("darkMode");
  if (darkMode === null) {
    body.classList.add("dark");
    checkbox.checked = true;
    localStorage.setItem("darkMode", true);
  } else if (darkMode === "true") {
    body.classList.add("dark");
    checkbox.checked = true;
  } else {
    body.classList.remove("dark");
    checkbox.checked = false;
  }

  checkbox.addEventListener("change", () => {
    body.classList.toggle("dark");
    localStorage.setItem("darkMode", checkbox.checked);
  });

  // Scroll to top button
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Toast notification
  const toast = document.getElementById("toast-popup");

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Featured products slider
  // Build featuredSlides dynamically from all .product-item elements
  function getAllProductSlides() {
    return Array.from(document.querySelectorAll(".product-item")).map(
      (item) => {
        const img = item.querySelector(".product-image img");
        const title = item.querySelector(".product-content h3");
        const desc = item.querySelector(".product-content p");
        const link = item.querySelector(".product-content .btn");
        return {
          title: title ? title.textContent.trim() : "",
          desc: desc ? desc.textContent.trim() : "",
          image: img ? img.src : "",
          link: link ? link.href : "",
        };
      }
    );
  }
  let featuredSlides = getAllProductSlides();

  let currentSlide = 0;
  const featuredImage = document.querySelector(".featured-image img");
  const featuredTitle = document.querySelector(".featured-content h3");
  const featuredDesc = document.querySelector(".featured-content p");
  const featuredLink = document.querySelector(".featured-content .btn");

  // Add share link to featured-container for current featured product
  const featuredContainer = document.querySelector(".featured-container");
  if (featuredContainer && !featuredContainer.querySelector(".share-link")) {
    const shareLink = document.createElement("a");
    shareLink.className = "share-link";
    // Initially set to first featured product anchor link
    const getAnchorLink = (title) =>
      `${window.location.origin + window.location.pathname}#${title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}`;
    shareLink.href = getAnchorLink(featuredSlides[0].title);
    shareLink.innerHTML = '<i class="fas fa-link"></i>';
    shareLink.style.position = "absolute";
    shareLink.style.top = "18px";
    shareLink.style.right = "18px";
    shareLink.addEventListener("click", function (e) {
      e.preventDefault();
      const current = featuredSlides[currentSlide];
      const anchorLink = getAnchorLink(current.title);
      navigator.clipboard.writeText(anchorLink).then(() => {
        if (typeof showToast === "function") {
          showToast(`Link for \"${current.title}\" copied to clipboard!`);
        } else {
          alert(`Link for \"${current.title}\" copied to clipboard!`);
        }
      });
    });
    featuredContainer.style.position = "relative";
    featuredContainer.appendChild(shareLink);
  }

  // Update share link in featured-container on slide change
  function updateFeaturedShareLink() {
    const shareLink = featuredContainer.querySelector(".share-link");
    if (shareLink) {
      const anchorLink = `${
        window.location.origin + window.location.pathname
      }#${featuredSlides[currentSlide].title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}`;
      shareLink.href = anchorLink;
    }
  }

  function updateFeaturedSlide() {
    const slide = featuredSlides[currentSlide];
    featuredImage.src = slide.image;
    featuredImage.alt = slide.title;
    featuredTitle.textContent = slide.title;
    featuredDesc.textContent = slide.desc;
    featuredLink.href = slide.link;
    updateFeaturedShareLink();
  }

  // Auto slideshow logic
  let autoSlideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % featuredSlides.length;
    updateFeaturedSlide();
  }, 4000);

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % featuredSlides.length;
      updateFeaturedSlide();
    }, 4000);
  }

  document.getElementById("next-featured").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % featuredSlides.length;
    updateFeaturedSlide();
    resetAutoSlide();
  });

  document.getElementById("prev-featured").addEventListener("click", () => {
    currentSlide =
      (currentSlide - 1 + featuredSlides.length) % featuredSlides.length;
    updateFeaturedSlide();
    resetAutoSlide();
  });

  // Initialize
  updateFeaturedSlide();

  // Product card animation on scroll
  const productItems = document.querySelectorAll(".product-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  productItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(item);
  });

  // Copy link functionality
  const copyLinkButtons = document.querySelectorAll(".copy-link-btn");
  copyLinkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-item");
      const productName = productCard.querySelector("h3").textContent;
      showToast(`Link for "${productName}" copied to clipboard!`);
    });
  });

  // Hide header on scroll down (mobile only)
  let lastScrollTop = 0;
  const header = document.querySelector("header");
  function handleHeaderScroll() {
    if (window.innerWidth > 992) {
      header.style.transform = "";
      header.style.transition = "";
      return;
    }
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 60) {
      // Scroll down
      header.style.transform = "translateY(-100%)";
      header.style.transition = "transform 0.3s";
    } else {
      // Scroll up
      header.style.transform = "translateY(0)";
      header.style.transition = "transform 0.3s";
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }
  window.addEventListener("scroll", handleHeaderScroll);
  window.addEventListener("resize", handleHeaderScroll);

  // Auto-generate product id and share link for each product
  document.querySelectorAll(".product-item").forEach((item) => {
    const h3 = item.querySelector("h3");
    if (h3) {
      // Generate id: lowercase, replace spaces and non-alphanumerics with hyphens
      const id = h3.textContent
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      item.id = id;
      // Add share link icon if not present
      if (!item.querySelector(".share-link")) {
        const shareLink = document.createElement("a");
        shareLink.className = "share-link";
        // Make share link dynamic based on current domain and path
        shareLink.href = `${
          window.location.origin + window.location.pathname
        }#${id}`;
        shareLink.innerHTML = '<i class="fas fa-link"></i>';
        shareLink.addEventListener("click", function (e) {
          e.preventDefault();
          navigator.clipboard.writeText(shareLink.href).then(() => {
            if (typeof showToast === "function") {
              showToast("Product link copied!");
            } else {
              // fallback toast
              alert("Product link copied!");
            }
          });
        });
        item.insertBefore(shareLink, item.firstChild);
      }
    }
  });

  // --- Highlight product on hash navigation ---
  function highlightProductFromHash() {
    // Remove highlight from any previously highlighted product
    document.querySelectorAll(".highlighted-product").forEach((el) => {
      el.classList.remove("highlighted-product");
    });
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const id = hash.slice(1);
      const product = document.getElementById(id);
      if (product && product.classList.contains("product-item")) {
        product.classList.add("highlighted-product");
        product.scrollIntoView({ behavior: "smooth", block: "center" });
        // Remove highlight after animation
        setTimeout(() => {
          product.classList.remove("highlighted-product");
        }, 1600);
      }
    }
  }

  // Run on page load (after DOM ready)
  highlightProductFromHash();
  // Run on hash change
  window.addEventListener("hashchange", highlightProductFromHash);
});
