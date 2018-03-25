import * as React from "react";
import * as PropTypes from "prop-types";
import { default as PlainSelect, ReactSelectProps, OptionValues, Option, OnChangeHandler, } from "react-select";

import { InputContextTypes, InputContext } from "react-context-form";
import { getChangeHandler } from "../helpers/handleChange";
import { getRefHandler } from "../helpers/setRef";

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
            ref: this.handleRef
        }

        return <this.PlainSelect {...childProps} />
    }

    protected handleRef =  getRefHandler(this);

    protected handleChange: OnChangeHandler<TValue> = getChangeHandler(this);
}
