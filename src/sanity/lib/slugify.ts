export function turkishSlugify(input: string) {
  const turkishChars: { [key: string]: string } = {
    ğ: 'g',
    Ğ: 'g',
    ü: 'u',
    Ü: 'u',
    ş: 's',
    Ş: 's',
    ı: 'i',
    İ: 'i',
    ö: 'o',
    Ö: 'o',
    ç: 'c',
    Ç: 'c',
  };

  return input
    .toLowerCase()
    .trim()
    .split('')
    .map((char) => turkishChars[char] || char)
    .join('')
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing -
}
