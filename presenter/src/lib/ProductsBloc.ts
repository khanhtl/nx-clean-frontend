import { DataError, Bloc, IProductsService ,productsInitialState,ProductsState  } from "@genz-shop/core";

export class ProductsBloc extends Bloc<ProductsState> {
    constructor(private productsService: IProductsService) {
        super(productsInitialState);
    }

    async search(searchTerm: string) {
        const productResult = await this.productsService.get(searchTerm);

        productResult.fold(
            error => this.changeState(this.handleError(searchTerm, error)),
            products =>
                this.changeState({
                    kind: "LoadedState",
                    data: products,
                    searchTerm,
                })
        );
    }

    private handleError(searchTerm: string, error: DataError): ProductsState {
        switch (error.kind) {
            case "UnexpectedError": {
                return {
                    searchTerm,
                    kind: "ErrorState",
                    error: "Sorry, an error has ocurred. Please try later again",
                };
            }
        }
    }
}