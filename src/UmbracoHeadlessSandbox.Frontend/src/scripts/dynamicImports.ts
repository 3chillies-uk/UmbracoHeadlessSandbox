import toPascalCase from './helpers/toPascalCase';

export default function dynamicImports() {
  const moduleNames = [] as string[];
  const jsAttributedElements = document.querySelectorAll(`[data-js]`);

  if (jsAttributedElements.length < 1) return;

  jsAttributedElements.forEach((el) => {
    const attributeValue = el.getAttribute('data-js') as string;
    const splitValue = attributeValue.split(' ') as string[];

    splitValue.forEach((value) => {
      if (moduleNames.includes(value) === false && value) {
        moduleNames.push(value);
      }
    });
  });

  if (moduleNames.length < 1) return;

  moduleNames.forEach((moduleName) => {
    const elements = [...jsAttributedElements].filter((el) =>
      el.getAttribute('data-js')?.includes(moduleName),
    ) as HTMLElement[];

    if (elements.length < 1) return;

    importModule(moduleName, elements);
  });
}

export async function importModule(
  moduleName: string,
  elements: HTMLElement[],
) {
  await import(`./modules/${moduleName}.ts`).then((Module) => {
    const instances = new Array();
  
    elements.forEach((element: Element, index: number) => {
      element.setAttribute(moduleName + '-index', index.toString());
      const instance = new Module.default(element, index);
      instance.init();
      instances.push(instance);
    });

    if (window.modules !== undefined)
      window.modules['instancesOf' + toPascalCase(moduleName)] = instances;

    return;
  });
}
