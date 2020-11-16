import { useQuery as useQueryApollo } from "@apollo/react-hooks";

export const useQuery = (query, options={}): any => {
  const { loading, data, ...rest } = useQueryApollo(query, {
    ...options,
  });

  return { data, loading, ...rest };
}

// export default useQuery;

