import axios, { AxiosResponse } from "axios"



export class HttpServiceClient{

    baseUrl:string = "https://localhost:5050/"

    private url (requestParameters: Partial<RequestParameters>):string{
        return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.
          controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`
      }

    async getAsync<T>(requestParameters: Partial<RequestParameters>, id?:string):Promise<T>{

        let url:string = ""

        if(requestParameters.fullEndPoint)
            url = requestParameters.fullEndPoint
        else
        url = `${this.url(requestParameters)}${id ? `/${id}` : ""}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

        const response: AxiosResponse<T> = await axios.get<T>(url, {headers: requestParameters.headers})

        return response.data;
    }

}

export class RequestParameters{
    controller?: string
    action?:string
    queryString?:string
    baseUrl?:string
    headers?:any
    fullEndPoint?:string 
  }

  const Customheaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer myToken`
  };
