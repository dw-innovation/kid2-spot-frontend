import { IntermediateRepresentation } from "@/types/imr";

export const initialIMR: IntermediateRepresentation = {
  area: {
    type: "area",
    value: "Köln",
  },
  edges: [
    {
      source: 0,
      target: 1,
      type: "dist",
      distance: "200 m",
    },
  ],
  nodes: [
    {
      id: 0,
      name: "hotel",
      display_name: "hotels",
      type: "nwr",
      filters: [
        {
          or: [
            {
              key: "tourism",
              operator: "=",
              value: "hotel",
            },
            {
              and: [
                {
                  key: "tourism",
                  operator: "=",
                  value: "motel",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 1,
      name: "train station",
      display_name: "train stations",
      type: "nwr",
      filters: [
        {
          or: [
            {
              key: "railway",
              operator: "=",
              value: "station",
            },
          ],
        },
      ],
    },
  ],
};
