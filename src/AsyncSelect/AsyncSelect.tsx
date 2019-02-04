import * as React from "react";
import { Async, ReactSelectProps, OptionValues, Option, OnChangeHandler, ReactAsyncSelectProps, } from "react-select";

import { FormGroupContext, FormGroupContextValue } from "react-context-form";
import { getChangeHandler } from "../helpers/handleChange";
import { getRefHandler } from "../helpers/setRef";

export const AsyncSelectDefaultProps: {[K in keyof ReactAsyncSelectProps]?: ReactAsyncSelectProps[K]} = {
    className: "form-control",
    filterOptions: (options) => options,
}

export class AsyncSelect<TValue = OptionValues> extends React.Component<ReactAsyncSelectProps<TValue>> {
    public static readonly contextType = FormGroupContext;
    public readonly context: FormGroupContextValue<TValue>;

    protected PlainSelect = class extends Async<TValue> { };

    public render() {
        const childProps: ReactAsyncSelectProps<TValue> = {
            ...this.props,

            name: this.context.name,
            value: this.context.value,

            onChange: this.handleChange,
            onBlur: this.context.onBlur,
            onFocus: this.context.onFocus,
            ref: this.handleRef
        }

        return <this.PlainSelect {...childProps as any} />
    }

    protected handleRef =  getRefHandler(this);

    protected handleChange: OnChangeHandler<TValue> = getChangeHandler(this);
}
