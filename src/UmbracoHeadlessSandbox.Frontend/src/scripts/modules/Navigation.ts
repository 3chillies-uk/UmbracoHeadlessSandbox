
export interface INavigation {
  el: HTMLElement;
  hamburger: HTMLButtonElement | null;
  hamburgerMenu: HTMLButtonElement | null;
  hamburgerMenuShadow: HTMLButtonElement | null;
  hamburgerMenuClose: HTMLButtonElement | null;
  init: () => void;
}

export default function Navigation(this: INavigation, el: HTMLElement) {
  this.el = el;

  this.init = () => {
    this.hamburger = this.el.querySelector('.hamburger');
    if (this.hamburger == null) return;

    this.hamburgerMenu = this.el.querySelector('.hamburger-menu');
    if (this.hamburgerMenu == null) return;

    this.hamburgerMenuShadow = this.el.querySelector('.hamburger-menu-shadow');
    if (this.hamburgerMenuShadow == null) return;

    this.hamburgerMenuClose = this.el.querySelector('.hamburger-menu-close');
    if (this.hamburgerMenuClose == null) return;
 
    if (this.hamburger) handleHamburgerClick();
    if (this.hamburgerMenuClose) handleHamburgerMenuCloseClick();
    if (this.hamburgerMenuShadow) handleHamburgerMenuShadowClick();
  };

  const handleHamburgerClick = () => {
    this.hamburger?.addEventListener('click', () => {
      openMenu();
    });
  };

  const handleHamburgerMenuCloseClick = () => {
    this.hamburgerMenuClose?.addEventListener('click', () => {
      closeMenu();
    });
  };

  const handleHamburgerMenuShadowClick = () => {
    this.hamburgerMenuShadow?.addEventListener('click', () => {
      closeMenu();
    });
  };

  const openMenu = () => {
    this.hamburgerMenu?.classList.remove('hidden');
    this.hamburgerMenu?.classList.add('open');
    this.hamburgerMenuShadow?.classList.remove('hidden');
  }

  const closeMenu = () => {
    this.hamburgerMenu?.classList.add('hidden');
    this.hamburgerMenu?.classList.remove('open');
    this.hamburgerMenuShadow?.classList.add('hidden');
  }
}