export default interface LoginResponse{
    responseDto:ResponseDto

}

interface ResponseDto{
    data:Data
    statusCode:number

}

interface Data{
    accessToken:string
    accessTokenExpiration:Date
    refreshToken:string
    refreshTokenExpiration:Date
}


























