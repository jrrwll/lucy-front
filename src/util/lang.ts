export function* chunk_array<T>(array: T[], size: number): Generator<T[]> {
    for (let i = 0; i < array.length; i += size) {
        yield array.slice(i, i + size);
    }
}

export type NumberFunction = (...args: number[]) => number;

/**
 * compile expr as a number function
 *
 * @param expr like: $1 + 3 * $2 - 4
 * @returns number function
 */
export function compile_number_func(expr: string): NumberFunction {
// convert $1 to a1, $2 to a2, and so on
    const body = expr.replace(/\$(\d+)/g, (_, idx) => `a${idx}`);
    const max = (body.match(/a\d+/g) ?? []).reduce(
        (m, tok) => Math.max(m, +tok.slice(1)),
        -1
    );
    const params = Array.from({ length: max }, (_, i) => `a${i + 1}`).join(",");
    return new Function(params, `return (${body})`) as NumberFunction;
}
