import { OnChangeHandler, Option } from "react-select";

export const handleChange: OnChangeHandler = (option: Option) => this.context.onChange(option ? option.value : undefined);