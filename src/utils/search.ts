export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function searchInString(text: string, query: string): boolean {
  return normalizeString(text).includes(normalizeString(query));
}
