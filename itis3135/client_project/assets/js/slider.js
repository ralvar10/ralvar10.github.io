// Before/After slide logic for color-graded photo
// Optional add to moodboard button functionality that ties into moodboard.js

(function () {
    // range input that controls how much of the "after" image is visible
    const slider = document.querySelector('.ba-range');
    // element container for the "after" image that we will clip
    const after = document.querySelector('.ba-after');

    /// if the required elements aren't present, do nothing
    if (!slider || !after) return;

    // helper function to update the clip path based on slider value
    function setClip(val) {
        const pct = parseInt(val, 10);
        // Clip the after image from the right based on slider percentage
        after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }

    // intialize and set up event listener
    setClip(slider.value);

    //update the "after" image clip as the slider moves
    slider.addEventListener('input', e => setClip(e.target.value));


    // this is optional, button adds the current image to the moodboard selection
    const btn = document.querySelector('.add-to-moodboard');
    if (btn) {
        btn.addEventListener('click', () => {
            // get the image source from data-image attribute
            const src = btn.getAttribute('data-image');
            // load existing list from localStorage, add this one, and save it back
            const list = JSON.parse(localStorage.getItem('moodboard') || '[]');
            list.push(src);
            localStorage.setItem('moodboard', JSON.stringify(list.slice(-12)));
            // give user feedback
            btn.textContent = 'Added to Moodboard';
            setTimeout(() => { btn.textContent = 'Add to Moodboard'; }, 1400);
        });
    }
})();
