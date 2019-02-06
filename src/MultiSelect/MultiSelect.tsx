import * as React from "react";
import { default as PlainSelect, ReactSelectProps, OptionValues, OnChangeHandler, Option } from "react-select";

import { FormGroupContext, FormGroupContextValue } from "react-context-form";
import { getRefHandler } from "../helpers/setRef";

export class MultiSelect<TValue = OptionValues> extends React.Component<ReactSelectProps<TValue>> {
    public static readonly contextType = FormGroupContext;
    public readonly context: FormGroupContextValue<TValue>;

    protected PlainSelect = class extends PlainSelect<TValue> { };

    public render() {
        const childProps: ReactSelectProps<TValue> = {
            ...this.props,

            name: this.context.name,
            value: this.context.value,

            onChange: this.handleChange as any,
            onBlur: this.context.onBlur,
            onFocus: this.context.onFocus,
            multi: true,
            ref: this.handleRef
        }

        return <this.PlainSelect {...childProps} />
    }

    protected handleRef =  getRefHandler(this);

    protected handleChange = (option: Option<any[]>): void => {
        this.context.onChange(
            (option && option.length)
                ? option.map(({value}) => value)
                : undefined
        )
    }
}
