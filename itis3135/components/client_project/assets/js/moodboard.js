(function () {
    const canvas = document.getElementById('board');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    const gridCols = 3, gridRows = 2, pad = 20;
    const cellW = (W - pad * (gridCols + 1)) / gridCols;
    const cellH = (H - pad * (gridRows + 1)) / gridRows;

    const STORAGE_KEY = 'moodboard';

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

    function loadSelected() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }

    function drawImages(list) {
        const imgs = [];
        let loaded = 0;
        const limit = Math.min(list.length, gridCols * gridRows);

        if (limit === 0) {
            drawBackground();
            return;
        }

        list.slice(0, limit).forEach((src, i) => {
            const img = new Image();
            img.onload = () => {
                imgs[i] = img;
                loaded++;
                if (loaded === limit) {
                    drawBackground();
                    imgs.forEach((im, idx) => {
                        if (!im) return;
                        const r = Math.floor(idx / gridCols);
                        const c = idx % gridCols;
                        const x = pad + c * (cellW + pad);
                        const y = pad + r * (cellH + pad);

                        const scale = Math.max(cellW / im.width, cellH / im.height);
                        const w = im.width * scale;
                        const h = im.height * scale;
                        const dx = x + (cellW - w) / 2;
                        const dy = y + (cellH - h) / 2;

                        ctx.drawImage(im, dx, dy, w, h);
                    });
                }
            };
            img.src = src;
        });
    }

    function refresh() {
        const list = loadSelected();
        drawImages(list);
    }

    // Palette setup
    const grid = document.querySelector('.palette-grid');
    if (grid) {
        const thumbs = Array.from(grid.querySelectorAll('img'));

        // Randomize order
        for (let i = thumbs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [thumbs[i], thumbs[j]] = [thumbs[j], thumbs[i]];
        }

        // Clear and re-append in shuffled order
        grid.innerHTML = '';

        thumbs.forEach(img => {
           
            if (!img.dataset.src) {
                img.dataset.src = img.getAttribute('src');
            }

            
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
            const selected = Array
                .from(document.querySelectorAll('.palette-grid img.selected'))
                .map(el => el.dataset.src || el.getAttribute('src'));

            if (selected.length === 0) return;

            const existing = loadSelected();
            const updated = existing.concat(selected).slice(-gridCols * gridRows); // last 6
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

            document.querySelectorAll('.palette-grid img').forEach(el => {
                el.classList.remove('selected');
            });

            refresh();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            localStorage.removeItem(STORAGE_KEY);
            refresh();
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const a = document.createElement('a');
            a.download = 'moodboard.png';
            a.href = canvas.toDataURL('image/png');
            a.click();
        });
    }

    // draw
    refresh();
})();
