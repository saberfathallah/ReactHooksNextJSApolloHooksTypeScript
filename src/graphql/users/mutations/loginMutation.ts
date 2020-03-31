import { gql } from 'apollo-boost';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      user {
        email
        name
        password
      }
      token
    }
  }
`

export default LOGIN_MUTATION;
