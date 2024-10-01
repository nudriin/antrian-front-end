import { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import Logout from "./Logout"

export default function HeaderNavigation({
    children,
}: {
    children: ReactNode
}) {
    const activeLink =
        "flex items-center gap-3 px-3 py-2 font-bold font-rubik rounded-2xl bg-primary text-white"
    const nonActiveLink =
        "flex items-center gap-3 px-3 py-2 font-bold font-rubik hover:bg-primary hover:text-white hover:rounded-2xl "
    const nonActiveLinkLogout =
        "flex items-center gap-3 px-3 py-2 font-bold font-rubik hover:bg-red-500 hover:text-white hover:rounded-2xl cursor-pointer"

    return (
        <div>
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 mt-5 mb-4 ml-8 mr-8 border-2 backdrop-blur-sm bg-white/90 rounded-2xl border-secondary">
                <div>
                    <h1 className="text-xl font-bold">
                        Disdik Kota Palangka Raya
                    </h1>
                </div>
                <ul className="flex items-center justify-end gap-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>Home</li>
                    </NavLink>
                    <NavLink
                        to="/queue"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>Antrian</li>
                    </NavLink>
                    <NavLink
                        to="/queue/add"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>Tambah Antrian</li>
                    </NavLink>
                    <NavLink
                        to="/locket"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>Locket</li>
                    </NavLink>
                    <li className={nonActiveLinkLogout}>
                        <Logout />
                    </li>
                </ul>
            </div>
            <div className="p-0 mt-[68px]">{children}</div>
        </div>
    )
}
