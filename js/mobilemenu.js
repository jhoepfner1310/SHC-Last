document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector(".mobile-menu-full");
    const menuButton = document.querySelector(".hamburger");
    const menuLinks = mobileMenu.querySelectorAll('a');
  
    let buttonClicked = false;
  
    menuButton.addEventListener('click', () => {

      if (!buttonClicked) {
        mobileMenu.style.opacity = "1";
        mobileMenu.style.zIndex = "500";
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');
      } else {
        mobileMenu.style.opacity = "0";
        mobileMenu.style.zIndex = "-100";
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
      }
      buttonClicked = !buttonClicked;
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.style.opacity = "0";
          mobileMenu.style.zIndex = "-100";
          document.body.classList.remove('no-scroll');
          document.documentElement.classList.remove('no-scroll');
          buttonClicked = false;
        });
      });
  });
  