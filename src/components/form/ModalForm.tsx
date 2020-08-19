import React, {useEffect, useState} from 'react';
import style from './ModalForm.module.css';
import {Button, Modal} from 'antd';
import {NavLink} from 'react-router-dom';
import {CloseOutlined} from '@ant-design/icons/lib';
import EntityForm from './EntityForm';
import {IDirector, IMovie} from '../../types/models';
import {TField} from '../common/Fields/helpers';
import {Formik, FormikHelpers} from 'formik';

type TInitialValues = { [key: string]: any };
export type TFormMode = 'Edit' | 'Add';

type PropsType = {
    id: string
    entity: 'movie' | 'director'
    data?: IMovie | IDirector
    fields: Array<TField<any>>
    initialValues: TInitialValues
    handleSubmit: (values: any, setSubmitting: (submitting: boolean) => void, formMode: TFormMode) => void
};

const ModalForm: React.FC<PropsType> = ({entity, id, data, fields, initialValues, handleSubmit}) => {
    const [values, setValues] = useState(initialValues);
    const ENTITY_URL = `/${entity}s`;
    const formMode = id ? 'Edit' : 'Add';

    const getVariables = (values: TInitialValues, mode: TFormMode) => {
        if (mode === 'Edit') return {...values, id};

        return values;
    }

    const onSubmit = (values: TInitialValues, {setSubmitting}: FormikHelpers<TInitialValues>) => {
        handleSubmit(getVariables(values, formMode), setSubmitting, formMode);
    };

    useEffect(() => {
        if (formMode === 'Edit' && data) {
            const newValues = {...values};

            Object.keys(values).forEach(key => {
                let value = data[key as keyof typeof data] as any;

                if (key.includes('Id')) {
                    const dataKey = key.replace(/Id/, '');

                    value = data[dataKey as keyof typeof data] as any;
                    value = value.id;
                }

                newValues[key as keyof TInitialValues] = value;
            });

            setValues(newValues);
        }
    }, [data, formMode]);

    return (
        <Formik initialValues={values} onSubmit={onSubmit} enableReinitialize>
            {
                ({submitForm, isSubmitting}) => (
                    <Modal
                        visible
                        title={`${formMode} ${entity}`}
                        closeIcon={<NavLink to={ENTITY_URL}><CloseOutlined className={style.closeIcon}/></NavLink>}
                        footer={[
                            <NavLink key='cancel' to={ENTITY_URL}>
                                <Button>Cancel</Button>
                            </NavLink>,
                            <Button
                                disabled={isSubmitting}
                                onClick={submitForm}
                                className={style.submitBtn}
                                key='submit'
                                type='primary'
                            >
                                {formMode}
                            </Button>
                        ]}
                    >
                        <EntityForm fields={fields}/>
                    </Modal>
                )
            }
        </Formik>
    )
};

export default ModalForm;