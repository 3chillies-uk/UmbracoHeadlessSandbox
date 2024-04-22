export interface ITabbedContent {
  el: HTMLElement;
  tabContainer: HTMLElement | null;
  tabContentContainer: HTMLElement | null;
  init: () => void;
}

export default function TabbedContent(this: ITabbedContent, el: HTMLElement) {
  this.el = el;

  this.init = () => {
    this.tabContainer = this.el.querySelector('.tab-container');
    if (this.tabContainer == null) return

    this.tabContentContainer = this.el.querySelector('.tab-panel-container');
    if (this.tabContentContainer == null) return

    if (this.tabContainer) handleTabClick();
    if (this.tabContentContainer) handleTabContentClick();
  };

  const handleTabClick = () => {
    this.tabContainer.querySelectorAll(".tab")?.forEach(tab => {
      tab.addEventListener('click', () => {
        const index = tab.getAttribute('aria-controls');

        deactiveTabs();
        deactivateTabsSmall();
        setActiveTab(index);
        setActiveTabSmall(index);
        deactiveContent();
        switchContent(index);
      })
    });
  };

  const handleTabContentClick = () => {
    this.tabContentContainer.querySelectorAll(".tab-small")?.forEach(tab => {
      tab.addEventListener('click', () => {
        const index = tab.getAttribute('aria-controls');

        deactiveTabs();
        deactivateTabsSmall();
        setActiveTab(index);
        setActiveTabSmall(index);
        deactiveContent();
        switchContent(index);
      })
    });
  };

  const setActiveTab = (index: string) => {
    const tab = this.tabContainer.querySelector('.tab[aria-controls="' + index + '"]');
    if (tab) {
      tab.classList.add("active");
      tab.setAttribute('aria-selected', 'true');
    }
  };

  const setActiveTabSmall = (index: string) => {
    const tab = this.tabContentContainer.querySelector('.tab-small[aria-controls="' + index + '"]');
    if (tab) {
      tab.classList.add("active");
      tab.setAttribute('aria-selected', 'true');
    }

  };

  const deactiveTabs = () => {
    this.tabContainer.querySelectorAll(".tab")?.forEach(tab => {
      tab.classList.remove("active");
      tab.setAttribute('aria-selected', 'false');
    });
  };

  const deactivateTabsSmall = () => {
    this.tabContentContainer.querySelectorAll(".tab-small")?.forEach(tab => {
      tab.classList.remove("active");
      tab.setAttribute('aria-selected', 'false');
    });
  };

  const deactiveContent = () => {
    this.tabContentContainer.querySelectorAll(".tab-panel")?.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
  };

  const switchContent = (active: string) => {
    this.tabContentContainer.querySelectorAll(".tab-panel")?.forEach((tabContent) => {
      if ((tabContent as HTMLElement).id == active) {
        tabContent.classList.add("active");
      }
    });
  };
}