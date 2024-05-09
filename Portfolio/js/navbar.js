const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
        nav.classList.add('active');
    } else {
        nav.classList.remove('active');
    }
});
