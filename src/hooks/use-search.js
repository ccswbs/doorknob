import { useMemo } from "react";
import { editDistance, strncmp } from "../utils/string-utils.js";
import { stemmer } from "stemmer";

const parse = input =>
  input
    .toLowerCase()
    // Remove leading and trailing whitespace
    .trim()
    // Remove all non-alphabetic and non-whitespace characters
    .replace(/[^a-zA-Z\s]/g, "")
    // Split on whitespace and some common stop words
    .split(/\s+|\band\b|\bof\b|\bin\b/g)
    // Remove empty strings
    .filter(word => word.length > 0);

const rank = (node, parsed) => {
  const RANKS = {
    EXACT: 10,
    CLOSE: 8,
    MATCHING_STEM: 6,
    STARTS_WITH: 4,
  };

  const ranker = (a, b) => {
    // If the keyword and the word are the same.
    // We test the length first to avoid the more expensive string comparison as it's not necessary if the lengths are different.
    if (a.length === b.length && a === b) {
      // We check how close the keyword is to the word in the user input. This helps in situations where the user may have typed something like "biology", and we have two results "biology" and "animal biology". We want to rank "biology" higher than "animal biology" in this case as it's a closer match.
      return RANKS.EXACT;
    }

    // If the keyword and the word are within 2 characters of each other and have an edit distance of 2 or less (i.e. 2 or fewer changes), add 7 to the rank. This is to account for typos and minor spelling mistakes. We test the length difference first to avoid the more expensive editDistance function as it's not necessary if the length difference is too large.
    if (Math.abs(a.length - b.length) < 2 && editDistance(a, b) < 2) {
      return RANKS.CLOSE;
    }

    // Stemming (the process of finding the root of a word ex. computer -> comput) can help with matching words that are similar but not exactly the same. For example, "computer" and "computing" are related words, and we may want to match them. We use the Porter stemming algorithm to achieve this. Since stemming is an expensive operation, we only do it if the first 3 characters of the keyword and the word are the same as words that don't match at least the first 3 characters will not have the same stem.
    if (strncmp(a, b, 3) && stemmer(a) === stemmer(b)) {
      return RANKS.MATCHING_STEM;
    }

    // If the keyword starts with the word. This is to account for the user typing the beginning of a word.
    if (a.startsWith(b)) {
      return RANKS.STARTS_WITH;
    }

    return 0;
  };

  let rank = 0;

  for (let i = 0; i < parsed.length; i++) {
    const word = parsed[i];
    const previousRank = rank;

    // If the previous word in the user input didn't match then we can skip this node as we don't want partial matches. This avoids matching things like "animal science" when the user types "computer science".
    if (rank === 0 && i !== 0) {
      return 0;
    }

    for (let j = 0; j < node.keywords.length; j++) {
      // Get the rank but subtract the distance between the keyword and the word in the user input. This is to show results that are closer to the word in the user input first. For example, if the user types "Economics" we want to show "Economics" before "Business Economics" even though "Business Economics" has the same rank.
      rank += Math.max(ranker(node.keywords[j], word) - Math.min(Math.abs(i - j), 1), 0);
    }

    // If the rank has changed, that means the word was found in the keywords, and we don't need to check the tags.
    if (previousRank !== rank) {
      continue;
    }

    if (node.tags) {
      for (const tag of node.tags) {
        if (Array.isArray(tag)) {
          // Process multi-word tags here
        } else {
          const partialRank = ranker(tag, word);

          if (partialRank > 0) {
            // Tags are less important than keywords, so we divide the rank by 2 to give them less weight.
            rank += partialRank / 2;
            continue;
          }

          // Wildcard tags
          if (tag.length - 1 < word.length && tag.endsWith("*") && word.startsWith(tag.slice(0, -1))) {
            rank += RANKS.EXACT / 2;
          }
        }
      }
    }

    // If after processing all the keywords and tags the rank hasn't changed, that means the word wasn't found in the keywords or tags, and we can skip this node. This avoids matching things like "animal science" when the user types "science computer".
    if (previousRank === rank) {
      return 0;
    }
  }

  return rank;
};

export function defaultSearchFunc(data) {
  const processed = data.map(node => {
    return {
      data: node,
      keywords: parse(node.title),
      tags: node.tags.map(tag => (tag.includes(" ") ? tag.split(" ") : tag)),
    };
  });

  return input => {
    const parsed = parse(input);

    return processed
      ?.map(node => ({ ...node, rank: rank(node, parsed) }))
      ?.filter(node => node.rank > 0)
      ?.sort((a, b) => {
        if (a.rank > b.rank) return -1;
        if (a.rank < b.rank) return 1;

        return a?.title?.localeCompare(b?.title);
      })
      ?.map(node => node.data);
  };
}

export const useSearch = (data, input, searchFunc = defaultSearchFunc) => {
  if (!Array.isArray(data)) {
    throw new TypeError("data must be an array");
  }

  if (typeof searchFunc !== "function") {
    throw new TypeError(
      "searchFunc must be a curried function matching the signature: (data: any[]) => (input: string) => any[]",
    );
  }

  // Memoize the partial evaluation of the search function to avoid re-evaluating it on every render.
  const search = useMemo(() => searchFunc(data), [searchFunc, data]);

  return useMemo(() => {
    if (!input) return data;

    return search(input);
  }, [input, data, search]);
};
