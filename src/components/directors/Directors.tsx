import React from 'react';
import {useQuery} from '@apollo/client';
import Preloader from '../common/Preloader/Preloader';
import {Table} from 'antd';
import {IDirector} from '../../types/models';
import {GET_DIRECTORS} from './queries';

type TMovie = {
    id: string | number
    name: string
}

type TResponse = {
    directors: Array<IDirector<TMovie>>
}

const Directors = () => {
    const {data, loading} = useQuery<TResponse>(GET_DIRECTORS);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Movies',
            dataIndex: 'movies'
        }
    ];

    const directors = data?.directors.map(({id, movies, ...movie}) => ({
        ...movie,
        key: id,
        movies: movies.map(movie => movie.name).join(', ')
    }));

    if (loading) return <Preloader/>

    return (
        <div>
            <Table
                columns={columns}
                dataSource={directors}
                pagination={false}
            />
        </div>
    )
};

export default Directors;