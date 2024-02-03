export interface TokenObtainPairBody {
    username: string;
    password: string;
}

export interface TokenObtainPairResponse {
    access: string;
    refresh: string;
}

export interface TokenRefreshBody {
    refresh: string;
}

export interface TokenRefreshResponse extends TokenObtainPairResponse {}

export interface UserDetailsResponse {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_superuser: boolean;
    groups: number[];
}