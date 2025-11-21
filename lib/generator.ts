const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateShortCode(length: number = 6) {
  let result = "";
  const max = ALPHABET.length;

  // Use Web Crypto API (works on both server + edge + browser)
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    const idx = array[i] % max;
    result += ALPHABET[idx];
  }

  return result;
}