(function () {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-status');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.textContent = 'Sending…';
        const data = Object.fromEntries(new FormData(form).entries());
        // Demo only: simulate async success
        await new Promise(r => setTimeout(r, 800));
        status.textContent = 'Thanks — your message has been queued.';
        form.reset();
    });
})();
