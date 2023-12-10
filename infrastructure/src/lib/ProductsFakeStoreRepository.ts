import { Either, DataError, IProductsRepository, Product } from "@genz-shop/core";

export class ProductsFakeStoreRepository implements IProductsRepository {
    get(filter?: string): Promise<Either<DataError, Product[]>> {
        return new Promise(async (resolve, _reject) => {
            try {
                const products: Product[] = await fetch('https://fakestoreapi.com/products')
                .then(res=>res.json())
                
                if (filter) {
                    const filteredProducts = products.filter((p: Product) => {
                        return p.title.toLowerCase().includes(filter.toLowerCase());
                    });
                    resolve(Either.right(filteredProducts));
                } else {
                    resolve(Either.right(products));
                }
            } catch (error) {
                const dataError: DataError={
                    kind: 'UnexpectedError',
                    error: error
                }
                resolve(Either.left(dataError));
            }
        });
    }
}