import { useQuery as useQueryApollo } from "@apollo/react-hooks";

export const useQuery = (query, { variables }): any => {
  const { loading, data, ...rest } = useQueryApollo(query, {
    variables,
  });

  return { data, loading, ...rest };
}

// export default useQuery;

