import { DrillCollection, DrillCompletion } from "@prisma/client";
import { httpClient } from "lib/axios";

import { useQuery } from "react-query";
import { DrillWithHintsAndTestCases } from "types/drill";

type Params = {
  id: DrillCollection["id"];
};

type ReturnedPromise = DrillCollection & {
  drills: ReadonlyArray<
    DrillWithHintsAndTestCases & { completion: DrillCompletion }
  >;
};

const fetchCollection = async ({ id }: Params): Promise<ReturnedPromise> => {
  const response = await httpClient.get(`/api/collection/${id}`);
  return response.data.collection;
};

const useCollection = ({ id }: Params) => {
  return useQuery(["collection", id], () => fetchCollection({ id }));
};

export { useCollection, fetchCollection };
