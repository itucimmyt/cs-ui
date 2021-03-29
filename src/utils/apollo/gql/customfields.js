import { gql } from '@apollo/client';

// TissueTypes
export const FIND_TISSUE_TYPE_LIST = gql`
query {
    findTissueTypeList(page:{number:1 size:100}){
        content{
            id
            name
        }
    }
}
`
