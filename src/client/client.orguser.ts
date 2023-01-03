import { ClientBase } from './client.base'
import { Http } from '../http'

export class OrgUser extends ClientBase {

    constructor(context: any, base_prefix: string) {
        super(context, base_prefix)
        this.ctx = context
        this.base_prefix = base_prefix
    }

    async add(options: any, headers: any = null): Promise<Http.ResponsesI> {
        const { ownerId } = options
        const bodyObj = { ownerId }
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
        const { id = '', updates = {} } = options
        const bodyObj = { id, updates: updates }
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
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.deleteAsync(queryUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            },
            body: JSON.stringify({ id })
        }))
    }

    async getAll(headers: any = null): Promise<Http.ResponsesI> {
        const queryUrl = `${this.ctx.Config.baseUrl}${this.base_prefix}/list`
        return await this.ctx.HttpResponses.resolveResponse(this.ctx.HttpServices.getAsync(queryUrl, {
            headers: {
                'Authorization': `Bearer ${this.getAccessToken()}`,
                ...(headers ? headers : {})
            }
        }))
    }
}
