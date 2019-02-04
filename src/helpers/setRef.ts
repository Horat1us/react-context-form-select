import { FormGroupContextValue } from "react-context-form";

export const getRefHandler = (self: { context: FormGroupContextValue }) => (element) => {
    if (!element || !element.input) {
        return;
    }

    self.context.onMount(element.input);
};
