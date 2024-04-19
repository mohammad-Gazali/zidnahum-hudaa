import React from "react";
import { createComponent } from "@lit/react";
import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";

export const TextField = createComponent({
    react: React,
    elementClass: MdOutlinedTextField,
    tagName: "md-outlined-text-field",
})