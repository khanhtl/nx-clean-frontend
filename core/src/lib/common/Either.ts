type Left<L> = { kind: "left"; leftValue: L };
type Right<R> = { kind: "right"; rightValue: R };

type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
    private constructor(private readonly value: EitherValue<L, R>) {}
    /**
     * Tạo object bên trái
     * @param value 
     */
    static left<L, R>(value: L) {
        return new Either<L, R>({ kind: "left", leftValue: value });
    }
    /**
     * Tạo object bên phải
     * @param value 
     */
    static right<L, R>(value: R) {
        return new Either<L, R>({ kind: "right", rightValue: value });
    }
    /**
     * Kiểm tra có phải giá trị đang nằm ở bên trái
     */
    isLeft(): boolean {
        return this.value.kind === "left";
    }
    /**
     * Kiểm tra có phải giá trị đang nằm ở bên phải
     */
    isRight(): boolean {
        return this.value.kind === "right";
    }
    /**
     * Biến đổi giá trị theo hàm truyền vào
     * @param leftFn 
     * @param rightFn 
     */
    fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
        switch (this.value.kind) {
            case "left":
                return leftFn(this.value.leftValue);
            case "right":
                return rightFn(this.value.rightValue);
        }
    }

    map<T>(fn: (r: R) => T): Either<L, T> {
        return this.flatMap(r => Either.right(fn(r)));
    }

    flatMap<T>(fn: (right: R) => Either<L, T>): Either<L, T> {
        return this.fold(
            leftValue => Either.left(leftValue),
            rightValue => fn(rightValue)
        );
    }

    mapLeft<T>(fn: (l: L) => T): Either<T, R> {
        return this.flatMapLeft(l => Either.left(fn(l)));
    }

    flatMapLeft<T>(fn: (left: L) => Either<T, R>): Either<T, R> {
        return this.fold(
            leftValue => fn(leftValue),
            rightValue => Either.right(rightValue)
        );
    }
    /**
     * Lấy về giá trị hoặc trả về message lỗi
     * @param errorMessage 
     */
    get(errorMessage?: string): R {
        return this.getOrThrow(errorMessage);
    }
    /**
     * Lấy về giá trị hoặc trả về message lỗi
     * @param errorMessage 
     */
    getOrThrow(errorMessage?: string): R {
        const throwFn = () => {
            throw Error(
                errorMessage
                    ? errorMessage
                    : "An error has ocurred retrieving value: " + JSON.stringify(this.value)
            );
        };

        return this.fold(
            () => throwFn(),
            rightValue => rightValue
        );
    }
    /**
     * Lấy object data
     */
    getLeft(): L {
        const throwFn = () => {
            throw Error("The value is right: " + JSON.stringify(this.value));
        };

        return this.fold(
            leftValue => leftValue,
            () => throwFn()
        );
    }
    /**
     * Lấy data, nếu không có thì trả về default
     */
    getOrElse(defaultValue: R): R {
        return this.fold(
            () => defaultValue,
            someValue => someValue
        );
    }

}