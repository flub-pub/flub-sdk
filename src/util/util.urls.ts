export class UtilUrls {

    addQueryToUrl(url: string, options?: any[]): string {
        if (options) {
            options.forEach(param => {
                url = url + (url.indexOf('?') === -1 ? '?' : '&') + param
            })
        }
        return url
    }
}
