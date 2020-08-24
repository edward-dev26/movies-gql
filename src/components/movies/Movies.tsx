import React, {useState} from 'react';
import {Table} from 'antd';
import {useMutation, useQuery} from '@apollo/client';
import {GET_MOVIES} from './queries';
import {IMovie} from '../../types/models';
import Preloader from '../common/Preloader/Preloader';
import {ColumnsType, TableRowSelection} from 'antd/lib/table/interface';
import {DELETE_MOVIE, UPDATE_MOVIE} from './mutations';
import {EyeOutlined} from '@ant-design/icons';
import DropdownMenu, {TMenuItems} from '../common/DropdownMenu/DropdownMenu';
import FixedButton from '../common/FixedButton/FixedButton';
import {EyeInvisibleOutlined} from '@ant-design/icons/lib';
import {updateApoloCashAfterDelete} from '../../utils/utils';

type TDirector = {
    id: string | number
    name: string
};

type TResponse = {
    movies: Array<IMovie<TDirector>>
};

type TDeleteVariables = {
    id: string | number
};

type TUpdateVariables = Omit<IMovie<TDirector>, 'director'> & { directorId: number | string };
type TRecord = Omit<IMovie<TDirector>, 'id'> & { key: string | number };

const Movies = () => {
    const {data, loading} = useQuery<TResponse>(GET_MOVIES);
    const [updateMovie] = useMutation<TResponse, TUpdateVariables>(UPDATE_MOVIE);
    const [deleteMovie] = useMutation<TDeleteVariables, TDeleteVariables>(DELETE_MOVIE);

    const handleDelete = (id: string | number) => {
        return deleteMovie({
            variables: {id},
            update: updateApoloCashAfterDelete(id, 'movies')
        });
    };

    const [filter, setFilter] = useState<Array<string> | null>(null);

    const handleFilter = () => {
        setFilter((filter) => {
            if (!filter) return ['watched'];
            if (filter.includes('watched')) return ['not-watched'];

            return null;
        });
    };

    const getActions = (id: string | number): Array<TMenuItems> => ([
        {title: 'Edit', path: `/movies/edit/${id}`},
        {title: 'Delete', action: () => handleDelete(id)}
    ]);

    const columns: ColumnsType<TRecord> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filteredValue: filter,
            onFilter: (value, record) => {
                if (value === 'not-watched') return !record.watched;

                return record.watched
            }
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            sorter: (a, b) => a.genre.localeCompare(b.genre)
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            sorter: (a, b) => a.rate - b.rate
        },
        {
            title: 'Director',
            dataIndex: 'director',
            render: (value => value.name),
            sorter: (a, b) => a.director.name.localeCompare(b.director.name)
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: ((_, record) => <DropdownMenu menuItems={getActions(record.key)}/>)
        }
    ];

    const movies = data?.movies.map(({id, ...movie}) => ({
        ...movie,
        key: id
    }));

    const getColumnTitle = () => {
        if (filter?.includes('not-watched')) {
            return <EyeInvisibleOutlined onClick={handleFilter}/>
        }

        return <EyeOutlined
            style={filter?.includes('watched') ? {color: '#1890ff'} : void 0}
            onClick={handleFilter}
        />
    }

    const rowSelection: TableRowSelection<TRecord> = {
        onSelect: (({key, director, watched, ...record}, selected) => {
            return updateMovie({
                variables: {
                    watched: selected,
                    id: key,
                    directorId: director.id,
                    ...record,
                }
            })
        }),
        hideSelectAll: true,
        columnTitle: getColumnTitle(),
        selectedRowKeys: movies
            ?.filter(movie => movie.watched)
            .map(movie => movie.key),
    };

    if (loading) return <Preloader/>;

    return (
        <>
            <FixedButton path='/movies/add'/>
            <Table
                columns={columns}
                dataSource={movies}
                pagination={false}
                rowSelection={rowSelection}
            />
        </>
    )
};

export default Movies;