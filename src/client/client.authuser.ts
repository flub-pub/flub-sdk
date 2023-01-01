import { IHttpResponse } from '../http'

export class AuthUser {
    private ctx: any
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

    async add(options: any, headers: any = null): Promise<IHttpResponse> {
        const { username, email, password, roles = ['user'] } = options
        const bodyObj = { username, email, password, roles }
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify(bodyObj)
        }))
    }

    async update(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '', updates = {} } = options
        const bodyObj = { email: email, username: username, id: id, updates: updates }
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.putAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify(bodyObj)
        }))
    }

    async getAll(headers: any = null): Promise<IHttpResponse> {
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/list`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.getAsync(queryUrl, {
            headers: {
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            }
        }))
    }

    async get(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '' } = options
        const baseUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}`
        const queryUrl = this.ctx.UtilUrls.addQueryToUrl(baseUrl, [
            `email=${email}`,
            `username=${username}`,
            `id=${id}`
        ])
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.getAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
        }))
    }

    async delete(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '' } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.deleteAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ email, username, id })
        }))
    }

    async login(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '', password, otp = '' } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/login`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ email, username, id, password, otp })
        }))
        if (response.status === 200) {
            this.setAccessToken(response.data.accessToken)
            this.setRefreshToken(response.data.refreshToken)
        }
        return response
    }

    async logout(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '' } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/logout`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ email, username, id })
        }))
        if (response.status === 200) {
            this.setAccessToken('')
            this.setRefreshToken('')
        }
        return response
    }

    async refresh(headers: any = null): Promise<IHttpResponse> {
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/refresh`
        const response = this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.getAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getRefreshToken()}`,
                ...(headers ? headers : {})
            }
        }))
        if (response.status === 200) {
            this.setAccessToken(response.data.accessToken)
            this.setRefreshToken(response.data.refreshToken)
        }
        return response
    }

    async verify(headers: any = null): Promise<IHttpResponse> {
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/verify`
        const response = this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.getAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getRefreshToken()}`,
                ...(headers ? headers : {})
            }
        }))
        if (response.status === 200) {
            this.setAccessToken(response.data.accessToken)
            this.setRefreshToken(response.data.refreshToken)
        }
        return response
    }

    async activate(options: any, headers: any = null): Promise<IHttpResponse> {
        const { token, otp } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/activate`
        const response = this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ token, otp })
        }))
        return response
    }

    async activateResend(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '' } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/activate/resend`
        const response = this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ email, username, id })
        }))
        return response
    }

    async recover(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '', redirectUrl = '' } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/recover`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ email, username, id, redirectUrl })
        }))
    }

    async reset(options: any, headers: any = null): Promise<IHttpResponse> {
        const { token, password, redirectUrl = '' } = options
        if (!password) {
            const baseUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/reset`
            const queryUrl = this.ctx.UtilUrls.addQueryToUrl(baseUrl, [
                `token=${token}`,
                `source=client`,
                `redirectUrl=${redirectUrl}`
            ])
            return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.getAsync(queryUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(headers ? headers : {})
                }
            }))
        } else {
            const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/reset`
            return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(headers ? headers : {})
                },
                body: JSON.stringify({ token, password })
            }))
        }
    }

    async toggle2fa(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/2fa`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ email })
        }))
    }

    async oauthGetProviders(options: any, headers: any = null): Promise<IHttpResponse> {
        const { redirectUrl } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/oauth`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ redirectUrl })
        }))
        if (response.status === 200) {
            for (const provider in response.data) {
                this.ctx.oauthTokens[provider] = {
                    token: response.data[provider].token
                }
            }
        }
        return response
    }

    async oauthLogin(options: any, headers: any = null): Promise<IHttpResponse> {
        const { token } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/oauth`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.putAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ token })
        }))
        return response
    }

    async addScopes(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '', scope_ids = [] } = options
        const bodyObj = { email, username, id, scope_ids }
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/scopes`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify(bodyObj)
        }))
    }

    async getScopes(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '' } = options
        const baseUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}`
        const queryUrl = this.ctx.UtilUrls.addQueryToUrl(baseUrl, [
            `email=${email}`,
            `username=${username}`,
            `id=${id}`
        ])
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.getAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
        }))
    }

    async updateScopes(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '', scope_ids = [] } = options
        const bodyObj = { email, username, id, scope_ids }
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/scopes`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.putAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify(bodyObj)
        }))
    }

    async deleteScopes(options: any, headers: any = null): Promise<IHttpResponse> {
        const { email = '', username = '', id = '', scope_ids = [] } = options
        const bodyObj = { email, username, id, scope_ids }
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/scopes`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.deleteAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify(bodyObj)
        }))
    }
}
