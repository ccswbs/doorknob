// A function to compute the Levenshtein distance of two strings (useful for fuzzy string matching)
export const editDistance = (a, b) => {
  if (typeof a != "string" || typeof b != "string") return Infinity

  let distances = []

  for (let i = 0; i <= a.length; i++) {
    distances[i] = []

    for (let j = 0; j <= b.length; j++) {
      if (Math.min(i, j) === 0) {
        distances[i][j] = Math.max(i, j)
      } else {
        if (a.charAt(i - 1) !== b.charAt(j - 1)) {
          distances[i][j] = Math.min(distances[i - 1][j] + 1, distances[i][j - 1] + 1, distances[i - 1][j - 1] + 1)
        } else {
          distances[i][j] = Math.min(distances[i - 1][j] + 1, distances[i][j - 1] + 1, distances[i - 1][j - 1])
        }
      }
    }
  }

  return distances[a.length][b.length]
}