import { OnChangeHandler, Option } from "react-select";
import { FormGroupContextValue } from "react-context-form";

export const getChangeHandler = (self: { context: FormGroupContextValue }) =>
    (option: Option<any>) => self.context.onChange(option ? option.value : undefined);
