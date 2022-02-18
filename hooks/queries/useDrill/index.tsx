import { Drill, DrillCompletion } from "@prisma/client";
import { httpClient } from "lib/axios";

import { useQuery } from "react-query";
import { DrillWithHintsAndTestCases } from "types/drill";

type Params = {
  functionName: Drill["functionName"];
};

const fetchDrill = async ({
  functionName,
}: Params): Promise<
  DrillWithHintsAndTestCases & { completion: DrillCompletion }
> => {
  const response = await httpClient.get(`/api/drill/${functionName}`);
  return response.data.drill;
};

const useDrill = ({ functionName }: Params) => {
  return useQuery(["drill", functionName], () => fetchDrill({ functionName }));
};

export { useDrill, fetchDrill };
