import React, { createContext, useEffect, useState } from 'react'


export const AuthContext = createContext()
function AuthContextProvider({children}) {

    const [token , setToken] = useState(null)

    console.log(token);

    useEffect(function () {
        if (localStorage.getItem("tkn") != null ) {
            setToken(localStorage.getItem("tkn"))  
        }
    } , [])
    
  return (
    <AuthContext.Provider value={
        {token ,
        setToken ,   
        }
    }>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
