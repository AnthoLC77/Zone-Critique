export interface User {
    id?: number
    username: string
    name: string
    email: string
    password: string
    role?: Role
    favorites?: string[],
    reviews?: string[]
}

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}