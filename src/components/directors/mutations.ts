import {gql} from '@apollo/client';

export const ADD_DIRECTOR = gql`
    mutation($name: String!, $age: Int!) {
        addDirector(name: $name, age: $age) {
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

export const UPDATE_DIRECTOR = gql`
    mutation($id: ID, $name: String!, $age: Int!) {
        updateDirector(id: $id, name: $name, age: $age) {
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

export const DELETE_DIRECTOR = gql`
    mutation($id: ID) {
        deleteDirector(id: $id) {
            id
        }
    }
`;