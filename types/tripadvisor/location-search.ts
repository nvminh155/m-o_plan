import { TResultObject } from "./result-object";

type TResultType = "geos" | "lodging" | "things_to_do" | "restaurants";

export type TResponseLocationSearch = {
  data: TData[];
  metadata: {
    scope: string;
  };
  sort: {
    filter_key: "relevance" | "distance";
    label: string;
    locale_independent_label: "relevance" | "distance";
    selected: boolean;
  }[];
  partial_content: boolean;
  tracking: {
    search_id: string;
  };
  paging: {
    results: string;
    total_results: string;
  };
};

type TData = {
  result_type: TResultType;
  result_object: TResultObject;
  scope: string; //local
  is_top_result: boolean; //true;
  review_snippet?: {
    snippet: string; //"near to everything. friendly staff&#x27;s walking distance from the central pattaya";
    spans: {
      start_index: number;
      end_index: number;
    }[];
    review_id: string;
  };
  search_explanations?: {
    mentioned_by_travelers: string;
  };
};
