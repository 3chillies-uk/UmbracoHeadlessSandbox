export interface IAccordion {
  el: HTMLElement;
  accordion: HTMLElement | null;
  init: () => void;
}

export default function Accordion(this: IAccordion, el: HTMLElement) {
  this.el = el;

  this.init = () => {
    this.accordion = this.el.querySelector('.accordion');
    if (this.accordion) onButtonClick();
  };

  const onButtonClick = () => {

    this.accordion
      .querySelectorAll("button.accordion-trigger")?.forEach(item => {

        item.addEventListener('click', () => {

          const index = item.getAttribute('aria-controls');

          const expanded = (item.getAttribute('aria-expanded') !== 'true');

          item.setAttribute('aria-expanded', `${expanded.toString()}`);

          disableAllTabs(index);
          toggleIcons(item);
          toggleContent(item, index)
        });
      });
  };

  const toggleContent = (item: Element, index: string) => {
    const content = this.accordion.querySelector("#" + index);
    if (content) {
      if (content.classList.contains("open")) {
        content.classList.remove("open");
        content.classList.add("close");
      } else {
        content.classList.add("open");
        content.classList.remove("close");
      }
    }
  };

  const toggleIcons = (item: Element) => {
    const plus = item.querySelector(".accordion-plus");
    plus.classList.toggle('hidden');
    plus.classList.toggle('inline-flex');

    const minus = item.querySelector(".accordion-minus");
    minus.classList.toggle('inline-flex');
    minus.classList.toggle('hidden');

  };

  const disableIcons = (item: Element) => {

    const minus = item.querySelector(".accordion-minus");
    const plus = item.querySelector(".accordion-plus");

    minus.classList.add('hidden');
    minus.classList.remove('inline-flex');
    plus.classList.add('inline-flex');
    plus.classList.remove('hidden');

  };

  const disableAllTabs = (excluding: string) => {
    this.accordion
      .querySelectorAll("button.accordion-trigger")?.forEach(item => {
        const index = item.getAttribute('aria-controls');

        if (index !== excluding) {
          const content = this.accordion.querySelector("#" + index);
          item.setAttribute('aria-expanded', 'false');
          disableIcons(item);
          if (content) {
            content.classList.add("close");
            content.classList.remove("open");
          }
        }
      });
  }
}
