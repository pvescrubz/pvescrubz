function burgerMenu() {
    let menu = document.querySelector('.burger-menu');
    let burgerButton = menu.querySelector('.burger-menu_button', '.burger-menu_lines');
    let links = menu.querySelectorAll('.burger-menu_link');
    let overlay = menu.querySelector('.burger-menu_overlay');

    burgerButton.onclick = (e) => {
      e.preventDefault();
      toggleMenu();
    };

    links.forEach( element => {
      element.onclick = () => toggleMenu();
    });
    overlay.onclick = () => toggleMenu();

    function toggleMenu(){
      menu.classList.toggle('burger-menu_active');
    }
  }

  burgerMenu();
