
// =====================================
// FDM GALLERY PAGE
// Filter + Lightbox
// =====================================

// Foto sementara.
// Ganti src dan alt saat dokumentasi asli tersedia.
const galleryItems = [
  {
    title: "Training Moments 01",
    category: "training",
    src: "/images/activities/environment-02.jpg",
    alt: "Foto sementara untuk kategori latihan",
    shape: "landscape",
  },
  {
    title: "Open Water 01",
    category: "openwater",
    src: "/images/Gallery/gallery-6.jpg",
    alt: "Ilustrasi freediving di perairan terbuka",
    shape: "portrait",
  },
  {
    title: "Community Moments 01",
    category: "community",
    src: "/images/Gallery/gallery-7.jpg",
    alt: "Foto sementara kategori komunitas",
    shape: "portrait",
  },
  {
    title: "Ocean Exploration 02",
    category: "openwater",
    src: "/images/Gallery/gallery-4.jpg",
    alt: "Ilustrasi suasana bawah laut",
    shape: "landscape",
  },
  {
    title: "Training Moments 02",
    category: "training",
    src: "/images/Gallery/gallery-5.jpg",
    alt: "Ilustrasi sementara latihan freediving",
    shape: "square",
  },
  {
    title: "Community Moments 02",
    category: "community",
    src: "/images/Gallery/gallery-8.png",
    alt: "Foto sementara untuk kebersamaan komunitas",
    shape: "landscape",
  },
  {
    title: "Event Moments 01",
    category: "event",
    src: "/images/activities/environment-01.jpg",
    alt: "Foto sementara kategori event",
    shape: "portrait",
  },
  {
    title: "Open Water 03",
    category: "openwater",
    src: "/images/Gallery/gallery-3.jpg",
    alt: "Ilustrasi freediver di laut",
    shape: "portrait",
  },
  {
    title: "Training Moments 03",
    category: "training",
    src: "/images/Gallery/gallery-12.png",
    alt: "Ilustrasi latihan freediving",
    shape: "landscape",
  },
  {
    title: "Event Moments 02",
    category: "event",
    src: "/images/Gallery/gallery-9.png",
    alt: "Ilustrasi bawah laut untuk kategori event",
    shape: "square",
  },
  {
    title: "Community Moments 03",
    category: "community",
    src: "/images/Gallery/gallery-11.png",
    alt: "Foto sementara kategori community",
    shape: "square",
  },
  {
    title: "Ocean Exploration 04",
    category: "openwater",
    src: "/images/Gallery/gallery-10.png",
    alt: "Ilustrasi eksplorasi bawah laut",
    shape: "landscape",
  },
];

// Category labels
const categoryLabels = {
  training: "Training",
  openwater: "Open Water",
  community: "Community",
  event: "Event",
};

// DOM Elements
const galleryGrid = document.getElementById("gallery-grid");
const filterButtons = document.querySelectorAll(".gallery-filter");
const galleryStatus = document.getElementById("gallery-status");

const dialog = document.getElementById("gallery-dialog");
const dialogImage = document.getElementById("gallery-dialog-image");
const dialogTitle = document.getElementById("gallery-dialog-title");
const dialogCaption = document.getElementById("gallery-dialog-caption");

const closeButton = document.getElementById("gallery-close");
const prevButton = document.getElementById("gallery-prev");
const nextButton = document.getElementById("gallery-next");

// State
let activeFilter = "all";
let visibleItems = [...galleryItems];
let currentIndex = 0;
let lastFocusedElement = null;


// =====================================
// 1. RENDER GALLERY
// =====================================

function renderGallery() {
  galleryGrid.innerHTML = "";

  galleryItems.forEach((item, index) => {
    const card = document.createElement("button");

    card.type = "button";
    card.dataset.index = String(index);
    card.dataset.category = item.category;

    card.setAttribute(
      "aria-label",
      `Perbesar ${item.title}`
    );

    card.className =
      "gallery-card group relative mb-3 overflow-hidden rounded-[18px] " +
      "bg-[#075B86] shadow-[0_8px_25px_rgba(6,43,72,0.10)] " +
      "sm:mb-4 sm:rounded-[20px]";

    const media = document.createElement("div");
    media.className =
      `gallery-media gallery-media--${item.shape} relative overflow-hidden`;

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt;
    image.loading = "lazy";
    image.decoding = "async";

    const overlay = document.createElement("div");
    overlay.className =
      "pointer-events-none absolute inset-0 flex flex-col " +
      "justify-end bg-gradient-to-t from-[#021B31]/85 " +
      "via-[#021B31]/15 to-transparent p-3 sm:p-5";

    const category = document.createElement("span");
    category.className =
      "text-[10px] font-semibold uppercase tracking-[0.12em] text-aqua";

    category.textContent = categoryLabels[item.category];

    const title = document.createElement("span");
    title.className =
      "mt-1 font-heading text-xs font-semibold leading-snug " +
      "text-white sm:text-sm";

    title.textContent = item.title;

    overlay.append(category, title);
    media.append(image, overlay);
    card.append(media);

    galleryGrid.append(card);
  });
}


// =====================================
// 2. FILTER GALLERY
// =====================================

function filterGallery(category) {
  activeFilter = category;

  visibleItems = galleryItems.filter((item) => {
    return category === "all" || item.category === category;
  });

  const cards = galleryGrid.querySelectorAll(".gallery-card");

  cards.forEach((card) => {
    const matches =
      category === "all" ||
      card.dataset.category === category;

    card.hidden = !matches;
  });

  // Update active button
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;

    button.setAttribute("aria-pressed", String(isActive));
  });

  galleryStatus.textContent =
    `${visibleItems.length} foto contoh ditampilkan`;
}


// =====================================
// 3. LIGHTBOX CONTENT
// =====================================

function updateLightbox() {
  const item = visibleItems[currentIndex];

  if (!item) return;

  dialogImage.src = item.src;
  dialogImage.alt = item.alt;

  dialogTitle.textContent = item.title;

  dialogCaption.textContent =
    `${categoryLabels[item.category]} · ` +
    `Foto ilustrasi sementara, dokumentasi resmi menyusul.`;

  // Hide navigation for a single item
  const hasMultiple = visibleItems.length > 1;

  prevButton.hidden = !hasMultiple;
  nextButton.hidden = !hasMultiple;
}


// =====================================
// 4. OPEN LIGHTBOX
// =====================================

function openLightbox(originalIndex, trigger) {
  const selected = galleryItems[originalIndex];

  currentIndex = visibleItems.indexOf(selected);

  if (currentIndex < 0) return;

  lastFocusedElement = trigger;

  updateLightbox();
  dialog.showModal();
}


// =====================================
// 5. NEXT AND PREVIOUS
// =====================================

function nextImage() {
  if (!visibleItems.length) return;

  currentIndex =
    (currentIndex + 1) % visibleItems.length;

  updateLightbox();
}

function previousImage() {
  if (!visibleItems.length) return;

  currentIndex =
    (currentIndex - 1 + visibleItems.length) %
    visibleItems.length;

  updateLightbox();
}


// =====================================
// 6. EVENT LISTENERS
// =====================================

// Filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterGallery(button.dataset.filter);
  });
});

// Open selected image
galleryGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".gallery-card");

  if (!card) return;

  const index = Number(card.dataset.index);

  openLightbox(index, card);
});

// Lightbox buttons
closeButton.addEventListener("click", () => {
  dialog.close();
});

nextButton.addEventListener("click", nextImage);
prevButton.addEventListener("click", previousImage);

// Keyboard navigation
dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    previousImage();
  }

  // Escape is handled natively by <dialog>
});

// Close by clicking the backdrop
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

// Restore focus when lightbox closes
dialog.addEventListener("close", () => {
  lastFocusedElement?.focus();
});


// =====================================
// 7. INITIALIZE
// =====================================

renderGallery();
filterGallery("all");
