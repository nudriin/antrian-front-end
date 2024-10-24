export interface Payload {
    email: string
    exp: number
    iat: number
    id: number
    name: string
    role: string
}

export interface UserResponse {
    id: number
    email: string
    name: string
    role: string
    token?: string
}
