import { gql } from "@apollo/client";

export const GET_CAPTCHA = gql`
  query GetCaptcha {
    getCaptcha {
      data
    }
  }
`;

// --- USERS ---
export const ME_QUERY = gql`
  query Me {
    me {
      user_id
      username
      role
      is_active
      created_at
      updated_at
      biodata {
        biodata_id
        first_name
        last_name
        date_of_birth
        gender
        email
        phone
        address
        city
        state
        postal_code
        country
        nationality
        marital_status
        occupation
        profile_picture
      }
    }
  }
`;
