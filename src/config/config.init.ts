export interface InitI {
    baseUrl: string,
    clientId?: string,
    clientSecret?: string,
    accessToken?: string,
    refreshToken?: string,
    storageName?: string
}

export class Init {
    baseUrl: string
    clientId: string
    clientSecret: string
    accessToken: string
    refreshToken: string
    storageName: string

    constructor(options: InitI) {
        const {
            baseUrl = '',
            clientId = '',
            clientSecret = '',
            accessToken = '',
            refreshToken = '',
            storageName = ''
        }:InitI = options
        this.baseUrl = baseUrl
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.storageName = storageName
    }
}