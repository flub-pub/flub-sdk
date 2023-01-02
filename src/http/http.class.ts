import { ResponsesI as HttpResponsesI } from './http.responses'
import { Responses as HttpResponses } from './http.responses'
import { Services as HttpServices } from './http.services'

export namespace Http {
    export interface ResponsesI extends HttpResponsesI {}
    export const Responses = HttpResponses
    export const Services = HttpServices
}