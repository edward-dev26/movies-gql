import {gql, StoreObject} from '@apollo/client';
import {MutationUpdaterFn} from '@apollo/client/core';

export const updateApoloCashAfterAdd = (dataKey: string, entityName: string): MutationUpdaterFn => {
    return (cache, {data}) => {
        cache.modify({
            fields: {
                [entityName]: (entity = []) => {
                    const fragment = capitalize(entityName);
                    const newEntityRef = cache.writeFragment({
                        data: (data || {})[dataKey],
                        fragment: gql`
                            fragment New${fragment} on ${fragment} {
                                id
                                name
                            }
                        `
                    });

                    return [...entity, newEntityRef];
                }
            }
        })
    }
}

export const updateApoloCashAfterDelete = (id: string | number, entityName: string): MutationUpdaterFn => {
    return (cache) => {
        cache.modify({
            fields: {
                [entityName]: (entity: Array<StoreObject> = [], {readField}) => {
                    return entity.filter(item => id !== readField('id', item))
                }
            }
        })
    }
}

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);