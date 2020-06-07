export class TokenModelSuspicious {
    constructor(
        public token: TokenModel
    ) {}
}

export class TokenModel {
    constructor(
        public token: AccessToken,
        public success: boolean,
        public message: string
    ) {}
}

export class AccessToken {
    constructor(
        public refreshToken: RefreshToken,
        public token: string,
        public expiration: number
    ) {}
}

export class RefreshToken {
    constructor(
        public token: string,
        public expiration: number
    ) {}
}

export class RefreshTokenCredentials {
    constructor(
        public token: string,
        public login: string
    ) {}
}