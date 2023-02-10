import { ClientBase } from './client.base'
import { Http } from '../http'

export class AuthUser extends ClientBase {
    public base_prefix: string

    constructor(context: any, base_prefix: string) {
        super(context)
        this.ctx = context
        this.base_prefix = base_prefix
    }

    async add(options: any, headers: any = null): Promise<Http.ResponsesI> {
        const { username, email, password } = options
        const bodyObj = { username, email, password }
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify(bodyObj)
        }))
    }

    async get(options: any, headers: any = null): Promise<Http.ResponsesI> {
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

    async update(options: any, headers: any = null): Promise<Http.ResponsesI> {
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

    async delete(options: any, headers: any = null): Promise<Http.ResponsesI> {
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

    async getList(headers: any = null): Promise<Http.ResponsesI> {
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/list`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.getAsync(queryUrl, {
            headers: {
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            }
        }))
    }

    async login(options: any, headers: any = null): Promise<Http.ResponsesI> {
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

    async logout(options: any, headers: any = null): Promise<Http.ResponsesI> {
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

    async refresh(options: any = {}, headers: any = null): Promise<Http.ResponsesI> {
        const { token = '' } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/refresh`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getRefreshToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ ...(token ? { refreshToken: token } : {}) })
        }))
        if (response.status === 200) {
            this.setAccessToken(response.data.accessToken)
            this.setRefreshToken(response.data.refreshToken)
        }
        return response
    }

    async verify(options: any = {}, headers: any = null): Promise<Http.ResponsesI> {
        const { token = '' } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/verify`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getRefreshToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ ...(token ? { accessToken: token } : {}) })
        }))
        if (response.status === 200) {
            this.setAccessToken(response.data.accessToken)
            this.setRefreshToken(response.data.refreshToken)
        }
        return response
    }

    async activate(options: any, headers: any = null): Promise<Http.ResponsesI> {
        const { token = '', otp = '' } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/activate`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ token, otp })
        }))
        return response
    }

    async activateResend(options: any, headers: any = null): Promise<Http.ResponsesI> {
        const { email = '', username = '', id = '' } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/activate/resend`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ email, username, id })
        }))
        return response
    }

    async recover(options: any, headers: any = null): Promise<Http.ResponsesI> {
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

    async reset(options: any, headers: any = null): Promise<Http.ResponsesI> {
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
            return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.putAsync(queryUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(headers ? headers : {})
                },
                body: JSON.stringify({ token, password })
            }))
        }
    }

    async toggleTfa(options: any, headers: any = null): Promise<Http.ResponsesI> {
        const { email = '', username = '', id = '' } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/tfa`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ email, username, id })
        }))
    }

    async oauthGetProviders(options: any, headers: any = null): Promise<Http.ResponsesI> {
        const { redirectUrl } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/oauth`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ redirectUrl })
        }))
        return response
    }

    async oauthLogin(options: any, headers: any = null): Promise<Http.ResponsesI> {
        const { token } = options
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/oauth`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.putAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ token })
        }))
        if (response.status === 200) {
            this.setAccessToken(response.data.accessToken)
            this.setRefreshToken(response.data.refreshToken)
        }
        return response
    }
}
