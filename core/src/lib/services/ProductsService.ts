import { IProductsRepository, IProductsService } from "../interfaces";
import { Product } from "../entities";
import { Either, DataError } from "../common";

export class ProductsService implements IProductsService {
    private productRepository: IProductsRepository;

    constructor(productRepository: IProductsRepository) {
        this.productRepository = productRepository;
    }

    get(filter?: string): Promise<Either<DataError, Product[]>> {
        return this.productRepository.get(filter);
    }
}