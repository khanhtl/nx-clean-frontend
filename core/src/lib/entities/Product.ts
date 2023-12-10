import { EnittyState } from "../common";
export type ProductsState = EnittyState<Product>;

export const productsInitialState: ProductsState = {
    kind: "LoadingState",
    searchTerm: "",
};
export interface Product {
    id: string;
    image: string;
    title: string;
    price: number;
}