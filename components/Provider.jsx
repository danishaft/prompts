"use client"
import {SessionProvider} from 'next-auth/react';

const provider = ({children, session}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default provider