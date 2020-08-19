import React from 'react';
import {InputPropsType, FormikInput, FormikCheckbox, FormikSelect} from './FormikFields';

type TFieldsTypes = 'text' | 'number' | 'checkbox' | 'select';

export type TField<V = string, P = InputPropsType> = Omit<InputPropsType, 'name'> & {
    name: keyof V
    type: TFieldsTypes
    options?: any
};

export function createField<V>({type, options, ...props}: TField<V>) {
    switch (type) {
        case 'text':
            return <FormikInput {...props}/>
        case 'checkbox':
            return <FormikCheckbox {...props} type={type}/>
        case 'number':
            return <FormikInput {...props} type='number'/>
        case 'select':
            return <FormikSelect {...props} options={options}/>
        default:
            return <FormikInput {...props}/>
    }
}