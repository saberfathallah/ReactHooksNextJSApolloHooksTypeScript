// import withUseQuery from "../../HOC/withUseQuery";
import Test from "./Test";
import GET_ALL_POSTS from "@graphql/posts/getAllPosts";
import { LIMIT, FROM } from "@constants/posts";
import { useQuery } from "../../hooks/useQuery";

const TestContainer = (): any => {
  const { data, loading } = useQuery(GET_ALL_POSTS, {
    variables: { from: FROM, limit: LIMIT },
  });

  return <Test data={data} loading={loading} />;
};

export default TestContainer;

// export default compose(
//     withProps(() => ({
//         queryVariables: { from: FROM, limit: LIMIT },
//       })),
//       withUseQuery(GET_ALL_POSTS)
// )(Test);
