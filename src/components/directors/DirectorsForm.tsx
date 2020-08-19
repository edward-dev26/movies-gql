import React from 'react';
import ModalForm from '../form/ModalForm';
import {useParams} from 'react-router-dom';
import {TField} from '../common/Fields/helpers';
import {gql, useMutation, useQuery} from '@apollo/client';
import {ADD_DIRECTOR, UPDATE_DIRECTOR} from './mutations';
import {GET_DIRECTOR} from './queries';
import {IDirector} from '../../types/models';

type TParams = {
    id: string
}

type TDirectorResponse = {
    director: IDirector
}

const DirectorsForm = () => {
    const {id} = useParams<TParams>();
    const directorQuery = useQuery<TDirectorResponse>(GET_DIRECTOR, {
        variables: {id}
    });

    const [addDirector] = useMutation(ADD_DIRECTOR, {
        update: (cache, {data: {addDirector}}) => {
            cache.modify({
                fields: {
                    movies: (directors = []) => {
                        const newDirectorRef = cache.writeFragment({
                            data: addDirector,
                            fragment: gql`
                                fragment NewDirector on Directors {
                                    id
                                    name
                                }
                            `
                        });

                        return [...directors, newDirectorRef];
                    }
                }
            })
        }
    });

    const [editDirector] = useMutation(UPDATE_DIRECTOR);

    const initialValues = {
        name: '',
        age: null
    };

    type TValues = typeof initialValues;

    const fields: Array<TField<TValues>> = [
        {name: 'name', placeholder: 'Director name', label: 'Name', type: 'text'},
        {name: 'age', placeholder: 'Director age', label: 'Age', type: 'number'}
    ];

    return (
        <ModalForm
            entity={'director'}
            id={id}
            fields={fields}
            initialValues={initialValues}
            data={directorQuery.data?.director}
            addMethod={addDirector}
            editMethod={editDirector}
        />
    )
};

export default DirectorsForm;