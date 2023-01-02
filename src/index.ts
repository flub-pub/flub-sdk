import { Config } from './config'
import { Client } from './client'
import { Http } from './http'

const FlubSDK = {
    Config: Config,
    Client: Client,
    HttpServices: new Http.Services(),
    HttpResponses: new Http.Responses()
}

export default FlubSDK
