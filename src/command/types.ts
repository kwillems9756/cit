export interface templateConfig {
    version: string,
    description: string,
    arguments: {[field: string]: {
        type: "string" | "number" | "boolean",
        description: string,
        default?: string | number | boolean
    }}
}