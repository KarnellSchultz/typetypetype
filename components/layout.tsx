import { Header } from 'components/header'
import Head from 'next/head'
import React from 'react'

interface AppWrapperProps {
    pageTitle: string
}

export const Layout: React.FC<AppWrapperProps> = ({ pageTitle, children }) => {
    return (
        <>
            <Head>
                <title>{pageTitle} - typetypetype ⌨️</title>
                <meta name="home" content="Typetypetype" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gray-100 text-gray-900 h-screen grid place-items-start justify-items-center ">
                <Header />
                <main>{children}</main>
            </div>
        </>
    )
}
