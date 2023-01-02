import fetch from 'cross-fetch'

export class Services {

    async getAsync(url: string, options: any = {}): Promise<Response> {
        return await fetch(url, {
            method: 'GET',
            ...options
        })
    }

    async postAsync(url: string, options: any = {}): Promise<Response> {
        return await fetch(url, {
            method: 'POST',
            ...options
        })
    }

    async putAsync(url: string, options: any = {}): Promise<Response> {
        return await fetch(url, {
            method: 'PUT',
            ...options
        })
    }

    async patchAsync(url: string, options: any = {}): Promise<Response> {
        return await fetch(url, {
            method: 'PATCH',
            ...options
        })
    }

    async deleteAsync(url: string, options: any = {}): Promise<Response> {
        return await fetch(url, {
            method: 'DELETE',
            ...options
        })
    }
}
