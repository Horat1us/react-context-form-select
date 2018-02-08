import * as React from "react";
import * as PropTypes from "prop-types";

import {Async, Option} from "react-select";

export interface AsyncEntitySelectProps {
    loadOptions: () => Promise<Array<{label: string, value: any}>>;
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

    public state: AsyncEntitySelectState = {
        cache: {
            "": []
        }
    };

    public render() {
        const {loadOptions, ...props} = this.props;

        return (
            <Async
                {...props}
                loadOptions={this.loadOptions}
                cache={this.state.cache}
            />
        );
    }

    protected loadOptions = async (value: string): Promise<{ options: Option[] }> => {
        if (value.length < this.props.minLength) {
            return {options: []};
        }

        const options = await this.props.loadOptions();

        this.state.cache[""] = [...this.state.cache[""], ...options];
        this.forceUpdate();

        return {options};
    }
}
