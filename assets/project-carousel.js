(() => {
  const carousel = document.getElementById("project-carousel");
  if (!carousel) return;

  const viewport = carousel.querySelector(".arc-viewport");
  const cards = [...carousel.querySelectorAll(".arc-card")];
  const dots = [...carousel.querySelectorAll(".arc-dot")];
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  let active = Math.min(3, cards.length - 1);

  const render = () => {
    const spacing = Math.max(150, Math.min(365, viewport.clientWidth * .255));
    cards.forEach((card, index) => {
      const offset = index - active;
      const distance = Math.abs(offset);
      card.style.setProperty("--arc-x", `${offset * spacing}px`);
      card.style.setProperty("--arc-y", `${offset * 105 + distance * 10}px`);
      card.style.setProperty("--arc-rotate", `${offset * 25}deg`);
      card.style.setProperty("--arc-scale", offset === 0 ? "1" : String(Math.max(.66, .83 - distance * .045)));
      card.style.setProperty("--arc-opacity", distance > 4 ? ".38" : String(Math.max(.46, .94 - distance * .1)));
      card.style.setProperty("--arc-z", String(20 - distance));
      card.classList.toggle("is-active", offset === 0);
      card.setAttribute("aria-current", offset === 0 ? "true" : "false");
      card.tabIndex = distance <= 2 ? 0 : -1;
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === active);
      dot.setAttribute("aria-current", index === active ? "true" : "false");
    });
    previous.disabled = active === 0;
    next.disabled = active === cards.length - 1;
  };

  const goTo = (index) => {
    active = Math.max(0, Math.min(cards.length - 1, index));
    render();
  };

  previous.addEventListener("click", () => goTo(active - 1));
  next.addEventListener("click", () => goTo(active + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => goTo(index)));

  cards.forEach((card, index) => {
    card.addEventListener("click", (event) => {
      if (index === active) return;
      event.preventDefault();
      event.stopPropagation();
      goTo(index);
    }, true);
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); goTo(active - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); goTo(active + 1); }
  });

  let startX = 0;
  viewport.addEventListener("pointerdown", (event) => { startX = event.clientX; });
  viewport.addEventListener("pointerup", (event) => {
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 45) goTo(active + (delta < 0 ? 1 : -1));
  });

  window.addEventListener("resize", render, { passive: true });
  render();
})();
