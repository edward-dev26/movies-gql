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

export const GET_DIRECTOR = gql`
    query GetDirector($id: ID) {
        director(id: $id) {
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