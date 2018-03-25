import * as React from "react";
import * as PropTypes from "prop-types";

import {Async, Option, OnChangeHandler, ReactAsyncSelectProps} from "react-select";
import { InputContextTypes, InputContext } from "react-context-form";

import { getChangeHandler } from "../helpers/handleChange";
import { getRefHandler } from "../helpers/setRef";

export interface AsyncEntitySelectProps extends ReactAsyncSelectProps {
    loadOptions: (value: string) => Promise<Option[]>;
    minLength?: number;
}

export const AsyncEntitySelectPropTypes = {
    loadOptions: PropTypes.func.isRequired,
    minLength: PropTypes.number,
};

export const AsyncEntitySelectDefaultProps = {
    minLength: 3,
};

export interface AsyncEntitySelectState {
    cache: { [T: string]: Option[] };
}

export class AsyncEntitySelect
    extends React.Component<AsyncEntitySelectProps, AsyncEntitySelectState> {

    public static readonly propTypes = AsyncEntitySelectPropTypes;
    public static readonly defaultProps = AsyncEntitySelectDefaultProps;
    public static readonly contextTypes = InputContextTypes;
    public readonly context: InputContext;

    public state: AsyncEntitySelectState = {
        cache: {
            "": []
        }
    };

    protected handleChange: OnChangeHandler = getChangeHandler(this);

    public render() {
        const {loadOptions, minLength, ...props} = this.props;

        const childProps: ReactAsyncSelectProps = {
            ...props,

            name: this.context.name,
            value: this.context.value,

            onChange: this.handleChange,
            onBlur: this.context.onBlur,
            onFocus: this.context.onFocus,
            loadOptions: this.loadOptions,
            cache: this.state.cache,
            ref: getRefHandler(this)
        };
        return (
            <Async {...childProps as any}/>
        );
    }

    protected loadOptions = async (value: string): Promise<{ options: Option[] }> => {
        if (value.length < this.props.minLength) {
            return {options: []};
        }

        const options = await this.props.loadOptions(value);

        this.state.cache[""] = [...this.state.cache[""], ...options];
        this.forceUpdate();

        return {options};
    }
}
