const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateShortCode(length: number = 6): string {
  let result = "";
  const max = ALPHABET.length;

  for (let i = 0; i < length; i++) {
    const idx = crypto.randomInt(0, max);
    result += ALPHABET[idx];
  }

  return result;
}

// Generate between 6–8 chars
export function generateRandomCode(): string {
  const length = crypto.randomInt(6, 9); // 6,7,8
  return generateShortCode(length);
}