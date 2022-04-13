import React from "react";
import { render } from "@testing-library/react";

import MuiPhonePicker from "./MuiPhonePicker";

describe("Button", () => {
    test("renders the Button component", () => {
        render(<MuiPhonePicker />);
    });
});