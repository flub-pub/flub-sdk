import { InitI as ConfigInitI } from './config.init'
import { Init as ConfigInit } from './config.init'

export namespace Config {
    export interface InitI extends ConfigInitI {}
    export const Init = ConfigInit
}