// Contact form behavior: intercepts submit, simulates async submission, shows status.


(function () {
    // Grabs the contact form and status message element
    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-status');
    // If there's no form on this page, do nothing
    if (!form) return;

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Give user immediate feedback
        status.textContent = 'Sending…';

        // Collect form data into a plain object (currently not sent anywhere)
        const data = Object.fromEntries(new FormData(form).entries());
        // Demo only: simulate async success

        await new Promise((r) => setTimeout(r, 800));

        //Update the status message and reset the form
        status.textContent = 'Thanks — your message has been queued.';
        form.reset();
    });
})();
