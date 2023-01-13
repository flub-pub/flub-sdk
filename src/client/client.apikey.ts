import { ClientBase } from './client.base'
import { Http } from '../http'

export class ApiKey extends ClientBase {
    public base_prefix: string

    constructor(context: any, base_prefix: string) {
        super(context)
        this.ctx = context
        this.base_prefix = base_prefix
    }
}
