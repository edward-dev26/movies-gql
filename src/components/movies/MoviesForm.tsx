import React from 'react';
import {TField} from '../common/Fields/helpers';
import ModalForm, {TFormMode} from '../form/ModalForm';
import {gql, useMutation, useQuery} from '@apollo/client';
import {GET_DIRECTORS, GET_MOVIE} from './queries';
import {useHistory, useParams} from 'react-router-dom';
import {IMovie} from '../../types/models';
import {ADD_MOVIE, UPDATE_MOVIE} from './mutations';

type TParams = {
    id: string
}

type TMoviesResponse = {
    movie: IMovie
}

export type TDirector = {
    id: string | number
    name: string
}

type TDirectorsResponse = {
    directors: Array<TDirector>
}

const MoviesForm = () => {
    const {id} = useParams<TParams>();
    const history = useHistory()
    const movieQuery = useQuery<TMoviesResponse>(GET_MOVIE, {
        variables: {id}
    });

    const {data: directorsData} = useQuery<TDirectorsResponse>(GET_DIRECTORS);

    const [addMovie] = useMutation(ADD_MOVIE, {
        update: (cache, {data: {addMovie}}) => {
            cache.modify({
                fields: {
                    movies: (movies = []) => {
                        const newMovieRef = cache.writeFragment({
                            data: addMovie,
                            fragment: gql`
                                fragment NewMovie on Movies {
                                    id
                                    name
                                }
                            `
                        })

                        return [...movies, newMovieRef];
                    }
                }
            })
        }
    });

    const [editMovie] = useMutation(UPDATE_MOVIE);

    const initialValues = {
        name: '',
        genre: '',
        rate: 0,
        watched: false,
        directorId: '' as string | number
    };

    type TValues = typeof initialValues;

    const options = directorsData?.directors.map(({id, name}) => ({value: id, title: name}));

    const fields: Array<TField<TValues>> = [
        {name: 'name', placeholder: 'Movie name', label: 'Name', type: 'text'},
        {name: 'genre', placeholder: 'Movie genre', label: 'Genre', type: 'text'},
        {name: 'rate', placeholder: 'Movie rate', label: 'Rate', type: 'number'},
        {name: 'directorId', placeholder: 'Movie director', label: 'Director', type: 'select', options},
        {name: 'watched', label: 'Did you watch this movie?', type: 'checkbox'}
    ];

    const handleSubmit = (values: TValues, setSubmitting: (submitting: boolean) => void, mode: TFormMode) => {
        const method = mode === 'Add' ? addMovie : editMovie;

        method({
            variables: values
        })
            .then(() => {
                setSubmitting(false);
                history.push('/movies');
            });
    };

    return (
        <ModalForm
            entity='movie'
            id={id}
            fields={fields}
            initialValues={initialValues}
            data={movieQuery.data?.movie}
            handleSubmit={handleSubmit}
        />
    )
};

export default MoviesForm;