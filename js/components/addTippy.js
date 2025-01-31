export default function createTooltips() {
  const tooltipBlocks = document.querySelectorAll(".product-card__tooltip");
  tooltipBlocks.forEach((block) => {
    const btn = block.querySelector(".tooltip__btn");
    const contentEl = block.querySelector(".tooltip__content");

    if (btn && contentEl) {
      tippy(btn, {
        content: contentEl,
        interactive: true,
      });
      contentEl.style.display = "block";
      contentEl.style.color = "black";
    }
  });
}
