import { useEffect, useState } from "react";

const pattern = /\s+|\band\b|\bof\b|\bin\b/g;

const defaultRanker = (node, keywords) => {
  // Split some of the program props into an array of words just like the keywords.
  const title = node?.title?.toLowerCase().split(pattern) || [];
  const tags = node?.tags?.map(tag => tag.toLowerCase()) || [];

  // We rank each keyword individually, then take the highest (lowest number) rank as the program's rank overall.
  // If any single keyword doesn't match (i.e. rank = -1), then the program as a whole doesn't match.
  return keywords.reduce((rank, keyword) => {
    // The previous keyword didn't match, so this keyword can't match either, so we don't need to get its rank.
    if (rank === -1) return -1;

    // If any word in the title starts with or is equal to the keyword return 0 (highest rank).
    if (title.some(word => word.startsWith(keyword))) return 0;

    // If the keyword is in the program's tags, return 2 if the none of the previous keywords had a higher rank.
    if (tags.some(tag => tag.startsWith(keyword))) return isNaN(rank) ? 2 : Math.min(rank, 1);

    return -1;
  }, NaN);
};

const defaultParser = input => {
  return (
    input
      .toLowerCase()
      // Remove leading and trailing whitespace
      .trim()
      // Remove all non-alphabetic and non-whitespace characters
      .replace(/[^a-zA-Z\s]/g, "")
      // Split on whitespace and "and"
      .split(pattern)
      // Remove empty strings
      .filter(word => word.length > 0)
  );
};

const defaultSorter = (a, b) => a?.title?.localeCompare(b?.title);

export const useSearch = (data, input, ranker = defaultRanker, parser = defaultParser, sorter = defaultSorter) => {
  if (!Array.isArray(data)) {
    throw new TypeError("data must be an array");
  }

  const [filtered, setFiltered] = useState(data);

  useEffect(() => {
    if (!input) {
      setFiltered(data);
      return;
    }

    const keywords = parser(input);
    const filteredData = data
      ?.map(element => ({ data: element, rank: ranker(element, keywords) }))
      ?.filter(node => node.rank >= 0)
      ?.sort((a, b) => {
        // Sort by rank
        if (a.rank < b.rank) return -1;
        if (a.rank > b.rank) return 1;

        return sorter(a, b);
      })
      ?.map(node => node.data);

    setFiltered(filteredData || []);
  }, [data, input, ranker, parser, sorter]);

  return filtered;
};
