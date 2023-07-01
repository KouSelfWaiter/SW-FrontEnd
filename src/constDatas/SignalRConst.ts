import { HubConnection } from "@microsoft/signalr"

export interface IHubData{
    mapName:string
    hubConnection:HubConnection
}

export default abstract class Hubs{
    static hubsArray:IHubData [] = []
}