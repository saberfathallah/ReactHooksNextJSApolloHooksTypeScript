import { useMutation as useMutationApollo } from "@apollo/react-hooks";

export const useMutation = (
  mutation: any,
  options= {},
): any => {
  //@ts-ignore
  if (options.optionCache) {
    const [mutationFunction, { data, error, loading }] = useMutationApollo(
      mutation,
      {
        update: (cache, { data }) =>
          //@ts-ignore
        options.optionCache.updateCacheFunction(cache, data, options.optionCache.variables),
          ...options,
      }
    );
    return [mutationFunction, { data, error, loading }];
  }

  const [mutationFunction, { data, error, loading }] = useMutationApollo(
    mutation,
    {
      ...options,
    }
  );

  return [mutationFunction, { data, error, loading }];
};
