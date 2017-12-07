# React Context Form Select
[react-select](https://github.com/JedWatson/react-select) integration with [react-context-form](https://github.com/Horat1us/react-context-form)

## Usage
```typescript
import * as React from "react";
import { Form, FormGroup, SubmitButton } from "react-context-form";
import { Select } from "react-context-form-select";
import { Options } from "react-select";
import { instantiateTestModel } from "./test";

export enum Role = {
    admin: "Admin",
    user: "User",
}  

class RoleSelect extends Select<Role> {};

const options: Options<Role> = Object.values(Role).map((value: string) => return {label: value, value: value});

export const Form: React.SFC<{}> = () => (
    <Form instantiate={instantiateTestModel}>
        <FormGroup name="role">
            <RoleSelect options={options}>
        </FormGroup>
        <SubmitButton loadingComponent={<span>Loading...</span>}>Send</SubmitButton>
    </Form>
)

```

## TODO
- Tests

## License 
[MIT](./LICENSE)