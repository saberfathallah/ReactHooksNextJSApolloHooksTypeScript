import { gql } from 'apollo-boost';

const CHANGE_CURRENT_CATEGORY = gql`
  mutation changeCurrentCategory($currentCategoryId: ID) {
    changeCurrentCategory(currentCategoryId: $currentCategoryId) @client
  }
`;

export default CHANGE_CURRENT_CATEGORY;
