export const deepEqual = (obj1 : any, obj2 : any) => {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const removeArrayIndexFromPropertyPath = (path: string): string => {
  const segments = path.split(".");
  const simplifiedSegments = segments.map((segment) => {
    return isNaN(Number(segment)) ? segment : "";
  });
  const simplifiedPath = simplifiedSegments.join(".").replace(/\.\./g, ".");
  return simplifiedPath;
};


export const convertPatternIntoDate = (dateString: string, format: string): Date => {
  const formatPatterns: { [key: string]: RegExp } = {
      'DD/MM/YYYY': /^(\d{2})\/(\d{2})\/(\d{4})$/,
      'YYYY/MM/DD': /^(\d{4})\/(\d{2})\/(\d{2})$/,
      'MM/DD/YYYY': /^(\d{2})\/(\d{2})\/(\d{4})$/,
      'DD-MM-YYYY': /^(\d{2})-(\d{2})-(\d{4})$/,
      'YYYY-MM-DD': /^(\d{4})-(\d{2})-(\d{2})$/,
      'MM-DD-YYYY': /^(\d{2})-(\d{2})-(\d{4})$/
  };

  const pattern = formatPatterns[format];
  if (!pattern) {
      throw new Error('Unsupported format');
  }

  const match = dateString.match(pattern);
  if (!match) {
      throw new Error('Invalid date string for the provided format');
  }

  const [, part1, part2, part3] = match;

  let year: number, month: number, day: number;

  switch (format) {
      case 'DD/MM/YYYY':
      case 'DD-MM-YYYY':
          day = parseInt(part1, 10);
          month = parseInt(part2, 10) - 1; // Months are zero-indexed
          year = parseInt(part3, 10);
          break;
      case 'YYYY/MM/DD':
      case 'YYYY-MM-DD':
          year = parseInt(part1, 10);
          month = parseInt(part2, 10) - 1; // Months are zero-indexed
          day = parseInt(part3, 10);
          break;
      case 'MM/DD/YYYY':
      case 'MM-DD-YYYY':
          month = parseInt(part1, 10) - 1; // Months are zero-indexed
          day = parseInt(part2, 10);
          year = parseInt(part3, 10);
          break;
      default:
          throw new Error('Unsupported format');
  }

  return new Date(year, month, day);
}
