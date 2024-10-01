import { NavLink } from "react-router-dom"
import { TbIcons } from "react-icons/tb"
import pky from "../assets/images/web/pky.png"
import { useCallback, useEffect, useState } from "react"
import { Locket } from "../types/locket"

export default function LocketSideBar() {
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
            <LocketLists />
        </div>
    )
}

function LocketLists() {
    const [locket, setLocket] = useState<Locket[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const activeLink =
        "flex items-center gap-3 px-4 py-3 font-bold font-rubik rounded-full bg-primary text-white"
    const nonActiveLink =
        "flex items-center gap-3 px-4 py-3 font-bold font-rubik hover:bg-primary hover:text-white hover:rounded-full"

    const getAllLocket = useCallback(async () => {
        try {
            const response = await fetch("/api/locket", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const body = await response.json()

            if (!body.errors) {
                setLocket(() => body.data)
                setLoading(false)
            } else {
                setLoading(false)
                throw new Error(body.errors)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getAllLocket()
    }, [getAllLocket])

    return (
        <>
            {!loading &&
                locket.map((value, index) => (
                    <div className="text-left" key={index}>
                        <LocketListSidebar
                            activeLink={activeLink}
                            nonActiveLink={nonActiveLink}
                            locketName={value.name}
                            linkTo={value.name}
                        />
                    </div>
                ))}
        </>
    )
}

function LocketListSidebar({
    activeLink,
    nonActiveLink,
    locketName,
    linkTo,
}: {
    activeLink: string
    nonActiveLink: string
    locketName: string
    linkTo: string
}) {
    return (
        <ul className="ml-2 mr-2">
            <NavLink
                to={`/locket/${linkTo}`}
                className={({ isActive }) =>
                    isActive ? activeLink : nonActiveLink
                }
            >
                <li>
                    <TbIcons size={25} />
                </li>
                <li>Loket {locketName.toUpperCase()}</li>
            </NavLink>
        </ul>
    )
}
