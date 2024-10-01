import LocketSideBar from "./LocketSideBar"
import React from "react"

export default function LocketLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="relative h-full">
            <div className="hidden min-h-full h-screen md:flex md:flex-col md:fixed md:z-[80] bg-white w-[21rem] rounded-2xl">
                <LocketSideBar />
            </div>
            <div className="bg-white rounded-2xl ml-[22rem] min-h-full h-full">
                {children}
            </div>
        </div>
    )
}
