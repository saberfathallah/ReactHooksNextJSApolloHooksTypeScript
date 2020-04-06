import { gql } from 'apollo-boost';

const ADD_POST = gql`
mutation addPost($postInput: PostInput){
  addPost(postInput: $postInput){
    post {
      description
    }
    error
  }
}
`

export default ADD_POST;
