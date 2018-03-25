import { InputContext } from "react-context-form";

export const getRefHandler = (self: { context: InputContext }) => (element) => {
    if (!element || !element.input) {
        return;
    }

    self.context.onMount(element.input);
};
