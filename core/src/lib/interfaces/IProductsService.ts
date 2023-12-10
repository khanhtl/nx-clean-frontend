import { Either, DataError } from "../common";
import { Product } from "../entities";

export interface IProductsService {
    get(filter?: string): Promise<Either<DataError, Product[]>>;
}