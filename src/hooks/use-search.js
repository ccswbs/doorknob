import { useMemo } from "react";
import { editDistance } from "../utils/editDistance.js";

export class BasicSearcher {
  static parse(input) {
    return (
      input
        .toLowerCase()
        // Remove leading and trailing whitespace
        .trim()
        // Remove all non-alphabetic and non-whitespace characters
        .replace(/[^a-zA-Z\s]/g, "")
        // Split on whitespace and "and"
        .split(/\s+|\band\b|\bof\b|\bin\b/g)
        // Remove empty strings
        .filter(word => word.length > 0)
    );
  }
  static process(data) {
    return {
      data,
      keywords: BasicSearcher.parse(data.title),
      tags: data.tags ?? [],
    };
  }
  static rank(node, parsed) {
    let rank = 0;

    for (const word of parsed) {
      for (const keyword of node.keywords) {

        // If the keyword and the word are the same, add 10 to the rank.
        // We test the length first to avoid the more expensive string comparison as it's not necessary if the lengths are different.
        if (keyword.length === word.length && keyword === word) {
          rank += 10;
          continue;
        }

        // If the keyword and the word are within 2 characters of each other and have an edit distance of 2 or less (i.e. 2 or fewer changes), add 7 to the rank.
        // This is to account for typos and minor spelling mistakes.
        // We test the length difference first to avoid the more expensive editDistance function as it's not necessary if the length difference is too large.
        if (Math.abs(keyword.length - word.length) <= 2 && editDistance(keyword, word) <= 2) {
          rank += 7;
          continue;
        }

        // If the keyword starts with the word, add 5 to the rank.
        // This is to account for the user typing the beginning of a word.
        if (keyword.startsWith(word)) {
          rank += 5;
        }
      }

      for (const tag of node.tags) {
        if (tag.length === word.length && tag === word) {
          rank += 3;
          continue;
        }

        if (Math.abs(tag.length - word.length) <= 2 && editDistance(tag, word) <= 2) {
          rank += 2;
          continue;
        }

        if (tag.startsWith(word)) {
          rank += 1;
        }
      }
    }

    return rank;
  }
  static compare(a, b) {
    return a?.title?.localeCompare(b?.title);
  }
}

export const useSearch = (data, input, Searcher = BasicSearcher) => {
  if (!Array.isArray(data)) {
    throw new TypeError("data must be an array");
  }

  if (Searcher !== BasicSearcher && !(Searcher.prototype instanceof BasicSearcher)) {
    throw new TypeError("Searcher must be a class that extends BasicSearcher or BasicSearcher itself.");
  }

  // Process the data once and store it in a memoized variable, so it doesn't have to be processed every time the input changes.
  const processed = useMemo(() => data.map(Searcher.process), [data, Searcher.process]);

  return useMemo(() => {
    if (!input) return data;

    return (
      processed
        // Add the rank based on the input and the Searcher's rank function to the processed data node.
        ?.map(node => ({ ...node, rank: Searcher.rank(node, Searcher.parse(input)) }))
        // Remove nodes with a rank of 0 or lower (i.e. no matches)
        ?.filter(node => node.rank > 0)
        // Sort by rank first, then by whatever the Searcher's compare function is
        ?.sort((a, b) => {
          if (a.rank > b.rank) return -1;
          if (a.rank < b.rank) return 1;

          return Searcher.compare(a.data, b.data);
        })
        // Map the array of objects back to an array of just the nodes
        ?.map(node => node.data)
    );
  }, [input, Searcher, processed, data]);
};
