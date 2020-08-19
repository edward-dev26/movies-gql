import {gql} from '@apollo/client';

export const GET_DIRECTORS = gql`
    query GetDirectors {
        directors {
            id
            name
            age
            movies {
                name
                id
            }
        }
    }
`;