import { ReactNode } from "react"
import HeaderNavigation from "./HeaderNavigation"
import Footer from "./Footer"
import AdminSidebar from "./AdminSidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <HeaderNavigation>
                <div className="flex h-full gap-4">
                    <div className="flex flex-col bg-white w-[21rem] rounded-2xl">
                        <AdminSidebar />
                    </div>
                    <div className="w-9/12 h-full min-h-screen bg-white rounded-2xl">
                        {children}
                    </div>
                </div>
            </HeaderNavigation>
            <Footer />
        </>
    )
}
