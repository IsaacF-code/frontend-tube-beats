export function isYoutubeUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === "www.youtube.com" || 
             parsedUrl.hostname === "youtube.com" ||
             parsedUrl.hostname === "youtu.be";
    } catch {
      return false;
    }
  }