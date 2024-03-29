import axios, { AxiosRequestConfig, AxiosResponse } from "axios"



export class HttpServiceClient{

    //baseUrl:string = "https://localhost:5050/"
    baseUrl:string = "https://localhost:7272/api"

    private url (requestParameters: Partial<RequestParameters>):string{
        return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.
          controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`
      }
    
    private getToken(config: AxiosRequestConfig){
      const token = localStorage.getItem('accessToken');
      if (token) {
        config = config || {};
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config
    }
    
    async getAsync<T>(requestParameters: Partial<RequestParameters>, id?:string):Promise<T>{

        let url:string = ""
        if(requestParameters.fullEndPoint)
            url = requestParameters.fullEndPoint
        else
        url = `${this.url(requestParameters)}${id ? `/${id}` : ""}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

        const response: AxiosResponse<T> = await axios.get<T>(url, this.getToken(requestParameters.headers))

        return response.data;
    }

    async postAsync<T>(requestParameters: Partial<RequestParameters>,body:Partial<T>):Promise<T>{

      let url:string = ""
      if(requestParameters.fullEndPoint)
        url = requestParameters.fullEndPoint
      else
        url = `${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

      const response: AxiosResponse<T> = await axios.post<T>(url, body, this.getToken(requestParameters.headers))

      return response.data

    }

    async putAsync<T>(requestParameters: Partial<RequestParameters>,body:Partial<T>):Promise<T>{
      let url:string = ""
      if(requestParameters.fullEndPoint)
        url = requestParameters.fullEndPoint
      else
        url = `${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

      const response: AxiosResponse<T> = await axios.put<T>(url, body, this.getToken(requestParameters.headers))

      return response.data

    }

    async deleteAsync<T>(requestParameters: Partial<RequestParameters>, id:string):Promise<T>{

      let url:string = ""
      if(requestParameters.fullEndPoint)
        url = requestParameters.fullEndPoint
      else
      url = `${this.url(requestParameters)}/${id}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

      const response: AxiosResponse<T> = await axios.delete<T>(url, this.getToken(requestParameters.headers))

      return response.data

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
