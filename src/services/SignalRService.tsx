import React, { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { errorToastr, infoToastr, successToastr } from './ToastrServiceClient';
import Hubs, { IHubData } from '../constDatas/SignalRConst';




export default class SignalRService{

   start = async (url:string, procedureName:string) =>{
    const connection: IHubData | undefined = Hubs.hubsArray.find((item: IHubData) => item.mapName === url);
    if(connection == undefined){

    
        const hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7272/"+url)
        .withAutomaticReconnect()
        .build();
    
    try {    
            await hubConnection.start();
            Hubs.hubsArray.push({mapName:url, hubConnection: hubConnection})
            successToastr({content:"SignalR Bağlantı Sağladnı", position:'top-right'})

      } catch (error) {
        console.log('Error connecting to SignalR: Heyyyyyyyyyyyyyy', error);
        setTimeout(()=> this.start(url,procedureName), 2000)
      } 


      
      hubConnection.onreconnected(connectionId => {
        successToastr({content:"Reconnected Successfuly", position:'top-center'})
      })
      hubConnection.onreconnecting(error => infoToastr({content:"Reconneting...", position:'top-center'}))
      hubConnection.onclose(error => errorToastr({content:"Connection Close", position:'top-center'}))

      return hubConnection
    }

      connection.hubConnection.off(procedureName)
      return connection.hubConnection
  }

  on = async(url:string, procedureName:string, callBack: (...message:any) => void)=>{

    const connection: HubConnection = await this.start(url, procedureName)
    connection.on(procedureName, callBack)
  }

  invoke = async (hubUrl: string , procedureName:string, message:string,  successCallback? : (value: any) => void, 
  errorCallBacks? : (value:any) => void)=>{
    const connection: HubConnection = await this.start(hubUrl, procedureName)
    connection.invoke(procedureName, message).then(successCallback).catch(errorCallBacks);
  }

}





