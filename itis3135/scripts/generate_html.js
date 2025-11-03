(function () {


  
    const escapeHTML = (s = "") =>
        String(s)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");

   
    const v = (id) => (document.getElementById(id)?.value || "").trim();

    function getPreviewImgSrc() {
        const img = document.querySelector("#loadImage img");
        return img ? img.src : "";
    }

    function getCourses() {
        const root = document.getElementById("courses");
        if (!root) return [];

        const items = [];
        const rows = root.querySelectorAll(".course, .row, .course-item, .courseRow");
        if (rows.length) {
            rows.forEach((row) => {
                const title =
                    (row.querySelector(".courseTitle, [name='courseTitle'], input[type='text']")?.value || "").trim();
                const desc =
                    (row.querySelector(".courseDesc, [name='courseDesc'], textarea")?.value || "").trim();
                if (title || desc) items.push({ title, desc });
            });
            return items;
        }

    
        const fields = [...root.querySelectorAll("input, textarea")]
            .map((el) => el.value.trim())
            .filter(Boolean);
        for (let i = 0; i < fields.length; i += 2) {
            items.push({ title: fields[i] || "", desc: fields[i + 1] || "" });
        }
        return items;
    }

    
    function buildIntroHTML() {
        const firstName = v("firstName");
        const lastName = v("lastName");
        const mascotAdj = v("mascotAdj");
        const mascotAnimal = v("mascotAnimal");
        const divider = v("divider") || "|";

        const imgSrc = getPreviewImgSrc(); 
        const caption = v("caption");
        const stmt = v("personalStmt");

        const bullet1 = v("bullet1"); // Personal Background
        const bullet2 = v("bullet2"); // Professional Background
        const bullet3 = v("bullet3"); // Academic Background
        const bullet4 = v("bullet4"); // Primary Computer
        const bullet6 = v("bullet6"); // Funny thing? (optional)
        const shareExtra = v("shareExtra"); // Anything else? (optional)

        const courses = getCourses();

        const nameLine = `${escapeHTML(firstName)} ${escapeHTML(lastName)} ${escapeHTML(divider)} ${escapeHTML(mascotAdj)} ${escapeHTML(mascotAnimal)}`;

        return `<h2>Introduction HTML</h2>
<h3>${nameLine}</h3>
<figure>
  <img
    src="${escapeHTML(imgSrc)}"
    alt="Headshot of ${escapeHTML(firstName)} ${escapeHTML(lastName)}"
  />
  <figcaption>${escapeHTML(caption)}</figcaption>
</figure>
<ul>
  <li><strong>Personal Background:</strong> ${escapeHTML(bullet1)}</li>
  <li><strong>Professional Background:</strong> ${escapeHTML(bullet2)}</li>
  <li><strong>Academic Background:</strong> ${escapeHTML(bullet3)}</li>
  <li><strong>Primary Computer:</strong> ${escapeHTML(bullet4)}</li>
  ${bullet6 ? `<li><strong>Funny thing:</strong> ${escapeHTML(bullet6)}</li>` : ``}
  ${shareExtra ? `<li><strong>Anything else:</strong> ${escapeHTML(shareExtra)}</li>` : ``}
</ul>
${stmt ? `<p>${escapeHTML(stmt)}</p>` : ``}
${courses.length ? `<h3>Courses I’m Taking, &amp; Why:</h3>
<ul>
  ${courses
                    .map(
                        (c) =>
                            `<li><strong>${escapeHTML(c.title || "Course")}:</strong> ${escapeHTML(c.desc || "")}</li>`
                    )
                    .join("\n  ")}
</ul>` : ``}`;
    }



    function showGeneratedHTML() {

        const pageH2 = document.querySelector("main h2");
        if (pageH2) pageH2.textContent = "Introduction HTML";


        const formWrap = document.getElementById("form-wrap");
        const resultWrap = document.getElementById("result-wrap");
        if (formWrap) formWrap.classList.add("hidden");
        if (resultWrap) resultWrap.classList.remove("hidden");

        if (resultWrap) {
            resultWrap.innerHTML = `
        <section class="code-output">
          <p class="muted">Select all and copy this HTML:</p>
          <pre><code id="htmlOutput" class="language-html"></code></pre>
        </section>
      `;

            const codeEl = document.getElementById("htmlOutput");
            const htmlBlock = buildIntroHTML();
           
            codeEl.textContent = htmlBlock;

            // Highlight newly inserted code
            if (window.hljs?.highlightElement) {
                hljs.highlightElement(codeEl);
            }
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("btnGenerateHTML");
        if (btn) btn.addEventListener("click", showGeneratedHTML);


        if (window.hljs?.highlightAll) {
            hljs.highlightAll();
        }
    });
})();
