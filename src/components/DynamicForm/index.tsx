import React from 'react'
import {  Form, Modal, Input, Select, Table } from "antd";
import { InputProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { ModalProps } from 'antd/lib/modal';
import { Rule } from 'antd/lib/form';

export interface DynamicElements {
    input: InputProps;
    select: SelectProps<any>;
    textarea: InputProps;
    'user-select': SelectProps<any>;
}
export type FormItems<T = keyof DynamicElements> = (T extends keyof DynamicElements ? FormItemDefinition<T> : any)[];
export type FormItemDefinition<T extends keyof DynamicElements = keyof DynamicElements> = {
    type: T;
    label: string;
    key: string;
    rules?: Rule[];
    componentProps?: DynamicElements[T];
};
export type DynamicFormProps = {
    hasConfirm: boolean;
    modalProps?: ModalProps;
    beforeForm?: JSX.Element[];
    afterForm?: JSX.Element[];
    formLists: FormItems;
    isModal?: boolean;
    onConfirmClick?: () => void;
    setFields: (key: string, value: string) => void;
};
export function DynamicForm(props: DynamicFormProps) {
    const { isModal = false, modalProps = {}, beforeForm, afterForm, formLists, setFields } = props;
    function getForm() {
        return <Form>
            {formLists.map(list => getFormItem(list))}
        </Form>
    }
    function getFormItem(list: FormItemDefinition) {
        const { type, label, rules, key, componentProps: cp } = list;
        let componentProps : any = cp
        return <Form.Item label={label} key={key} rules={rules}>
            {
                (type==='input' && <Input {...componentProps} onChange={e => setFields(key, e.target.value)}></Input>)
                || (type === 'select' && <Select {...componentProps} onChange={e => setFields(key, e.toString())}></Select>)
                || (type === 'textarea' && <Input.TextArea {...componentProps} onChange={e => setFields(key,e.target.value)}></Input.TextArea>)
            }
        </Form.Item>
    }
    if (isModal) {
        return <Modal {...modalProps}>
            {beforeForm}
            {getForm()}
            {afterForm}
        </Modal>
    }
    return getForm()
}