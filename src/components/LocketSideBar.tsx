import { NavLink } from 'react-router-dom';
import tutWuriImg from '../assets/images/web/tut_wuri.png';
import {
    TbBoxMultiple1,
    TbBoxMultiple2,
    TbBoxMultiple3,
    TbBoxMultiple4,
    TbBoxMultiple5,
    TbBoxMultiple6,
    TbIcons,
} from 'react-icons/tb';

export default function LocketSideBar() {
    const activeLink = 'bg-darks2 text-purples';
    const nonActiveLink = '';
    return (
        <div className="flex flex-col justify-between gap-4 text-darks2">
            <NavLink to="/">
                <div className="flex items-center justify-center mt-4">
                    <img className="h-24" src={tutWuriImg} alt="" />
                </div>
            </NavLink>
            <div className="text-left">
                <ul className="ml-2 mr-2">
                    <NavLink
                        to="/locket/welcome"
                        className={({ isActive }) =>
                            isActive ? activeLink : nonActiveLink
                        }
                    >
                        <div className="flex items-center gap-3 px-4 py-2 font-bold font-rubik hover:bg-purples hover:text-white hover:rounded-lg">
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
                        <div className="flex items-center gap-3 px-4 py-2 font-bold font-rubik hover:bg-purples hover:text-white hover:rounded-lg">
                            <li>
                                <TbBoxMultiple1 size={25} />
                            </li>
                            <li className="">Loket PAUD</li>
                        </div>
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
                        <div className="flex items-center gap-3 px-4 py-2 font-bold font-rubik hover:bg-purples hover:text-white hover:rounded-lg">
                            <li>
                                <TbBoxMultiple2 size={25} />
                            </li>
                            <li className="">Loket PTK</li>
                        </div>
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
                        <div className="flex items-center gap-3 px-4 py-2 font-bold font-rubik hover:bg-purples hover:text-white hover:rounded-lg">
                            <li>
                                <TbBoxMultiple3 size={25} />
                            </li>
                            <li className="">Loket SD</li>
                        </div>
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
                        <div className="flex items-center gap-3 px-4 py-2 font-bold font-rubik hover:bg-purples hover:text-white hover:rounded-lg">
                            <li>
                                <TbBoxMultiple4 size={25} />
                            </li>
                            <li className="">Loket SMP</li>
                        </div>
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
                        <div className="flex items-center gap-3 px-4 py-2 font-bold font-rubik hover:bg-purples hover:text-white hover:rounded-lg">
                            <li>
                                <TbBoxMultiple5 size={25} />
                            </li>
                            <li className="">Loket UMPEG</li>
                        </div>
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
                        <div className="flex items-center gap-3 px-4 py-2 font-bold font-rubik hover:bg-purples hover:text-white hover:rounded-lg">
                            <li>
                                <TbBoxMultiple6 size={25} />
                            </li>
                            <li className="">Loket Keuangan</li>
                        </div>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
}
