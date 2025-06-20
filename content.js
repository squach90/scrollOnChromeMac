let scrolling = false;
let scrollOrigin = { x: 0, y: 0 };
let currentMouse = { x: 0, y: 0 };
let scrollIndicator = null;
let scrollInterval = null;

document.addEventListener("mousedown", (e) => {
  if (
    e.button === 1 &&
    !e.target.closest("a, button, input, textarea, select")
  ) {
    e.preventDefault();

    if (scrolling) {
      stopScrolling();
    } else {
      startScrolling(e.clientX, e.clientY);
    }
  }
});

document.addEventListener("mousemove", (e) => {
  currentMouse.x = e.clientX;
  currentMouse.y = e.clientY;
});

function startScrolling(x, y) {
  scrolling = true;
  scrollOrigin = { x, y };

  scrollIndicator = document.createElement("div");
  scrollIndicator.style.position = "fixed";
  scrollIndicator.style.left = `${x}px`;
  scrollIndicator.style.top = `${y}px`;
  scrollIndicator.style.width = "24px";
  scrollIndicator.style.height = "24px";
  scrollIndicator.style.marginLeft = "-12px";
  scrollIndicator.style.marginTop = "-12px";
  scrollIndicator.style.border = "2px solid #888";
  scrollIndicator.style.borderRadius = "50%";
  scrollIndicator.style.background = "white";
  scrollIndicator.style.zIndex = 9999;
  scrollIndicator.style.pointerEvents = "none";
  scrollIndicator.style.boxShadow = "0 0 4px rgba(0,0,0,0.2)";
  document.body.appendChild(scrollIndicator);

  scrollInterval = setInterval(() => {
    const dx = currentMouse.x - scrollOrigin.x;
    const dy = currentMouse.y - scrollOrigin.y;

    const threshold = 4;
    if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
      const speedFactor = 0.4;
      window.scrollBy(dx * speedFactor, dy * speedFactor);
    }
  }, 16);
}

function stopScrolling() {
  scrolling = false;
  if (scrollIndicator) {
    scrollIndicator.remove();
    scrollIndicator = null;
  }
  clearInterval(scrollInterval);
}
