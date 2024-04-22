export default function toPascalCase(string: string) {
    return string
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
        return word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
  