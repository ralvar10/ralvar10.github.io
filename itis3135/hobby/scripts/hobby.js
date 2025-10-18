
document.addEventListener ('DOMContentLoaded', () => {
    const sections = [...document.querySelectorAll('main > section')];
    const nav = document.getElementById('site-nav');


    function show(id) {
        sections.forEach ((s) => {
            const active = s.id === id;
            s.classList.toggle('active', active);
            s.setAttribute('aria-hidden', active ? 'false' : 'true');
      });

      nav.querySelectorAll('a').forEach ((a) =>
        a.setAttribute('aria-current', a.getAttribute('href') === '#' + id ? 'page' : 'false')
      );
    }

    nav.addEventListener ('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if(!a) {
            return;
        }
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        show(id);
    });

    const initial = (location.hash || '#what').slice(1);
    show(initial);
  });
