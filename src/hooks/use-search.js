import { useMemo } from "react";
import { Searcher } from "../utils/searcher.js";

export const useSearch = (data, input, SearcherClass = Searcher) => {
  if (!Array.isArray(data)) {
    throw new TypeError("data must be an array");
  }

  if (SearcherClass !== Searcher && !(SearcherClass.prototype instanceof Searcher)) {
    throw new TypeError("Searcher must be a class that extends Searcher.");
  }

  // Process the data once and store it in a memoized variable, so it doesn't have to be processed every time the input changes.
  const searcher = useMemo(() => new SearcherClass(data), [SearcherClass, data]);

  return useMemo(() => {
    if (!input) return data;

    return searcher.search(input);
  }, [input, data, searcher]);
};
