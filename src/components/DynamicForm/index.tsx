import React from 'react'
import {  Form, Modal, Input, Select, Table } from "antd";
import { InputProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { ModalProps } from 'antd/lib/modal';
export type DynamicTypeProps = {
    isModal: boolean
    beforeForm: JSX.Element[]
    afterForm: JSX.Element[]
}
export interface InputType {
    input: InputProps;
    select: SelectProps;
    textarea: InputProps;
    'user-select': SelectProps;
}
export type FormItem<T = keyof InputType> = (T extends keyof InputType ? FormItemDefinition<T> : any)[];
export type FormItemDefinition<T extends keyof InputType = any> = {
    type: T;
    label: string;
    key: string;
    rules?: RulesProps[];
    componentProps?: InputType[T];
};
export type DynamicFormProps = {
    hasConfirm: boolean;
    modalProps?: ModalProps;
    beforeForm?: JSX.Element[];
    afterForm?: JSX.Element[];
    formLists: FormItem;
    isModal: boolean;
    onConfirmClick?: () => void;
    setFields: (key: string, value: string) => void;
};

export function DynamicForm(props: DynamicTypeProps) {
    const { isModal, beforeForm, afterForm } = props;
    function getForm() {
        return <Form></Form>
    }
    function getFormItem() {

    }
    if (isModal) {
        return <Modal>
            {beforeForm}
            {getForm()}
            {afterForm}
        </Modal>
    }
    return getForm()
}