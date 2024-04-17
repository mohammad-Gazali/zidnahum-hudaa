import React from "react";
import { MdList } from "@material/web/list/list";
import { MdListItem } from "@material/web/list/list-item";
import { createComponent } from "@lit/react";

export const List = createComponent({
    react: React,
    elementClass: MdList,
    tagName: 'md-list',
})


export const ListItem = createComponent({
    react: React,
    elementClass: MdListItem,
    tagName: 'md-list-item',
})