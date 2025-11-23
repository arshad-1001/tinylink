// URL validation
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Shortcode validation: 6-8 alphanumeric
export function validateShortCode(code: string): boolean {
  const regex = /^[A-Za-z0-9]{6,8}$/;
  return regex.test(code);
}