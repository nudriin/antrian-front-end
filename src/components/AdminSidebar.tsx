import { NavLink } from "react-router-dom"
import pky from "../assets/images/web/pky.png"
import { RiDashboardFill } from "react-icons/ri"
import { TbAppWindowFilled } from "react-icons/tb"

export default function AdminSidebar() {
    return (
        <div className="flex flex-col min-h-screen p-6">
            <NavLink to="/">
                <div className="flex items-center justify-center my-6">
                    <img className="h-[100px]" src={pky} alt="" />
                </div>
            </NavLink>
            <ul className="space-y-4 text-left">
                <NavLink to="/dashboard">
                    <li className="flex items-center gap-2 px-4 py-3 font-bold font-rubik hover:bg-primary hover:text-white hover:rounded-full">
                        <RiDashboardFill /> Dashboard
                    </li>
                </NavLink>
                <NavLink to="/dashboard/locket">
                    <li className="flex items-center gap-2 px-4 py-3 font-bold font-rubik hover:bg-primary hover:text-white hover:rounded-full">
                        <TbAppWindowFilled /> Locket
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}
