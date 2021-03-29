import { gql } from '@apollo/client';
// QUERIES
export const FIND_LANGUAGE_LIST = gql`
	query {
		findLanguageList(page: { number: 1, size: 200 }, filters: { mod: EQ, col: "isBase", val: "Supported" }) {
			content {
				name
				codeIso
				id
			}
		}
	}
`;

export const FIND_TRANSLATIONS = gql`
	query findLanguages($codeISO: String!) {
		findLanguageList(page: { number: 1, size: 1 }, filters: { mod: EQ, col: "codeIso", val: $codeISO }) {
			content {
				id
				codeIso
				translations {
					translation
					htmltag {
						tagName
					}
				}
			}
		}
	}
`;

// CREATE
export const CREATE_HTMLTAG = gql`
	mutation createHtmlTag($tagName: String!) {
		createHtmlTag(HtmlTagTo: { id: 0, tagName: $tagName }) {
			id
		}
	}
`;

// MODIFY
// DELETE
