import gql from 'graphql-tag';

// QUERIES
export const FIND_WORKFLOW_LIST = gql`
	query findWorkflowList {
		findWorkflowList(page: { number: 1, size: 50 }) {
			content {
				id
				description
				name
				help
				icon
				title
			}
		}
	}
`;

export const FIND_WORKFLOW_PHASE = gql`
	query findWorkflowPhase($id: ID!) {
		findWorkflowPhase(id: $id) {
			description
			name
			help
			workflowstages {
				id
				name
				description
				help
				sequence
				workflownodes {
					id
					name
					description
					module {
						name
						id
					}
				}
			}
		}
	}
`;

export const FIND_WORKFLOW = gql`
	query findWorkflow($id: ID!) {
		findWorkflow(id: $id) {
			id
			description
			help
			icon
			name
			title
			htmltag {
				tagName
			}
			workflowphases {
				id
				description
				name
				help
				sequence
			}
		}
	}
`;

export const FIND_WORKFLOW_NODE = gql`
	query findWorkflowNode($id: ID!) {
		findWorkflowNode(id: $id) {
			id
			name
			description
			workflow {
				id
				description
			}
			workflowstages {
				id
				name
				help
				description
				sequence
			}
			workflownodecfs {
				name
				id
			}
		}
	}
`;

export const FIND_WORKFLOW_INSTANCE = gql`
	query findWorkflowInstance($id: ID!) {
		findWorkflowInstance(id: $id) {
			complete
			requests {
				id
			}
			workflowevents {
				completed
				id
				workflowstage {
					id
					name
					workflowphase {
						id
						name
						description
					}
				}
				workflownode {
					name
				}
			}
		}
	}
`;

// CREATE
export const CREATE_WORKFLOW_CF_VALUE = gql`
	mutation createWorkflowCFValue($request: ID!, $codevalue: Int, $textvalue: String, $workflownodecf: ID!) {
		createWorkflowCFValue(
			WorkflowCFValueTo: {
				request: { id: $request }
				codevalue: $codevalue
				tenant: 1
				textvalue: $textvalue
				workflownodecf: { id: $workflownodecf }
				id: 0
			}
		) {
			id
		}
	}
`;

export const CREATE_WORKFLOW_INSTANCE = gql`
	mutation createWorkflowInstance($initiated: Date!, $workflowId: ID!) {
		createWorkflowInstance(
			WorkflowInstanceTo: { id: 0, initiated: $initiated, tenant: 1, workflow: { id: $workflowId } }
		) {
			id
		}
	}
`;

export const CREATE_WORKFLOW_EVENT = gql`
	mutation createWorkflowEvent(
		$tenant: Int
		$workflownode: ID!
		$workflowinstance: ID!
		$workflowstage: ID!
		$completed: Date
	) {
		createWorkflowEvent(
			WorkflowEventTo: {
				id: 0
				tenant: $tenant
				description: "new request"
				workflownode: { id: $workflownode }
				workflowinstance: { id: $workflowinstance }
				workflowstage: { id: $workflowstage }
				completed: $completed
			}
		) {
			id
		}
	}
`;

export const CREATE_WORKFLOW = gql`
	mutation createWorkflow(
		$title: String
		$name: String
		$description: String
		$help: String
		$definition: String
		$icon: String
		$entityreferenceId: ID!
	) {
		createWorkflow(
			WorkflowTo: {
				title: $title
				name: $name
				description: $description
				help: $help
				definition: $definition
				icon: $icon
				id: 0
				entityreference: { id: $entityreferenceId }
				tenant: { id: 1 }
				htmltag: { id: 1 }
			}
		) {
			id
			name
		}
	}
`;

export const CREATE_WORKFLOW_PHASE = gql`
	mutation createWorkflowPhase(
		$name: String!
		$description: String!
		$help: String!
		$sequence: Int!
		$tenant: Int!
		$workflowId: ID!
		$htmltagId: ID!
	) {
		createWorkflowPhase(
			WorkflowPhaseTo: {
				name: $name
				description: $description
				help: $help
				sequence: $sequence
				tenant: $tenant
				id: 0
				workflow: { id: $workflowId }
				htmltag: { id: $htmltagId }
			}
		) {
			id
		}
	}
`;

export const CREATE_WORKFLOW_STAGE = gql`
	mutation createWorkflowStage(
		$name: String!
		$description: String!
		$help: String!
		$sequence: Int!
		$tenant: Int!
		$phaseId: ID!
		$htmltagId: ID!
	) {
		createWorkflowStage(
			WorkflowStageTo: {
				name: $name
				description: $description
				help: $help
				sequence: $sequence
				tenant: $tenant
				id: 0
				workflowphase: { id: $phaseId }
				htmltag: { id: $htmltagId }
			}
		) {
			id
		}
	}
`;

// MODIFY
export const MODIFY_WORKFLOW = gql`
	mutation modifyWorkflow($id: ID!, $definition: String) {
		modifyWorkflow(WorkflowTo: { id: $id, definition: $definition }) {
			id
		}
	}
`;

export const MODIFY_WORKFLOW_EVENT = gql`
	mutation modifyWorkflowEvent($tenant: Int, $id: ID!, $completed: Date) {
		modifyWorkflowEvent(WorkflowEventTo: { id: $id, completed: $completed, tenant: $tenant }) {
			id
		}
	}
`;

export const MODIFY_WORKFLOW_PHASE = gql`
	mutation modifyWorkflowPhase($id: ID!, $name: String, $description: String, $help: String, $sequence: Int) {
		modifyWorkflowPhase(
			WorkflowPhaseTo: { id: $id, name: $name, description: $description, help: $help, sequence: $sequence }
		) {
			id
		}
	}
`;

export const MODIFY_WORKFLOW_STAGE = gql`
	mutation modifyWorkflowStage(
		$id: ID!
		$name: String
		$description: String
		$help: String
		$sequence: Int
		$tenant: Int
	) {
		modifyWorkflowStage(
			WorkflowStageTo: {
				id: $id
				name: $name
				description: $description
				help: $help
				sequence: $sequence
				tenant: $tenant
			}
		) {
			id
		}
	}
`;

// DELETE
export const DELETE_WORKFLOW_PHASE = gql`
	mutation deleteWorkflowPhase($id: Int!) {
		deleteWorkflowPhase(idworkflowphase: $id)
	}
`;
export const DELETE_WORKFLOW_STAGE = gql`
	mutation deleteWorkflowStage($id: Int!) {
		deleteWorkflowStage(idworkflowstage: $id)
	}
`;
