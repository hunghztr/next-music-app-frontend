/* eslint-disable prefer-const */
import queryString from "query-string"
export const sendRequest = async  <T>(props : IRequest) =>{
  
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOptions = {}
  } = props
  const options: any ={
    method:method,
    headers: new Headers({"content-type":"application/json",...headers}),
    body: body ? JSON.stringify(body) : null ,
    ...nextOptions
  }
  if(useCredentials){
    options.credentials = "include"
  }
  if(queryParams){
    url = `${url}?${queryString.stringify(queryParams)}`
  }
  return fetch(url,options).then(res => {
    if(res.ok){
      return res.json() as T
    }else{
      return res.json().then(function (json){
        return {
          statusCode:res.status,
          message:json?.message ?? "",
          error:json?.error ?? ""
        } as T
      })
    }
  })
}
export const sendRequestFile = async  <T>(props : IRequest) =>{

  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOptions = {}
  } = props
  const options: any ={
    method:method,
    headers: new Headers({...headers}),
    body: body ? body : null ,
    ...nextOptions
  }
  if(useCredentials){
    options.credentials = "include"
  }
  if(queryParams){
    url = `${url}?${queryString.stringify(queryParams)}`
  }
  return fetch(url,options).then(res => {
    if(res.ok){
      return res.json() as T
    }else{
      return res.json().then(function (json){
        return {
          statusCode:res.status,
          message:json?.message ?? "",
          error:json?.error ?? ""
        } as T
      })
    }
  })
}