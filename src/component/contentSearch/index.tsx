import ContentSearch from "./ContentSearch";
import SEARCH from "@graphql/posts/search";
import { useQuery } from "../../hooks/useQuery";
import { User } from '../../types/user';

interface ContentSearchContainerProps {
  userConnected: User;
  dataSearchQuery: SearchQueryType;
}

interface SearchQueryType {
  query: string;
}

const ContentSearchContainer = (props: ContentSearchContainerProps) => {
  const { dataSearchQuery, userConnected } = props;

  const { loading, data } = useQuery(SEARCH, {
    variables: { query: dataSearchQuery.query },
  });
  return (
    <ContentSearch
      loading={loading}
      data={data}
      userConnected={userConnected}
    />
  );
};

export default ContentSearchContainer;
