import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!, $profilePic: String, $profilePicURL: String) {
  createUser(username: $username, email: $email, password: $password, profilePic: $profilePic, profilePicURL: $profilePicURL) {
    token
  }
}`
