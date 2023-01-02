export interface ResponsesI {
    data: any
    status: number|null
    statusType: string,
    statusText: string,
    code: string,
    success: boolean
    message: any
    errors: any
}

export class Responses {

    async resolveResponse(responsePromise: Response): Promise<ResponsesI> {
        try {
            const response = await responsePromise
            const {
                data,
                message,
                status,
                statusType,
                statusText,
                code,
            } = await response.json()
            return {
                data: data,
                status: status,
                statusType: statusType,
                statusText: statusText,
                code: code,
                success: statusType === 'success',
                message: message,
                errors: null
            }
        } catch (error) {
            return {
                data: null,
                status: 500,
                statusType: 'error',
                statusText: 'Internal Server Error',
                code: '',
                success: false,
                message: null,
                errors: error
            }
        }
    }
}