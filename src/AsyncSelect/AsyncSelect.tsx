import * as React from "react";
import * as PropTypes from "prop-types";
import { Async, ReactSelectProps, OptionValues, Option, OnChangeHandler, ReactAsyncSelectProps, } from "react-select";

import { InputContextTypes, InputContext } from "react-context-form";
import { handleChange } from "../helpers/handleChange";

export const AsyncSelectDefaultProps: {[K in keyof ReactAsyncSelectProps]?: ReactAsyncSelectProps[K]} = {
    className: "form-control",
    filterOptions: (options) => options,
}

export class AsyncSelect<TValue = OptionValues> extends React.Component<ReactAsyncSelectProps<TValue>> {
    public static readonly contextTypes = InputContextTypes;
    public readonly context: InputContext<TValue>;

    protected PlainSelect = class extends Async<TValue> { };

    public render() {
        const childProps: ReactAsyncSelectProps<TValue> = {
            ...this.props,

            name: this.context.name,
            value: this.context.value,

            onChange: this.handleChange,
            onBlur: this.context.onBlur,
            onFocus: this.context.onFocus,
        }

        return <this.PlainSelect {...childProps as any} />
    }

    protected handleChange: OnChangeHandler<TValue> = handleChange.bind(this);
}
