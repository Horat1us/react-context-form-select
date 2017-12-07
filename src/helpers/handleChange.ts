import { OnChangeHandler, Option } from "react-select";
import { InputContext } from "react-context-form";

export const getChangeHandler = (self: { context: InputContext }) => (option: Option<any>) => self.context.onChange(option ? option.value : undefined);