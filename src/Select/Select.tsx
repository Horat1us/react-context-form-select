import * as React from "react";
import * as PropTypes from "prop-types";
import { default as PlainSelect, ReactSelectProps, OptionValues, Option, OnChangeHandler, } from "react-select";

import { InputContextTypes, InputContext } from "react-context-form";
import { handleChange } from "../helpers/handleChange";

export const SelectDefaultProps: {[K in keyof ReactSelectProps]?: ReactSelectProps[K]} = {
    className: "form-control",
}

export class Select<TValue = OptionValues> extends React.Component<ReactSelectProps<TValue>> {
    public static readonly contextTypes = InputContextTypes;
    public readonly context: InputContext<TValue>;

    protected PlainSelect = class extends PlainSelect<TValue> { };

    public render() {
        const childProps: ReactSelectProps<TValue> = {
            ...this.props,

            name: this.context.name,
            value: this.context.value,

            onChange: this.handleChange,
            onBlur: this.context.onBlur,
            onFocus: this.context.onFocus,
        }

        return <this.PlainSelect {...childProps} />
    }

    protected handleChange: OnChangeHandler<TValue> = handleChange.bind(this);
}
