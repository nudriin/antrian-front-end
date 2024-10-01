import Footer from "./Footer"
import HeaderNavigation from "./HeaderNavigation"
import LocketSideBar from "./LocketSideBar"
import React from "react"

export default function LocketLayout({ children }: React.PropsWithChildren) {
    return (
        <>
            <HeaderNavigation>
                <div className="flex h-full gap-4">
                    <div className="flex flex-col bg-white w-[21rem] rounded-2xl">
                        <LocketSideBar />
                    </div>
                    <div className="w-9/12 h-full bg-white rounded-2xl">
                        {children}
                    </div>
                </div>
            </HeaderNavigation>
            <Footer />
        </>
    )
}
