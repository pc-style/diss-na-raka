export function parseYouTubeId(url: string | undefined | null): string | null {
  if (!url) return null;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
  const idLike = /^[a-zA-Z0-9_-]{11}$/;

  if (host === "youtu.be") {
    const id = parsed.pathname.slice(1).split("/")[0];
    return idLike.test(id) ? id : null;
  }

  if (
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "youtube-nocookie.com"
  ) {
    if (parsed.pathname === "/watch") {
      const id = parsed.searchParams.get("v") ?? "";
      return idLike.test(id) ? id : null;
    }
    const segments = parsed.pathname.split("/").filter(Boolean);
    if (segments.length >= 2) {
      const [first, second] = segments;
      if (first === "shorts" || first === "embed" || first === "live") {
        return idLike.test(second) ? second : null;
      }
    }
  }

  return null;
}

export function youTubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`;
}
