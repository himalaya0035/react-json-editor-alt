import { DiffKeyValues } from "../types/JsonEditor.types";

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

export const deepCopy = (obj:any) => JSON.parse(JSON.stringify(obj))

export const removeArrayIndexFromPropertyPath = (path: string): string => {
  const segments = path.split(".");
  const simplifiedSegments = segments.map((segment) => {
    return isNaN(Number(segment)) ? segment : "";
  });
  const simplifiedPath = simplifiedSegments.join(".").replace(/\.\./g, ".");
  return simplifiedPath;
};


export const convertPatternIntoDate = (dateString: string, format: string): Date | null => {
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
    console.warn('Unsupported format. Returning null.');
    return null;
  }

  const match = dateString.match(pattern);
  if (!match) {
    console.warn('Invalid date string for the provided format. Returning null.');
    return null;
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
        console.warn('Unsupported format. Returning null.');
        return null;
  }

  return new Date(year, month, day);
}

export const convertDateIntoPattern = (date: Date, format: string): string | null => {
  const padZero = (num: number): string => num.toString().padStart(2, '0'); 

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();

  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'YYYY/MM/DD':
      return `${year}/${month}/${day}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'DD-MM-YYYY':
      return `${day}-${month}-${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM-DD-YYYY':
      return `${month}-${day}-${year}`;
    default:
      console.warn('Unsupported format. Returning null');
      return null;
  }
};


export const updateValueByPath = (obj: any, path: string, value: any): void => {
  const keys: string[] = path.split(".");

  let current: any = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    let key: string | number = keys[i];
    if (Array.isArray(current) && !isNaN(Number(key))) {
      key = parseInt(key, 10);
    }
    if (current[key] === undefined) {
      return;
    }
    current = current[key];
  }
  if (current) {
    current[keys[keys.length - 1]] = value;
  }
};

export const getValueByPath = (obj: any, path: string): any => {
  const keys: string[] = path.split(".");

  let current: any = obj;
  for (let key of keys) {
    if (Array.isArray(current) && !isNaN(Number(key))) {
      current = current[parseInt(key, 10)];
    } else {
      current = current[key];
    }
    if (current === undefined) {
      return undefined;
    }
  }

  return current;
};

export const findJsonDiff = (
  obj1: Record<string,any>,
  obj2: Record<string,any>,
  path: string = '',
  diffKeyValues: DiffKeyValues = {}
): DiffKeyValues  => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = Array.from(new Set([...keys1, ...keys2]));

  allKeys.forEach((key) => {
    const newPath = path ? `${path}.${key}` : key;

    if (obj1[key] && typeof obj1[key] === 'object' && obj2[key] && typeof obj2[key] === 'object') {
      findJsonDiff(obj1[key], obj2[key], newPath, diffKeyValues);
    } else if (obj1[key] !== obj2[key]) {
      diffKeyValues[newPath] = { initial: obj1[key], updated: obj2[key] };
    }
  });

  return diffKeyValues;
}


export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};