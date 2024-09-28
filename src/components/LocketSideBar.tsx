import { NavLink } from "react-router-dom"
import {
    TbBoxMultiple1,
    TbBoxMultiple2,
    TbBoxMultiple3,
    TbBoxMultiple4,
    TbBoxMultiple5,
    TbBoxMultiple6,
    TbIcons,
} from "react-icons/tb"
import pky from "../assets/images/web/pky.png"

export default function LocketSideBar() {
    const activeLink =
        "flex items-center gap-3 px-4 py-3 font-bold font-rubik rounded-full bg-primary text-white"
    const nonActiveLink =
        "flex items-center gap-3 px-4 py-3 font-bold font-rubik hover:bg-primary hover:text-white hover:rounded-full"
    return (
        <div className="flex flex-col justify-between gap-4">
            <NavLink to="/">
                <div className="flex items-center justify-center my-6">
                    <img className="h-[100px]" src={pky} alt="" />
                </div>
            </NavLink>
            <div className="text-left">
                <ul className="ml-2 mr-2">
                    <NavLink to="/locket">
                        <div className="flex items-center gap-3 px-4 py-3 font-bold font-rubik hover:bg-primary hover:text-white hover:rounded-full">
                            <li>
                                <TbIcons size={25} />
                            </li>
                            <li className="">Welcome</li>
                        </div>
                    </NavLink>
                </ul>
            </div>
            <div className="text-left">
                <ul className="ml-2 mr-2">
                    <NavLink
                        to="/locket/paud"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>
                            <TbBoxMultiple1 size={25} />
                        </li>
                        <li className="">Loket PAUD</li>
                    </NavLink>
                </ul>
            </div>
            <div className="text-left">
                <ul className="ml-2 mr-2">
                    <NavLink
                        to="/locket/ptk"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>
                            <TbBoxMultiple2 size={25} />
                        </li>
                        <li className="">Loket PTK</li>
                    </NavLink>
                </ul>
            </div>
            <div className="text-left">
                <ul className="ml-2 mr-2">
                    <NavLink
                        to="/locket/sd"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>
                            <TbBoxMultiple3 size={25} />
                        </li>
                        <li className="">Loket SD</li>
                    </NavLink>
                </ul>
            </div>
            <div className="text-left">
                <ul className="ml-2 mr-2">
                    <NavLink
                        to="/locket/smp"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>
                            <TbBoxMultiple4 size={25} />
                        </li>
                        <li className="">Loket SMP</li>
                    </NavLink>
                </ul>
            </div>
            <div className="text-left">
                <ul className="ml-2 mr-2">
                    <NavLink
                        to="/locket/umpeg"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>
                            <TbBoxMultiple5 size={25} />
                        </li>
                        <li className="">Loket UMPEG</li>
                    </NavLink>
                </ul>
            </div>
            <div className="text-left">
                <ul className="ml-2 mr-2">
                    <NavLink
                        to="/locket/keuangan"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <li>
                            <TbBoxMultiple6 size={25} />
                        </li>
                        <li className="">Loket Keuangan</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}
