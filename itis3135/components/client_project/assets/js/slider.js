(function () {
    const slider = document.querySelector('.ba-range');
    const after = document.querySelector('.ba-after');
    if (!slider || !after) return;

    function setClip(val) {
        const pct = parseInt(val, 10);
        after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }
    setClip(slider.value);
    slider.addEventListener('input', e => setClip(e.target.value));

    const btn = document.querySelector('.add-to-moodboard');
    if (btn) {
        btn.addEventListener('click', () => {
            const src = btn.getAttribute('data-image');
            const list = JSON.parse(localStorage.getItem('moodboard') || '[]');
            list.push(src);
            localStorage.setItem('moodboard', JSON.stringify(list.slice(-12)));
            btn.textContent = 'Added to Moodboard';
            setTimeout(() => { btn.textContent = 'Add to Moodboard'; }, 1400);
        });
    }
})();
