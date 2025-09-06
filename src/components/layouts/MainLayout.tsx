import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer';

type Props = {
    children: ReactNode;
}
export default function MainLayout({ children }: Props) {
    return (
        <>
            <Header />
            <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
                {children}
            </div>
            <Footer />
        </>
    )
}
