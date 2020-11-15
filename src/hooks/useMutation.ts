import { useMutation as useMutationApollo } from "@apollo/react-hooks";

export const useMutation = (
  mutation: any,
  { variables, optionCache, ...otherOptions }: any
): any => {
  if (optionCache) {
    const [mutationFunction, { data, error, loading }] = useMutationApollo(
      mutation,
      {
        variables,
        update: (cache, { data }) =>
          optionCache.updateCacheFunction(cache, data, optionCache.variables),
          ...otherOptions,
      }
    );
    return [mutationFunction, { data, error, loading }];
  }

  const [mutationFunction, { data, error, loading }] = useMutationApollo(
    mutation,
    {
      variables,
    }
  );

  return [mutationFunction, { data, error, loading }];
};
