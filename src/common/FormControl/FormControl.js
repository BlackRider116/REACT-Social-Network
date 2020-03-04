import React from 'react';
import styles from './FormControl.module.css'
import { Field} from "redux-form";

const InputType = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <span className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
                {props.types === "input" ? <input {...input} {...props} /> 
                                        : <textarea {...input} {...props} />}
                 {hasError && <span className={styles.errorText}>{meta.error}</span>}                        
        </span>
    )
}

export const fieldValue = (validate, name, types, placeholder, type) => {
    return <Field
        validate={validate}
        name={name}
        placeholder={placeholder}
        type={type}
        component={InputType}
        types={types}
    />
}