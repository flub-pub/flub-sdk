import { Config, IConfig } from '../config'
import { HttpServices, HttpResponses } from '../http'
import { UtilMisc } from '../util'
import { UtilUrls } from '../util'
import { AuthUser } from './client.authuser'
import { OrgUser } from './client.orguser'
import { ApiKey } from './client.apikey'
import { ScopeApp } from './client.scopeapp'

export class Client {
    public Config: any
    public HttpServices: any
    public HttpResponses: any
    public UtilMisc: any
    public UtilUrls: any
    public accessToken: string
    public refreshToken: string
    public storageName: string
    public oauthTokens: any
    public AuthUser: any
    public OrgUser: any
    public ApiKey: any
    public ScopeApp: any

    constructor(config: IConfig) {

        // Initialize configuration
        this.Config = new Config(config)

        // Initialize internal classes
        this.HttpServices = new HttpServices()
        this.HttpResponses = new HttpResponses()
        this.UtilMisc = new UtilMisc()
        this.UtilUrls = new UtilUrls()

        // Instantiate chained classes
        this.AuthUser = new AuthUser(this, '/auth/user')
        this.OrgUser = new ApiKey(this, '/org/user')
        this.ApiKey = new ApiKey(this, '/api/key')
        this.ScopeApp = new ScopeApp(this, '/scope/app')

        // Initialize states
        this.accessToken = this.Config.accessToken || this.AuthUser.getAccessToken() || ''
        this.refreshToken = this.Config.refreshToken || this.AuthUser.getRefreshToken() || ''
        this.storageName = this.Config.storageName || 'FlubStore'
        this.oauthTokens = {}
    }
}
