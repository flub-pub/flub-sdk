export class UtilMisc {

    isBrowser(): boolean {
        const isBrowser = new Function("try {return this===window;}catch(e){ return false;}")
        return isBrowser()
    }

    setLocalStore(key: string, value: any): any {
        if (this.isBrowser()) {
            window.localStorage.setItem(key, JSON.stringify(value))
        }
        return null
    }

    getLocalStore(key: string): any {
        if (this.isBrowser()) {
            const value = window.localStorage.getItem(key)
            if (value) {
                return JSON.parse(value)
            }
        }
        return null
    }
}
