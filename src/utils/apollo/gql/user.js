import gql from 'graphql-tag';

// QUERIES
export const FIND_USER_LIST = gql`
	# Write your query or mutation here
	query findUserList($val: String!) {
		findUserList(filters: { col: "userName", mod: EQ, val: $val }) {
			content {
				userName
				tenants {
					name
					instances {
						id
						name
						server
						port
						domaininstances {
							domain {
								name
								info
								icon
							}
							context
							sgContext
						}
					}
				}
				person {
					familyName
					additionalName
					email
					gender
					jobTitle
					knowsAbout
				}
				roles {
					description
				}
			}
		}
	}
`;

export const FIND_PERSON_LIST = gql`
	query findPersonList($number: Int!, $size: Int!) {
		findPersonList(page: { number: $number, size: $size }) {
			content {
				id
				giveName
				additionalName
				email
				officialEmail
				hasCredential
				jobTitle
				knowsAbout
				language {
					name
				}
				phone
				status
				addresss {
					region
					locality
					postalCode
					postOfficeBoxNumber
				}
			}
		}
	}
`;

// CREATE
export const CREATE_PERSON = gql`
	mutation createPerson($type: PersonInput!) {
		createPerson(PersonTo: $type) {
			giveName
			familyName
			additionalName
			email
			officialEmail
			gender
			hasCredential
			jobTitle
			knowsAbout
			phone
			status
		}
	}
`;

// MODIFY
export const MODIFY_PERSON = gql`
	mutation modifyPerson($type: PersonInput!) {
		modifyPerson(PersonTo: $type) {
			id
			giveName
			familyName
			additionalName
			email
			officialEmail
			gender
			hasCredential
			jobTitle
			knowsAbout
			phone
			status
			tenant {
				name
			}
		}
	}
`;

// DELETE
export const DELETE_USER = gql`
	mutation deleteUser($id: Int!) {
		deleteUser(iduser: $id)
	}
`;

export const DELETE_PERSON = gql`
	mutation deletePerson($id: Int!) {
		deletePerson(idperson: $id)
	}
`;
