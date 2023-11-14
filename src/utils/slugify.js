export function slugify(str) {
  return str
    .toLowerCase()                    // Convert to lowercase
    .replace(/\s+/g, '-')             // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')       // Remove non-alphanumeric or non-hyphen characters
    .replace(/^-+|-+$/g, '');         // Trim hyphens from start and end
}