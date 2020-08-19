import React from 'react';
import {InputPropsType, FormikInput, FormikCheckbox, FormikSelect} from './FormikFields';

type TFieldsTypes = 'text' | 'number' | 'checkbox' | 'select';

export type TField<V, P = InputPropsType> = Omit<InputPropsType, 'name'> & {
    name: keyof V,
    type: TFieldsTypes
};

export function createField<V>({type, ...props}: TField<V>) {
    switch (type) {
        case 'text':
            return <FormikInput {...props}/>
        case 'checkbox':
            return <FormikCheckbox {...props}/>
        case 'number':
            return <FormikInput {...props} type='number'/>
        case 'select':
            return <FormikSelect {...props}/>
        default:
            return <FormikInput {...props}/>
    }
}