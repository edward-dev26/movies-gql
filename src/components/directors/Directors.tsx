import React, {useEffect} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import Preloader from '../common/Preloader/Preloader';
import {Table} from 'antd';
import {IDirector, IMovie} from '../../types/models';
import {GET_DIRECTORS} from './queries';
import DropdownMenu, {TMenuItems} from '../common/DropdownMenu/DropdownMenu';
import {ColumnsType} from 'antd/lib/table/interface';
import FixedButton from '../common/FixedButton/FixedButton';
import {DELETE_DIRECTOR} from './mutations';
import {updateApoloCashAfterDelete} from '../../utils/utils';

type TMovie = {
    id: string | number
    name: string
}

type TResponse = {
    directors: Array<IDirector<TMovie>>
}

type TRecord = Omit<IDirector<TMovie>, 'id'> & { key: string | number };

type TDeleteVariables = {
    id: string | number
};

const Directors = () => {
    const {data, loading, refetch} = useQuery<TResponse>(GET_DIRECTORS);
    const [deleteDirector] = useMutation<TDeleteVariables, TDeleteVariables>(DELETE_DIRECTOR);

    useEffect(() => {
        refetch();
    }, []);

    const columns: ColumnsType<TRecord> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age
        },
        {
            title: 'Movies',
            dataIndex: 'movies',
            render: movies => movies.map((movie: IMovie) => movie.name).join(','),
            sorter: (a, b) => a.movies.length - b.movies.length
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

    const handleDelete = (id: string | number) => {
        return deleteDirector({
            variables: {id},
            update: updateApoloCashAfterDelete(id, 'directors')
        });
    };

    const getActions = (id: string | number): Array<TMenuItems> => ([
        {title: 'Edit', path: `/directors/edit/${id}`},
        {title: 'Delete', action: () => handleDelete(id)}
    ]);

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