import { ProductsFakeStoreRepository, ProductsInMemoryRepository } from '@genz-shop/infrastructure';
import { ProductsService } from "@genz-shop/core";
import { ProductsBloc } from "@genz-shop/presenter";

export function provideProductsBloc(): ProductsBloc {
    const productsRepository = new ProductsFakeStoreRepository();
    const productsService = new ProductsService(productsRepository);
    const productsPloc = new ProductsBloc(productsService);

    return productsPloc;
}