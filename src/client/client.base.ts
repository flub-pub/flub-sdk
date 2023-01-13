export class ClientBase {
    public ctx: any

    constructor(context: any) {
        this.ctx = context
    }

    getAccessToken(): string {
        if (this.ctx.UtilMisc.isBrowser()) {
            const storageObj = this.ctx.UtilMisc.getLocalStore(this.ctx.storageName)
            return storageObj ? storageObj.accessToken : this.ctx.accessToken
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
            return storageObj ? storageObj.refreshToken : this.ctx.refreshToken
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

    getClientId(): string {
        if (this.ctx.UtilMisc.isBrowser()) {
            const storageObj = this.ctx.UtilMisc.getLocalStore(this.ctx.storageName)
            return storageObj ? storageObj.clientId : this.ctx.clientId
        } else {
            return this.ctx.clientId
        }
    }

    setClientId(clientId: string) {
        this.ctx.clientId = clientId
        if (this.ctx.UtilMisc.isBrowser()) {
            const storageObj = this.ctx.UtilMisc.getLocalStore(this.ctx.storageName) || {}
            this.ctx.UtilMisc.setLocalStore(this.ctx.storageName, { ...storageObj, clientId: clientId })
        }
    }

    getClientSecret(): string {
        if (this.ctx.UtilMisc.isBrowser()) {
            const storageObj = this.ctx.UtilMisc.getLocalStore(this.ctx.storageName)
            return storageObj ? storageObj.clientSecret : this.ctx.clientSecret
        } else {
            return this.ctx.clientSecret
        }
    }

    setClientSecret(clientSecret: string) {
        this.ctx.clientId = clientSecret
        if (this.ctx.UtilMisc.isBrowser()) {
            const storageObj = this.ctx.UtilMisc.getLocalStore(this.ctx.storageName) || {}
            this.ctx.UtilMisc.setLocalStore(this.ctx.storageName, { ...storageObj, clientSecret: clientSecret })
        }
    }
}