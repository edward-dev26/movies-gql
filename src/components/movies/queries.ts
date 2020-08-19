import {gql} from '@apollo/client';

export const GET_MOVIES = gql`
    query GetMovies {
        movies {
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

export const GET_MOVIE = gql`
    query GetMovie($id: ID) {
        movie(id: $id) {
            id
            name
            genre
            rate
            watched
            director {
                id
            }
        }
    }
`;

export const GET_DIRECTORS = gql`
    query GetDirectors {
        directors {
            id
            name
        }
    }
`;