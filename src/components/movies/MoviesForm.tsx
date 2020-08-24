import React from 'react';
import {TField} from '../common/Fields/helpers';
import ModalForm from '../form/ModalForm';
import {useMutation, useQuery} from '@apollo/client';
import {GET_DIRECTORS, GET_MOVIE} from './queries';
import {useParams} from 'react-router-dom';
import {IMovie} from '../../types/models';
import {ADD_MOVIE, UPDATE_MOVIE} from './mutations';
import {updateApoloCashAfterAdd} from '../../utils/utils';
import {maxNumber, required} from '../../utils/validators';

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
    const movieQuery = useQuery<TMoviesResponse>(GET_MOVIE, {
        variables: {id}
    });

    const {data: directorsData} = useQuery<TDirectorsResponse>(GET_DIRECTORS);

    const [addMovie] = useMutation(ADD_MOVIE, {
        update: updateApoloCashAfterAdd('addMovie', 'movies')
    });

    const [editMovie] = useMutation(UPDATE_MOVIE);

    const initialValues = {
        name: '',
        genre: '',
        rate: null,
        watched: false,
        directorId: '' as string | number
    };

    type TValues = typeof initialValues;

    const options = directorsData?.directors.map(({id, name}) => ({value: id, title: name}));

    const fields: Array<TField<TValues>> = [
        {name: 'name', placeholder: 'Movie name', label: 'Name', type: 'text', validators: [required]},
        {name: 'genre', placeholder: 'Movie genre', label: 'Genre', type: 'text', validators: [required]},
        {name: 'rate', placeholder: 'Movie rate', label: 'Rate', type: 'number', validators: [required, maxNumber(10)]},
        {name: 'directorId', placeholder: 'Movie director', label: 'Director', type: 'select', options, validators: [required]},
        {name: 'watched', label: 'Did you watch this movie?', type: 'checkbox'}
    ];

    return (
        <ModalForm
            entity='movie'
            id={id}
            fields={fields}
            initialValues={initialValues}
            data={movieQuery.data?.movie}
            addMethod={addMovie}
            editMethod={editMovie}
        />
    )
};

export default MoviesForm;