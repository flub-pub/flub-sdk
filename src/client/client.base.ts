export class ClientBase {
    public ctx: any
    public base_prefix: string

    constructor(context: any, base_prefix: string) {
        this.ctx = context
        this.base_prefix = base_prefix
    }


    getAccessToken(): string {
        if (this.ctx.UtilMisc.isBrowser()) {
            const storageObj = this.ctx.UtilMisc.getLocalStore(this.ctx.storageName)
            return this.ctx.accessToken || (storageObj ? storageObj.accessToken : '')
        } else {
            return this.ctx.accessToken
        }
    }

    setAccessToken(token: string) {
        this.ctx.accessToken = token
        if (this.ctx.UtilMisc.isBrowser()) {
            const storageObj = this.ctx.UtilMisc.getLocalStore(this.ctx.storageName) || {}
            this.ctx.UtilMisc.setLocalStore(this.ctx.storageName, { ...storageObj, accessToken: token })
        }
    }

    getRefreshToken(): string {
        if (this.ctx.UtilMisc.isBrowser()) {
            const storageObj = this.ctx.UtilMisc.getLocalStore(this.ctx.storageName)
            return this.ctx.refreshToken || (storageObj ? storageObj.refreshToken : '')
        } else {
            return this.ctx.refreshToken
        }
    }

    setRefreshToken(token: string) {
        this.ctx.refreshToken = token
        if (this.ctx.UtilMisc.isBrowser()) {
            const storageObj = this.ctx.UtilMisc.getLocalStore(this.ctx.storageName) || {}
            this.ctx.UtilMisc.setLocalStore(this.ctx.storageName, { ...storageObj, refreshToken: token })
        }
    }

    getOauthToken(provider: string): any {
        if (provider in this.ctx.oauthTokens) {
            return this.ctx.oauthTokens[provider]
        } else {
            return null
        }
    }
}