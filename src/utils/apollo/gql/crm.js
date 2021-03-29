import { gql } from '@apollo/client';
// QUERIES
// CREATE
export const CREATE_PERSON = gql`
mutation createPerson(
    $giveName: String
    $familyName: String
    $additionalName: String
    $email: String
    $officialEmail: String
    $gender: String
    $hasCredential: Boolean
    $jobTitle: String
    $knowsAbout: String
    $phone: String
    $status: String
) {
    createPerson(
      PersonTo: {
        id: 0
        giveName: $giveName
        familyName: $familyName
        additionalName: $additionalName
        email: $email
        officialEmail: $officialEmail
        gender: $gender
        hasCredential: $hasCredential
        jobTitle: $jobTitle
        knowsAbout: $knowsAbout
        phone: $phone
        status: $status
        tenant: { id: 1 }
        language: { id: 1 }
      }
    ) {
      id
    }
  }`;
// MODIFY
// DELETE
