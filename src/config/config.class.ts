export interface IConfig {
    baseUrl: string,
    clientId?: string,
    clientSecret?: string,
    accessToken?: string,
    refreshToken?: string,
    storageName?: string,
}

export class Config {
    baseUrl: string
    clientId: string
    clientSecret: string
    accessToken: string
    refreshToken: string
    storageName: string

    constructor(options: any) {
        const {
            baseUrl = '',
            clientId = '',
            clientSecret = '',
            accessToken = '',
            refreshToken = '',
            storageName = ''
        } = options

        // Initialize configuration
        this.baseUrl = baseUrl
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.storageName = storageName
    }
}
