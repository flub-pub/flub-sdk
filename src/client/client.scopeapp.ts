import { ClientBase } from './client.base'
import { Http } from '../http'

export class ScopeApp extends ClientBase {
    public base_prefix: string

    constructor(context: any, base_prefix: string) {
        super(context)
        this.ctx = context
        this.base_prefix = base_prefix
    }

    async add(options: any, headers: any = null): Promise<Http.ResponsesI> {
        const { ownerId, name, description = '' } = options
        const bodyObj = { ownerId, name, description }
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify(bodyObj)
        }))
    }

    async get(options: any, headers: any = null): Promise<Http.ResponsesI> {
        const { id = '' } = options
        const baseUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}`
        const queryUrl = this.ctx.UtilUrls.addQueryToUrl(baseUrl, [
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
        const { id = '' } = options
        const bodyObj = { id }
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.deleteAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify(bodyObj)
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

    async verify(options: any = {}, headers: any = null): Promise<Http.ResponsesI> {
        const { clientId = '', clientSecret = '' } = options
        const bodyObj = {
            ...(clientId ? { clientId } : {}),
            ...(clientSecret ? { clientSecret } : {}),
        }
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/verify`
        const response = await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.postAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getRefreshToken()}`,
                'X-Client-Id': clientId,
                'X-Client-Secret': clientSecret,
                ...(headers ? headers : {})
            },
            body: JSON.stringify(bodyObj)
        }))
        return response
    }
}

