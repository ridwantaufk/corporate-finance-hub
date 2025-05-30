import { gql } from "@apollo/client";

export const VERIFY_CAPTCHA = gql`
  mutation VerifyCaptcha($responseBody: JSON!) {
    verifyCaptcha(responseBody: $responseBody) {
      result
      token
    }
  }
`;

// --- AUTH ---
export const LOGIN_USER = gql`
  mutation Login(
    $username: String!
    $password: String!
    $captchaResponse: JSON!
  ) {
    login(
      username: $username
      password: $password
      captchaResponse: $captchaResponse
    ) {
      success
      message
    }
  }
`;

export const OAUTH_LOGIN = gql`
  mutation OAuthLogin($provider: String!, $code: String!) {
    oAuthLogin(provider: $provider, code: $code) {
      success
      message
      user {
        id
        email
        name
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      message
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout {
    logout
  }
`;
