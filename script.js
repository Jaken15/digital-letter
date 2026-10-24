// Mga detalye ng bawat memory. Palitan ang captions at dates ayon sa totoong memories ninyo.
const memories = [
  {
    src: "images/memory1.png",
    caption: "Kinakabahan, pero masaya. ♡"
  },
  {
    src: "images/memory2.png",
    caption: "Will you marry me"
  },
  {
    src: "images/memory3.png",
    caption: "Mahal na Mahal kita ♡"
  },
  {
    src: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=90",
    caption: "Maliit na bagay, malaking saya. ♡"
  }
];

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const photoCount = document.getElementById("photoCount");
const letterModal = document.getElementById("letterModal");
let currentPhoto = 0;

// Binubuksan ang photo modal at ipinapakita ang napiling memory.
function openPhoto(index) {
  currentPhoto = index;
  showPhoto();
  imageModal.classList.add("open");
  imageModal.setAttribute("aria-hidden", "false");
}

// Ina-update ang larawan, caption, at bilang sa modal.
function showPhoto() {
  const memory = memories[currentPhoto];
  modalImage.src = memory.src;
  modalImage.alt = memory.caption;
  modalCaption.textContent = memory.caption;
  photoCount.textContent = `${currentPhoto + 1} / ${memories.length}`;
}

function changePhoto(direction) {
  // Ang modulo (%) ay nagbibigay-daan para bumalik sa unang larawan pagkatapos ng huli.
  currentPhoto = (currentPhoto + direction + memories.length) % memories.length;
  showPhoto();
}

function openLetter() {
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

// Lahat ng card na may data-photo ay puwedeng i-click.
document.querySelectorAll("[data-photo]").forEach((card) => {
  card.addEventListener("click", () => {
    openPhoto(Number(card.dataset.photo));
  });
});

document.getElementById("prevPhoto").addEventListener("click", () => changePhoto(-1));
document.getElementById("nextPhoto").addEventListener("click", () => changePhoto(1));
document.getElementById("openLetter").addEventListener("click", openLetter);

// Isara gamit ang close button o pag-click sa madilim na background.
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(document.getElementById(button.dataset.close));
  });
});

[imageModal, letterModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

// Keyboard support: Escape para isara, arrow keys para magpalit ng photo.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(imageModal);
    closeModal(letterModal);
  }
  if (imageModal.classList.contains("open") && event.key === "ArrowRight") changePhoto(1);
  if (imageModal.classList.contains("open") && event.key === "ArrowLeft") changePhoto(-1);
});
