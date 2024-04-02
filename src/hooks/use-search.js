import { useMemo } from "react";
import { editDistance } from "../utils/string-utils.js";
import { clamp } from "../utils/math-utils.js";

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
    KEYWORD_EXACT: 10,
    KEYWORD_CLOSE: 7,
    KEYWORD_STARTS_WITH: 5,
    TAG_EXACT: 3,
    TAG_CLOSE: 2,
    TAG_STARTS_WITH: 1,
    MULTI_WORD_TAG_EXACT: 5,
    MULTI_WORD_TAG_CLOSE: 4,
    MULTI_WORD_TAG_STARTS_WITH: 3,
  };

  let rank = 0;

  for (let i = 0; i < parsed.length; i++) {
    const word = parsed[i];
    const previousRank = rank;

    // If the previous word in the user input didn't match then we can skip this node as we don't want partial matches. This avoids matching things like "animal science" when the user types "computer science".
    if (rank === 0 && i !== 0) {
      return 0;
    }

    const keywords = node.keywords;

    for (let j = 0; j < keywords.length; j++) {
      const keyword = keywords[j];
      // If the keyword and the word are the same.
      // We test the length first to avoid the more expensive string comparison as it's not necessary if the lengths are different.
      if (keyword.length === word.length && keyword === word) {
        // We check how close the keyword is to the word in the user input. This helps in situations where the user may have typed something like "biology", and we have two results "biology" and "animal biology". We want to rank "biology" higher than "animal biology" in this case as it's a closer match.
        rank += RANKS.KEYWORD_EXACT - Math.min(Math.abs(i - j), 2);
        continue;
      }

      // If the keyword and the word are within 2 characters of each other and have an edit distance of 2 or less (i.e. 2 or fewer changes), add 7 to the rank. This is to account for typos and minor spelling mistakes. We test the length difference first to avoid the more expensive editDistance function as it's not necessary if the length difference is too large.
      if (Math.abs(keyword.length - word.length) < 2 && editDistance(keyword, word) < 2) {
        rank += RANKS.TAG_CLOSE;
        continue;
      }

      // If the keyword starts with the word. This is to account for the user typing the beginning of a word.
      if (keyword.startsWith(word)) {
        rank += RANKS.KEYWORD_STARTS_WITH;
      }
    }

    for (const tag of node.tags) {
      if (tag.length === word.length && tag === word) {
        rank += RANKS.TAG_EXACT;
        continue;
      }

      if (Math.abs(tag.length - word.length) < 2 && editDistance(tag, word) < 2) {
        rank += RANKS.TAG_CLOSE;
        continue;
      }

      if (tag.length >= word.length && tag.startsWith(word)) {
        rank += RANKS.TAG_STARTS_WITH;
        continue;
      }

      // Wildcard tags
      if (tag.length - 1 < word.length && tag.endsWith("*") && word.startsWith(tag.slice(0, -1))) {
        rank += RANKS.TAG_EXACT;
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
  const processed = data.map(node => ({
    data: node,
    keywords: parse(node.title),
    tags: node.tags,
  }));

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
