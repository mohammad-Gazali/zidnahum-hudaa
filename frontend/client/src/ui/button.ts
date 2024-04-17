import React from "react";
import { createComponent } from "@lit/react";
import { MdFilledButton } from "@material/web/button/filled-button";
import { MdIconButton } from "@material/web/iconbutton/icon-button";

export const FilledButton = createComponent({
    react: React,
    elementClass: MdFilledButton,
    tagName: 'md-filled-button',
});

export const IconButton = createComponent({
    react: React,
    elementClass: MdIconButton,
    tagName: 'md-icon-button',
})