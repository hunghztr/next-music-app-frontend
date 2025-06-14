import { useEffect, useState } from "react"

export const useRenderByClient = () =>{
  const [hasMounted,setHasMounted] = useState<boolean>(false)
  useEffect( () =>{
    setHasMounted(true)
  },[])
  return hasMounted
}