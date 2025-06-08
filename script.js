document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode Toggle
  const checkbox = document.getElementById("checkbox");
  const body = document.body;

  // Load dark mode preference from localStorage
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    body.classList.add("dark");
    checkbox.checked = true;
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
  const featuredSlides = [
    {
      title: "OnePlus Nord Buds 2r",
      desc: "True Wireless in Ear Earbuds with Mic, 12.4mm Drivers, Playback:Upto 38hr case,4-Mic Design, IP55 Rating",
      image: "https://m.media-amazon.com/images/I/51oMWaW7tKL._SL1500_.jpg",
      link: "https://amzn.to/4d8CNFU",
    },
    {
      title: "Weight Machine for Kitchen",
      desc: "Digital Scale with LCD Display, Scale for Home Baking, Cooking & Balance Diet. Weighing Machine with capacity 10Kg with back light",
      image: "https://m.media-amazon.com/images/I/61R3VKYEwlL._SL1100_.jpg",
      link: "https://amzn.to/43eDESg",
    },
    {
      title: "HP Laserjet Pro P1108 Plus Laser Printer",
      desc: "Bluetooth 5.0 Wireless Gaming Headphones with RGB Lights, Dual 40mm Drivers, 3.5mm Aux, USB-C Charging, Mic, 30 Hours Playtime",
      image: "https://m.media-amazon.com/images/I/71KgNbsM3-L._SL1500_.jpg",
      link: "https://amzn.to/3ZcK8ij",
    },
  ];

  let currentSlide = 0;
  const featuredImage = document.querySelector(".featured-image img");
  const featuredTitle = document.querySelector(".featured-content h3");
  const featuredDesc = document.querySelector(".featured-content p");
  const featuredLink = document.querySelector(".featured-content .btn");

  function updateFeaturedSlide() {
    const slide = featuredSlides[currentSlide];
    featuredImage.src = slide.image;
    featuredImage.alt = slide.title;
    featuredTitle.textContent = slide.title;
    featuredDesc.textContent = slide.desc;
    featuredLink.href = slide.link;
  }

  document.getElementById("next-featured").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % featuredSlides.length;
    updateFeaturedSlide();
  });

  document.getElementById("prev-featured").addEventListener("click", () => {
    currentSlide =
      (currentSlide - 1 + featuredSlides.length) % featuredSlides.length;
    updateFeaturedSlide();
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
});
