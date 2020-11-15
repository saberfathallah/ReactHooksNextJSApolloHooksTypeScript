import { useQuery } from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';
import React, { ComponentType } from 'react';


 const withUseQuery =
(
  query: DocumentNode,
) => (Component: ComponentType<any>) => (props:any) => {
  const { queryVariables = false } = props;

  const { data = {}, loading, error } = useQuery(query, {
    variables: queryVariables,
  });

  if(loading )return <p>loading...</p>
  if(error )return <p>error...</p>

  return <Component {...props} {...data} />;
};

export default withUseQuery;
