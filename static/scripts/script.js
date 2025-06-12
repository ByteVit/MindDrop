function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : "flex";
}
(function hamburgerClick(){
    const hamburger = document.querySelector(".hamburger");
    hamburger.addEventListener('click', toggleMenu);
})();