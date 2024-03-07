import * as React from "react";
import { Report } from "../component";
import { ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Components/Report",
    component: Report,
} as ComponentMeta<typeof Report>;

export const Render = () => <Report />;
