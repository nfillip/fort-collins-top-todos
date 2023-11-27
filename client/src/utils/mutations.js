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

export const UPVOTE_LOCATION = gql`
mutation UpVoteLocation($locationId: ID!, $cat: String!) {
  upVoteLocation(locationId: $locationId, cat: $cat) {
    _id
  }
}
`

export const REMOVE_VOTE_LOCATION = gql`
mutation removeVoteLocation($locationId: ID!, $cat: String!) {
  removeVoteLocation(locationId: $locationId, cat: $cat) {
    _id
  }
}`

export const SAVE_LOCATION = gql`
mutation SaveLocation($locationId: ID!) {
  saveLocation(locationId: $locationId) {
    savedLocations {
      _id
    }
    email
  }
}`

export const UNSAVE_LOCATION = gql`
mutation UnSaveLocation($locationId: ID!) {
  unSaveLocation(locationId: $locationId) {
    savedLocations {
      _id
    }
    email
  }
}`

export const ADD_BLOG_POST = gql`
mutation AddBlogPost($locationId: ID!, $messageText: String!) {
  addBlogPost(locationId: $locationId, messageText: $messageText) {
    _id
    blog {
      _id
      createdAt
      messageText
      user {
        email
      }
    }
  }
}`