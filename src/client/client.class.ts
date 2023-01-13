import { Config } from '../config'
import { Http } from '../http'
import { Util } from '../util'
import { ClientBase } from './client.base'
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
    public storageName: string
    public accessToken: string
    public refreshToken: string
    public clientId: string
    public clientSecret: string
    public Base: any
    public AuthUser: any
    public OrgUser: any
    public ScopeApp: any
    public ApiKey: any

    constructor(config: Config.InitI) {

        // Initialize configuration
        this.Config = new Config.Init(config)

        // Initialize internal classes
        this.HttpServices = new Http.Services()
        this.HttpResponses = new Http.Responses()
        this.UtilMisc = new Util.Misc()
        this.UtilUrls = new Util.Urls()

        // Instantiate chained classes
        this.Base = new ClientBase(this)
        this.AuthUser = new AuthUser(this, '/auth/user')
        this.OrgUser = new OrgUser(this, '/org/user')
        this.ScopeApp = new ScopeApp(this, '/scope/app')
        this.ApiKey = new ApiKey(this, '/api/key')

        // Initialize states
        this.storageName = this.Config.storageName || 'FlubStore'
        this.accessToken = this.Config.accessToken || this.Base.getAccessToken() || ''
        this.refreshToken = this.Config.refreshToken || this.Base.getRefreshToken() || ''
        this.clientId = this.Config.clientId || this.Base.getClientId() || ''
        this.clientSecret = this.Config.clientSecret || this.Base.getClientSecret() || ''
    }
}
