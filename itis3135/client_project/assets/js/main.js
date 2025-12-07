// Main script for global behaviors: highlight the active nav link based on current page

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop(); // e.g. "fol.html" or "lookbook.html"

  // Loop through nav links to find match
  document.querySelectorAll(".site-nav a").forEach(link => {
    const href = link.getAttribute("href");

    // match end of path for root pages, and support ../ for inner
    if (path === href || ("../" + path) === href) {
      link.setAttribute("aria-current", "page");
    }
  });
});