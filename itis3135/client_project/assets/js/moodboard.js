// Moodboard builder: draws selected images onto canvas, manages palette and buttons.

(function () {

    // Get the canvas element that will display the moodboard
    const canvas = document.getElementById('board');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Define a grid layout for images (3x2) and grid with padding between cells
    const gridCols = 3, gridRows = 2, pad = 20;
    const cellW = (W - pad * (gridCols + 1)) / gridCols;
    const cellH = (H - pad * (gridRows + 1)) / gridRows;

    // Key for localStorage for moodboard image selection
    const STORAGE_KEY = 'moodboard';


    // Fill the background and draw grid outline rectangles
    function drawBackground() {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = '#333';
        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
                const x = pad + c * (cellW + pad);
                const y = pad + r * (cellH + pad);
                ctx.strokeRect(x, y, cellW, cellH);
            }
        }
    }

    // Load selected images from localStorage
    function loadSelected() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }

    // Draw a list of image URLs onto the canvas grid, scaled
    function drawImages(list) {
        const imgs = [];
        let loaded = 0;
        const limit = Math.min(list.length, gridCols * gridRows);

        // if no images are selected, just draw empty background
        if (limit === 0) {
            drawBackground();
            return;
        }

        // Load each image and track when they all are loaded
        list.slice(0, limit).forEach((src, i) => {
            const img = new Image();
            img.onload = () => {
                imgs[i] = img;
                loaded++;

                // once all images are loaded, draw them onto the canvas
                if (loaded === limit) {
                    drawBackground();
                    imgs.forEach((im, idx) => {
                        if (!im) return;
                        // Compute row/column for this index
                        const r = Math.floor(idx / gridCols);
                        const c = idx % gridCols;

                        const x = pad + c * (cellW + pad);
                        const y = pad + r * (cellH + pad);
                        // Scale image to fit cell while preserving aspect ratio
                        const scale = Math.max(cellW / im.width, cellH / im.height);
                        const w = im.width * scale;
                        const h = im.height * scale;
                        const dx = x + (cellW - w) / 2;
                        const dy = y + (cellH - h) / 2;

                        // Draw the image centered in the cell
                        ctx.drawImage(im, dx, dy, w, h);
                    });
                }
            };
            img.src = src; // start loading
        });
    }

    // Refresh the moodboard display
    function refresh() {
        const list = loadSelected();
        drawImages(list);
    }

    // Palette setup

    // this grid holds all the clickable thumbnails that users can add to their moodboard
    const grid = document.querySelector('.palette-grid');
    if (grid) {
        const thumbs = Array.from(grid.querySelectorAll('img'));

        // Randomize order using fisher-yates shuffle
        for (let i = thumbs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [thumbs[i], thumbs[j]] = [thumbs[j], thumbs[i]];
        }

        // Clear and re-append in shuffled order
        grid.innerHTML = '';

        thumbs.forEach(img => {
            // store the original src in data-src if not already set (we can reuse it later if need be)
           
            if (!img.dataset.src) {
                img.dataset.src = img.getAttribute('src');
            }

            // clicking an image toggles its selected state
            img.addEventListener('click', () => {
                img.classList.toggle('selected');
            });

            grid.appendChild(img);
        });
    }

    // ---- Buttons ----
    const addBtn = document.getElementById('add-selected');
    const clearBtn = document.getElementById('clear-board');
    const downloadBtn = document.getElementById('download-board');

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            // get all images that are selected
            const selected = Array
                .from(document.querySelectorAll('.palette-grid img.selected'))
                .map(el => el.dataset.src || el.getAttribute('src'));

            if (selected.length === 0) return;

            const existing = loadSelected();
            const updated = existing.concat(selected).slice(-gridCols * gridRows); // last 6
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

            // clear selection
            document.querySelectorAll('.palette-grid img').forEach(el => {
                el.classList.remove('selected');
            });
            // refresh the moodboard display
            refresh();
        });
    }

    // clear button: removes the saved moodboard images and refreshes
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            localStorage.removeItem(STORAGE_KEY);
            refresh();
        });
    }

    // download button: saves the canvas as a PNG file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const a = document.createElement('a');
            a.download = 'moodboard.png';
            a.href = canvas.toDataURL('image/png'); // convert canvas to PNG data URL
            a.click(); // trigger download
        });
    }

    // initial render when the page loads
    refresh();
})();
