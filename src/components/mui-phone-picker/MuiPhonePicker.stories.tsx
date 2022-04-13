import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MuiPhonePicker from "./MuiPhonePicker";
// import { HocMui } from "./MuiPhonePicker";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "ReactComponentLibrary/MuiPhonePicker",
    component: MuiPhonePicker,
} as ComponentMeta<typeof MuiPhonePicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MuiPhonePicker> = (args) => <MuiPhonePicker {...args} />;

export const MuiPhonePickerExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


