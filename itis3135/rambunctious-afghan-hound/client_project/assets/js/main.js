document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop(); // e.g. "projects.html" or "face-fissure-collection.html"

  document.querySelectorAll(".site-nav a").forEach(link => {
    const href = link.getAttribute("href");

    // match end of path for root pages, and support ../ for inner
    if (path === href || ("../" + path) === href) {
      link.setAttribute("aria-current", "page");
    }
  });
});