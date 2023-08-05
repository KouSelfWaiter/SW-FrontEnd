import axios from "axios";
import { errorToastr, infoToastr } from "../services/ToastrServiceClient";
import { ToastrMessageEnum } from "../enums/toastrMessagEnum/ToastrMessageEnum";


function navigateTo(path: string): void {
    window.location.href = path;
  }

const handleFetchError = (error: any) => {
  
    console.log(error)
    


    if (axios.isAxiosError(error)) {
        if (error.response?.status.toString() === "500") {
            if(error.response.data["Message"])
                errorToastr({ content: error.response.data["Message"] as string })
            else
                errorToastr({ content: "İşlem Başarısız." })
        }else if (error.response?.status.toString() === "401"){
            errorToastr({ content: "İlgili kısma erişmek için oturum açmanız gerekmektedir!!"})
            navigateTo("http://localhost:3000/login")
        } else if(error.response?.status.toString() === "403"){
            infoToastr({ content: "İlgili kısma erişmek için yetkiniz yoktur!! Daha yetkili bir hesaba geçiniz.", duration:5000})
        }
        else {
            errorToastr({ content: "İşlem Başarısız." })
        }

    } else {
        errorToastr({ content: ToastrMessageEnum.CreateProductTranslationError })
    }

};

export default handleFetchError;
