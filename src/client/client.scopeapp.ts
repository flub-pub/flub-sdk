export class ScopeApp {
    private ctx: any
    public base_prefix: string

    constructor(context: any, base_prefix: string) {
        this.ctx = context
        this.base_prefix = base_prefix
    }
}

