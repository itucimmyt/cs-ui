import gql from 'graphql-tag';

// QUERIES
export const FIND_REQUEST = gql`
	query findRquest($id: ID!) {
		findRequest(id: $id) {
			requester
			requestcode
			submitiondate
			admincontact
			chargeaccount
			description
			workflowcfvalues {
				textvalue
				codevalue
				workflownodecf {
					name
				}
			}
		}
	}
`;
// CREATE
export const CREATE_REQUEST = gql`
	mutation createRequest(
		$requester: String!
		$description: String
		$submitiondate: Date!
		$admincontact: String!
		$chargeaccount: String
		$requestcode: String!
		$workflowinstance: ID!
	) {
		createRequest(
			RequestTo: {
				id: 0
				requester: $requester
				description: $description
				submitiondate: $submitiondate
				admincontact: $admincontact
				chargeaccount: $chargeaccount
				requestcode: $requestcode
				tenant: 1
				workflowinstance: { id: $workflowinstance }
				person: { id: 1 }
			}
		) {
			id
		}
	}
`;

// MODIFY
// DELETE
export const DELETE_REQUEST = gql`
	mutation deleteRequest($id: Int!) {
		deleteRequest(idrequest: $id)
	}
`;
