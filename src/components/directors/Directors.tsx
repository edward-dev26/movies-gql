import React from 'react';
import {useQuery} from '@apollo/client';
import Preloader from '../common/Preloader/Preloader';
import {Table} from 'antd';
import {IDirector, IMovie} from '../../types/models';
import {GET_DIRECTORS} from './queries';
import DropdownMenu, {TMenuItems} from '../common/DropdownMenu/DropdownMenu';
import {ColumnsType} from 'antd/lib/table/interface';
import FixedButton from '../common/FixedButton/FixedButton';

type TMovie = {
    id: string | number
    name: string
}

type TResponse = {
    directors: Array<IDirector<TMovie>>
}

type TRecord = Omit<IDirector<TMovie>, 'id'> & { key: string | number };

const getActions = (id: string | number): Array<TMenuItems> => ([
    {title: 'Edit', path: `/directors/edit/${id}`},
    {title: 'Delete', action: () => void 0}
]);

const Directors = () => {
    const {data, loading} = useQuery<TResponse>(GET_DIRECTORS);

    const columns: ColumnsType<TRecord> = [
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
            dataIndex: 'movies',
            render: movies => movies.map((movie: IMovie) => movie.name).join(',')
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: ((_, record) => <DropdownMenu menuItems={getActions(record.key)}/>)
        }
    ];

    const directors = data?.directors.map(({id, ...movie}) => ({
        ...movie,
        key: id
    }));

    if (loading) return <Preloader/>

    return (
        <div>
            <FixedButton path='/directors/add'/>
            <Table
                columns={columns}
                dataSource={directors}
                pagination={false}
            />
        </div>
    )
};

export default Directors;