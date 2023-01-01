import { Config } from './config'
import { Client } from './client'
import { HttpServices, HttpResponses } from './http'

const FlubSDK = {
    Config: Config,
    Client: Client,
    HttpServices: new HttpServices(),
    HttpResponses: new HttpResponses()
}

export default FlubSDK
