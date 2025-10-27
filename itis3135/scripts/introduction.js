var defaults = {

    firstName: "Ramiro",
    lastName: "Alvarez-Cruz",
    mascotAdj: "Rambunctious",
    mascotAnimal: "Afghan Hound",
    imgFile: "https://webpages.charlotte.edu/ralvar10/itis3135/images/IMG_4637.jpg",
    caption: "At the CHHS bathroom mirror selfie, 2025",
    personalStmt: "My name is Ramiro Alvarez-Cruz, and I am a Junior currently attending UNCC. I am allergic to peanuts and tree nuts but do not tell anyone. I am from Mebane, North Carolina and have lived in North Carolina all of my life. I have an interest in ethical hacking, architecture, AI and robotics.",
     
    divider: "|",
    quote: "The key to good design is finding beauty in unexpected places.",
    quoteAuthor: "Martin Margiela",

    bullets: {
        personal: "First generation student born in Chapel Hill, NC",
        professional: "Server at Press Coffee and Crepes + Cocktails for two years, and currently a Server at Superica",
        academic: "Junior attending UNCC majoring in Computer Science with a concentration in software engineering",
        primaryComputer: "Dell XPS 13, Windows 11, Laptop, primarily working from home"
    }

};

let _imgObjectURL = null;

function loadImage() {
    const fileInput = document.getElementById('introImage');
    const file = fileInput.files && fileInput.files[0];
    const wrap = document.getElementById('loadImage');

    // Always unhide when the button is clicked
    wrap.classList.remove('hidden');

    // If no file selected, show me
    if (!file) {
        wrap.innerHTML = '<img src="' + defaults.imgFile + '" alt="Default picture">';
        return;
    }

    if (_imgObjectURL) {
        URL.revokeObjectURL(_imgObjectURL);
        _imgObjectURL = null;
    }

    _imgObjectURL = URL.createObjectURL(file);
    wrap.innerHTML = '<img src="' + _imgObjectURL + '" alt="Uploaded picture">';
}

// Defaults injected 
function setDefaults() {
    document.getElementById("firstName").value = defaults.firstName;
    document.getElementById("lastName").value = defaults.lastName;
    document.getElementById("mascotAdj").value = defaults.mascotAdj;
    document.getElementById("mascotAnimal").value = defaults.mascotAnimal;
    document.getElementById("caption").value = defaults.caption;
    document.getElementById("personalStmt").value = defaults.personalStmt;
    document.getElementById("divider").value = defaults.divider;
    document.getElementById("quote").value = "“" + defaults.quote + "”";
    document.getElementById("quoteAuthor").value = defaults.quoteAuthor;
    document.getElementById("bullet1").value = defaults.bullets.personal;
    document.getElementById("bullet2").value = defaults.bullets.professional;
    document.getElementById("bullet3").value = defaults.bullets.academic;
    document.getElementById("bullet4").value = defaults.bullets.primaryComputer;

    // one blank course row
    var courses = document.getElementById("courses");
    courses.innerHTML = "";
    addCourse();

    // Load default image
    var previewWrap = document.getElementById('loadImage');
    if (previewWrap) {
        previewWrap.innerHTML = '<img src="' + defaults.imgFile + '" alt="Picture of me">';
        previewWrap.classList.add('hidden');
    }
}

// Add one course row (Title, Description, Delete)
function addCourse() {
    var courses = document.getElementById("courses");
    var row = document.createElement("div");
    row.className = "course-row";

    row.innerHTML =
        '<div><label>Course Title</label><input type="text" placeholder="e.g., ITIS 3135 – Front end Web Application Development"></div>' +
        '<div><label>Course Description</label><input type="text" placeholder="Why you\'re taking it (short)"></div>' +
        '<div><button type="button" class="deleteCourse">Delete</button></div>';

    row.querySelector(".deleteCourse").addEventListener("click", function () {
        row.remove();
        // Keep at least one row available
        if (!courses.querySelector(".course-row")) addCourse();
    });

    courses.appendChild(row);
}

// Build and display page
function showResult() {
    var name = (document.getElementById("firstName").value + " " + document.getElementById("lastName").value).trim();
    var mascot = (document.getElementById("mascotAdj").value + " " + document.getElementById("mascotAnimal").value).trim();
    var imgUrl = defaults.imgFile; // Default image
    var caption = document.getElementById("caption").value.trim();
    var statement = document.getElementById("personalStmt").value.trim();
    var divider = (document.getElementById("divider").value || "•").trim();
    var quote = (document.getElementById("quote")?.value || "").trim();
    var author = (document.getElementById("quoteAuthor")?.value || "").trim();

    // Prefer uploaded image
    var fileInput = document.getElementById("introImage");
    if (fileInput && fileInput.files && fileInput.files[0]) {
        imgUrl = URL.createObjectURL(fileInput.files[0]);
    }

    // Bullets 
    var personal = (document.getElementById("bullet1")?.value || "").trim();
    var professional = (document.getElementById("bullet2")?.value || "").trim();
    var academic = (document.getElementById("bullet3")?.value || "").trim();
    var primaryComp = (document.getElementById("bullet4")?.value || "").trim();
    var funny = (document.getElementById("bullet6")?.value || "").trim();
    var shareText = (document.getElementById("shareExtra")?.value || "").trim();

    // Courses
    var courseItems = "";
    document.querySelectorAll("#courses .course-row").forEach(function (row) {
        var inputs = row.querySelectorAll("input");
        var title = (inputs[0]?.value || "").trim();
        var desc = (inputs[1]?.value || "").trim();
        if (title) {
            courseItems += '<li><strong>' + title + '</strong>' + (desc ? ': ' + desc : '') + '</li>';
        }
    });
    var courseSublist = courseItems ? '<ul>' + courseItems + '</ul>' : '';

    // HTML output
    var html =
        '<article class="card">' +
        '  <header>' +
        '    <h2>Introduction</h2>' +
        '    <h2>' + name + "'s" + ' ' + divider + ' ' + defaults.mascotAnimal + '</h2>' +  
        '  </header>' +
        '  <div class="hr"></div>' +
        '  <section class="intro">' +
        '    <figure>' +
        '      <img class="result-img" src="' + imgUrl + '" alt="Photo of ' + name + '">' +
        '      <figcaption><em>' + caption + '</em></figcaption>' +
        '    </figure>' +
        '    <p>' + statement + '</p>' +
        '    <ul>' +
        '      <li><strong>Personal Background:</strong> ' + personal + '</li>' +
        '      <li><strong>Professional Background:</strong> ' + professional + '</li>' +
        '      <li><strong>Academic Background:</strong> ' + academic + '</li>' +
        '      <li><strong>Primary Computer:</strong> ' + primaryComp + '</li>' +
        '      <li><strong>Courses I’m Taking, &amp; Why:</strong>' + courseSublist + '</li>' +
        '    </ul>' +
        (quote || author
            ? ('<blockquote>' + (quote || '') + '<br><cite>– ' + (author || '') + '</cite></blockquote>')
            : '') +
        (funny ? '<p><strong>Funny thing?</strong> ' + funny + '</p>' : '') +
        (shareText ? '<p><strong>Anything else?</strong> ' + shareText + '</p>' : '') +
        '  </section>' +
        '  <div class="hr"></div>' +
        '  <p><a href="#" id="resetLink">Reset and fill the form again</a></p>' +
        '</article>';

    document.getElementById("form-wrap").classList.add("hidden");
    var resultWrap = document.getElementById("result-wrap");
    resultWrap.innerHTML = html;
    resultWrap.classList.remove("hidden");

    // Reset link on result
    document.getElementById("resetLink").addEventListener("click", function (e) {
        e.preventDefault();
        resultWrap.classList.add("hidden");
        document.getElementById("form-wrap").classList.remove("hidden");
        document.getElementById("intro-form").reset();
        setDefaults();
        window.scrollTo(0, 0);
    });
}

window.addEventListener("DOMContentLoaded", function () {
    setDefaults();

    document.getElementById("addCourseBtn").addEventListener("click", addCourse);

    document.getElementById("intro-form").addEventListener("submit", function (e) {
        e.preventDefault();
        var form = document.getElementById("intro-form");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        showResult();
    });

    document.getElementById("resetBtn").addEventListener("click", function () {
        setTimeout(setDefaults, 0);
    });

    document.getElementById("clearBtn").addEventListener("click", function () {
        document.querySelectorAll("input[type='text'], input[type='url'], input[type='date'], input[type='number'], textarea").forEach(function (el) {
            el.value = "";
        });
        document.querySelectorAll("input[type='file']").forEach(function (fileInput) {
            fileInput.value = null;
        });

        const courses = document.getElementById("courses");
        if (courses) courses.innerHTML = "";

        const preview = document.getElementById("loadImage");
        if (preview) {
            preview.innerHTML = "";
            preview.classList.add("hidden");
        }
    });
});

