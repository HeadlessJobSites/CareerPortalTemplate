document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
});
