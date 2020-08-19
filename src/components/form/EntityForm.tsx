import React from 'react';
import {Form} from 'formik';
import {Form as AntdForm} from 'antd';
import {createField, TField} from '../common/Fields/helpers';

type PropsType = {
    fields: Array<TField<any>>
}

const EntityForm: React.FC<PropsType> = ({fields}) => {
    return (
        <AntdForm>
            <Form>
                {fields.map(createField)}
            </Form>
        </AntdForm>
    )
};

export default EntityForm;