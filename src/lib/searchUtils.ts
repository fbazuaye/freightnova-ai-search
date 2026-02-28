const FILLER_WORDS = new Set([
  "track", "tracking", "container", "containers", "bill", "bills", "lading",
  "retrieve", "show", "find", "get", "search", "booking", "bookings",
  "for", "the", "a", "an", "my", "me", "of", "cargo", "space", "shipment",
  "shipments", "document", "documents", "bl", "b/l", "where", "is", "what",
  "status", "check", "look", "up", "lookup", "please", "can", "you",
  "i", "want", "to", "see", "view", "display", "all", "list",
  "confirmation", "confirmations", "number", "no", "ref", "reference"
]);

export function extractSearchTerms(query: string): string[] {
  if (!query.trim()) return [];
  const words = query.toLowerCase().split(/\s+/);
  const terms = words.filter(w => !FILLER_WORDS.has(w) && w.length > 1);
  return terms;
}

export function matchesSearch(searchTerms: string[], ...fields: string[]): boolean {
  if (searchTerms.length === 0) return true;
  const combined = fields.join(" ").toLowerCase();
  return searchTerms.every(term => combined.includes(term));
}
