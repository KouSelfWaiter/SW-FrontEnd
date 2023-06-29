import { ReactNode, createContext, useState, useContext } from 'react';

interface LoadingContextData {
  // Context ile ilgili verilerin arayüzünü veya tipini burada tanımlayın
  loadingProgress:boolean
  setLoadingProgress:React.Dispatch<React.SetStateAction<boolean>>

}

const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData);


interface ProviderProps {
  children: ReactNode
}
export const LoadingProvider = ({children}: ProviderProps)=>{
  const [loadingProgress, setLoadingProgress] = useState<boolean>(false)

  const values = {
    loadingProgress,
    setLoadingProgress
  }

  return <LoadingContext.Provider value={values}>{children}</LoadingContext.Provider>
}

export const useLoading = () => useContext(LoadingContext)

export default LoadingContext;

