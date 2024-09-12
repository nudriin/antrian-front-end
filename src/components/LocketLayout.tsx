import LocketSideBar from "./LocketSideBar"
import React from "react"

export default function LocketLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="relative h-full">
            <div className="hidden min-h-full h-screen md:flex md:flex-col md:fixed md:z-[80] bg-white w-[17rem] rounded-xl shadow-box border-2 border-darks2">
                <LocketSideBar />
            </div>
            <div className="bg-white rounded-xl border-2 border-darks2 shadow-box ml-[19rem] min-h-full h-screen">
                {children}
            </div>
        </div>
    )
}
