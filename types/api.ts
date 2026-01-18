export type ApiErrors<T> = {
    [K in keyof T]?: string[]
} & {non_field_errors: string[]}