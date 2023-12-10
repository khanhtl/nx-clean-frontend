import { DataError, Either } from "../common";
import { Product } from "../entity/../entities";

export interface IProductsRepository {
    get(filter?: string): Promise<Either<DataError, Product[]>>;
}