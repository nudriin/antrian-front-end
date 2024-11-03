import { ReactNode, useState } from "react"
import { NavLink } from "react-router-dom"
import Logout from "./Logout"

export default function HeaderNavigation({
    children,
}: {
    children: ReactNode
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const activeLink =
        "flex items-center gap-3 px-3 py-2 font-bold font-rubik rounded-2xl bg-primary text-white"
    const nonActiveLink =
        "flex items-center gap-3 px-3 py-2 font-bold font-rubik hover:bg-primary hover:text-white hover:rounded-2xl"
    const nonActiveLinkLogout =
        "flex items-center gap-3 px-3 py-2 font-bold font-rubik hover:bg-red-500 hover:text-white hover:rounded-2xl cursor-pointer"

    return (
        <div>
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 mt-5 mb-4 ml-8 mr-8 border-2 backdrop-blur-sm bg-white/50 rounded-2xl border-primary">
                <div>
                    <h1 className="text-xl font-bold">
                        Disdik Kota Palangka Raya
                    </h1>
                </div>

                {/* Hamburger Menu Button */}
                <button
                    className="block p-2 lg:hidden focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* Full Nav for Desktop */}
                <ul className="items-center justify-end hidden gap-2 lg:flex">
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
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>Dashboard</li>
                    </NavLink>
                    <li className={nonActiveLinkLogout}>
                        <Logout />
                    </li>
                </ul>

                {/* Dropdown for Mobile & Tablet */}
                {isMenuOpen && (
                    <div className="absolute left-0 right-0 p-4 mt-2 bg-white border rounded-lg shadow-md top-full lg:hidden border-primary">
                        <ul className="flex flex-col items-start space-y-2">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? activeLink : nonActiveLink
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <li>Home</li>
                            </NavLink>
                            <NavLink
                                to="/queue"
                                className={({ isActive }) =>
                                    isActive ? activeLink : nonActiveLink
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <li>Antrian</li>
                            </NavLink>
                            <NavLink
                                to="/queue/add"
                                className={({ isActive }) =>
                                    isActive ? activeLink : nonActiveLink
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <li>Tambah Antrian</li>
                            </NavLink>
                            <NavLink
                                to="/locket"
                                className={({ isActive }) =>
                                    isActive ? activeLink : nonActiveLink
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <li>Locket</li>
                            </NavLink>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive ? activeLink : nonActiveLink
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <li>Dashboard</li>
                            </NavLink>
                            <li
                                className={nonActiveLinkLogout}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Logout />
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="p-0 mt-[80px] md:mt-[68px]">{children}</div>
        </div>
    )
}
