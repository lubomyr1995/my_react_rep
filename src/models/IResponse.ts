import {IPage} from "./IPage.ts";

export interface IResponse<Item> {
    total_items: number;
    total_pages: number;
    prev: IPage | null;
    next: IPage | null;
    items: Item;
}