import { editDistance } from "./editDistance.js";
import { clamp } from "./clamp.js";

export class Searcher {
  static RANKS = {
    KEYWORD_EXACT: 10,
    KEYWORD_CLOSE: 7,
    KEYWORD_STARTS_WITH: 5,
    TAG_EXACT: 3,
    TAG_CLOSE: 2,
    TAG_STARTS_WITH: 1,
    MULTI_WORD_TAG_EXACT: 12,
    MULTI_WORD_TAG_CLOSE: 8,
    MULTI_WORD_TAG_STARTS_WITH: 1,
  };

  static TAG_TYPES = {
    NORMAL: 0b00,
    WILDCARD: 0b01,
    MULTI_WORD: 0b10,
  };

  constructor(data) {
    this.tagTypeMap = new Map();
    this.commonKeywords = new Map();
    this.processed = data.map(this.process.bind(this));

    // Calculate the rarity (idf) of each keyword. This is used to determine common keywords which should play less of a role in determining the relevance of the user input. For example if a keyword is in every node then it's not very useful for searching, and we can ignore it in the users input.
    this.commonKeywords.forEach((value, key) => {
      this.commonKeywords.set(key, Math.log(this.processed.length / value));
    });

    // Calculate the IQR of the rarity values. This is used to determine the threshold for what is considered a common keyword.
    const values = Array.from(this.commonKeywords.values()).sort((a, b) => a - b);
    const q1 = values[Math.floor(values.length / 4)];
    const q3 = values[Math.floor((values.length / 4) * 3)];
    const iqr = q3 - q1;
    const threshold = q1 - 1.5 * iqr;

    console.log(threshold);

    const itr = this.commonKeywords.entries();

    // Remove all keywords that are above the threshold.
    for (const [key, value] of itr) {
      if (value >= threshold) {
        this.commonKeywords.delete(key);
      }
    }

    console.log(this.commonKeywords);
  }

  parse(input) {
    return (
      input
        .toLowerCase()
        // Remove leading and trailing whitespace
        .trim()
        // Remove all non-alphabetic and non-whitespace characters
        .replace(/[^a-zA-Z\s]/g, "")
        // Split on whitespace and some common stop words
        .split(/\s+|\band\b|\bof\b|\bin\b/g)
        // Remove empty strings
        .filter(word => word.length > 0)
    );
  }
  process(node) {
    const keywords = this.parse(node.title);

    const set = new Set();
    for (const word of keywords) {
      // If the word is already in the set, skip it.
      if (set.has(word)) continue;

      const value = this.commonKeywords.get(word) ?? 0;
      this.commonKeywords.set(word, value + 1);
      set.add(word);
    }

    for (const tag of node.tags) {
      if (this.tagTypeMap.has(tag)) continue;

      let spaces = 0;
      const wildcard = tag.includes("*");
      let type = Searcher.TAG_TYPES.NORMAL;

      for (let i = 0; i < tag.length; i++) {
        if (tag[i] === " ") {
          spaces++;
        }
      }

      if (spaces > 0) {
        type |= Searcher.TAG_TYPES.MULTI_WORD;
      }

      if (wildcard) {
        type |= Searcher.TAG_TYPES.WILDCARD;
      }

      if ((type & Searcher.TAG_TYPES.MULTI_WORD) === Searcher.TAG_TYPES.MULTI_WORD) {
        this.tagTypeMap.set(tag, { type, spaces });
      } else {
        this.tagTypeMap.set(tag, type);
      }
    }

    return {
      data: node,
      keywords: keywords,
      tags: node.tags.filter(tag => keywords.includes(tag)) ?? [],
    };
  }
  rank(node, parsed) {
    let rank = 0;

    for (let i = 0; i < parsed.length; i++) {
      const word = parsed[i];

      // If the previous word in the user input didn't match then we can skip this node as we don't want partial matches.
      // This avoids matching things like "animal science" when the user types "computer science".
      if(rank === 0 && i !== 0) {
        return 0;
      }

      for (const keyword of node.keywords) {
        const rarity = this.commonKeywords.get(keyword);
        const correction = isNaN(rarity) ? 0 : Math.round(7 - rarity);

        // If the keyword and the word are the same.
        // We test the length first to avoid the more expensive string comparison as it's not necessary if the lengths are different.
        if (keyword.length === word.length && keyword === word) {
          rank += Math.max(Searcher.RANKS.KEYWORD_EXACT - correction, 0);
          continue;
        }

        // If the keyword and the word are within 2 characters of each other and have an edit distance of 2 or less (i.e. 2 or fewer changes), add 7 to the rank.
        // This is to account for typos and minor spelling mistakes.
        // We test the length difference first to avoid the more expensive editDistance function as it's not necessary if the length difference is too large.
        if (Math.abs(keyword.length - word.length) < 2 && editDistance(keyword, word) < 2) {
          rank += Searcher.RANKS.TAG_CLOSE;
          continue;
        }

        // If the keyword starts with the word.
        // This is to account for the user typing the beginning of a word.
        if (keyword.startsWith(word)) {
          rank += Math.max(Searcher.RANKS.KEYWORD_STARTS_WITH - correction, 0);
        }
      }

      for (const tag of node.tags) {
        if (tag.length === word.length && tag === word) {
          rank += Searcher.RANKS.TAG_EXACT;
          continue;
        }

        if (Math.abs(tag.length - word.length) < 2 && editDistance(tag, word) < 2) {
          rank += Searcher.RANKS.TAG_CLOSE;
          continue;
        }

        if (tag.startsWith(word)) {
          rank += Searcher.RANKS.TAG_STARTS_WITH;
        }
      }
    }

    return rank;
  }
  compare(a, b) {
    return a?.title?.localeCompare(b?.title);
  }

  search(input) {
    const parsed = this.parse(input);

    return this.processed
      ?.map(node => ({ ...node, rank: this.rank(node, parsed) }))
      ?.filter(node => node.rank > 0)
      ?.sort((a, b) => {
        if (a.rank > b.rank) return -1;
        if (a.rank < b.rank) return 1;

        return this.compare(a.data, b.data);
      })
      ?.map(node => node.data);
  }
}
