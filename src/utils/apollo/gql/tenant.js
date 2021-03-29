import gql from 'graphql-tag';

// QUERIES
export const FIND_COMPONENT = gql`
	query findComponent($id: ID!) {
		findComponent(id: $id) {
			name
			id
			modules {
				id
				name
				workflownodes {
					name
					workflow {
						id
						description
					}
				}
			}
		}
	}
`;

export const FIND_TENANT = gql`
	query findTenant($id: ID!) {
		findTenant(id: $id) {
			id
			name
			expire
			organization {
				id
				name
				logo
				slogan
				webpage
				legalName
			}
			customer {
				id
				name
				officialEmail
				phone
			}
		}
	}
`;

export const QUERY_ROWS = (entity, content) => gql`
  query GetRows($size: Int!,$number: Int!){
    find${entity}List(page: { size: $size, number: $number }) {
      ${content}
    }
  }
`;

export const FIND_ENTITY_REFERENCE_LIST = gql`
	query findEntityReferenceList($val: String!) {
		findEntityReferenceList(filters: { col: "entity", val: $val }) {
			content {
				id
				entity
				textfield
				valuefield
				attributess {
					id
					name
					description
					attComponent
					isrequired
					ismultiline
					sm
					md
					sortno
					htmltag {
						tagName
					}
				}
			}
		}
	}
`;

export const FIND_COMPONENT_LIST = gql`
	query findComponentList {
		findComponentList(page: { size: 100, number: 1 }, sort: { col: "releaseNo", mod: ASC }) {
			content {
				id
				name
			}
		}
	}
`;

export const FIND_CROP = gql`
	query findCrop($id: ID!) {
		findCrop(id: $id) {
			cropname
			programs {
				id
				programname
			}
			serviceproviders {
				id
				name
				servicetypes {
					id
					name
					purposes {
						id
						name
						services {
							id
							name
						}
					}
				}
			}
		}
	}
`;

// CREATE
// MODIFY
export const MODIFY_ENTITY = nameentity => gql`
  mutation modifyEntity($type: ${nameentity}Input!){
    modify${nameentity}(${nameentity}To: $type){
      id
      name
    }
  }
`;

// DELETE
