import { useMutation, useQueryClient } from "react-query";
import { Drill } from "@prisma/client";
import { httpClient } from "lib/axios";

type Variables = {
  id: Drill["id"];
  solution: string;
};

const useCreateCompletion = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (variables: Variables) => {
      const response = await httpClient.post(`/api/completion/create`, {
        id: variables.id,
        solution: variables.solution,
      });
      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries(["drill"]);
        await queryClient.refetchQueries(["collection"]);
      },
    }
  );
};

export { useCreateCompletion };
