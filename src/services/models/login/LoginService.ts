import LoginRequest from "../../../contracts/login/LoginRequest";
import LoginResponse from "../../../contracts/login/LoginResponse";
import { ToastrMessageEnum } from "../../../enums/toastrMessagEnum/ToastrMessageEnum";
import { HttpServiceClient } from "../../HttpServiceClient";
import { errorToastr, successToastr } from "../../ToastrServiceClient";

export default class LoginService{
    httpService: HttpServiceClient = new HttpServiceClient()


    async login(loginRequest:Partial<LoginRequest>):Promise<LoginResponse | any>{

        try {
            
            const promiseData:LoginResponse = await this.httpService.postAsync<any>(
                {fullEndPoint :"https://localhost:7082/api/Auth/CreateToken"}, loginRequest
            )
            if(promiseData){
                successToastr({content:ToastrMessageEnum.LoginSucess})
            }
            return promiseData
            
        } catch (error) {      
            errorToastr({content:ToastrMessageEnum.LoginError})
        }
    }
    
}