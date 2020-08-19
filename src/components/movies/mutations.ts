import {gql} from '@apollo/client';

export const UPDATE_MOVIE = gql`
    mutation UpdateMovie($id: ID, $name: String!, $genre: String!, $directorId: ID!, $rate: Int, $watched: Boolean!) {
        updateMovie(id: $id, name: $name, genre: $genre, directorId: $directorId, rate: $rate, watched: $watched) {
            id
            name
            genre
            rate
            watched
            director {
                name
                id
            }
        }
    }
`;

export const ADD_MOVIE = gql`
    mutation AddMovie($name: String!, $genre: String!, $directorId: ID!, $rate: Int, $watched: Boolean!) {
        addMovie(name: $name, genre: $genre, directorId: $directorId, rate: $rate, watched: $watched) {
            id
            name
            genre
            rate
            watched
            director {
                name
                id
            }
        }
    }
`;

export const DELETE_MOVIE = gql`
    mutation DeleteMovie($id: ID) {
        deleteMovie(id: $id) {
            id
        }
    }
`;