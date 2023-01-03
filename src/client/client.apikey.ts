import { ClientBase } from './client.base'
import { Http } from '../http'

export class ApiKey extends ClientBase {

    constructor(context: any, base_prefix: string) {
        super(context, base_prefix)
        this.ctx = context
        this.base_prefix = base_prefix
    }
}
