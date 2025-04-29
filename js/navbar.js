export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (!navbar || !navbarToggler || !navbarCollapse) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 56) {
      navbar.classList.add('bg-dark');
    } else {
      navbar.classList.remove('bg-dark');
    }
  });

  navbarToggler.addEventListener('click', () => {
    const shouldShow = !navbarCollapse.classList.contains('show');
    if (shouldShow) {
      navbar.classList.add('bg-dark');
    } else if (window.scrollY < 56) {
      navbar.classList.remove('bg-dark');
    }
  });
}
