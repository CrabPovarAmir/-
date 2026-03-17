const slides = document.querySelectorAll(".slide");
const navButtons = document.querySelectorAll(".nav-btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let isAnimating = false;

function showSlide(index, direction = "right") {
  if (isAnimating || index === currentSlide) return;
  if (index < 0 || index >= slides.length) return;

  isAnimating = true;

  const current = slides[currentSlide];
  const next = slides[index];

  current.classList.remove("active", "exit-left", "exit-right");
  next.classList.remove("active", "exit-left", "exit-right");

  current.classList.add(direction === "right" ? "exit-left" : "exit-right");

  setTimeout(() => {
    current.classList.remove("active", "exit-left", "exit-right");
    next.classList.add("active");

    navButtons.forEach(btn => btn.classList.remove("active"));
    navButtons[index].classList.add("active");

    currentSlide = index;

    setTimeout(() => {
      isAnimating = false;
    }, 650);
  }, 80);
}

navButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const direction = index > currentSlide ? "right" : "left";
    showSlide(index, direction);
  });
});

nextBtn.addEventListener("click", () => {
  const nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex, "right");
});

prevBtn.addEventListener("click", () => {
  const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prevIndex, "left");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex, "right");
  }

  if (e.key === "ArrowLeft") {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex, "left");
  }
});