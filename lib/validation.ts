export function isValidShortCode(code: string): boolean {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
  }
  
  export function isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }
  