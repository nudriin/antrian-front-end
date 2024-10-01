import { ReactNode, useEffect, useState } from "react"
import pky from "../assets/images/web/pky.png"
import moment from "moment/min/moment-with-locales"
import "moment/locale/id"
import { Link } from "react-router-dom"
export default function HeaderLayout({ children }: { children: ReactNode }) {
    const [date, setDate] = useState<string>()
    useEffect(() => {
        const interval = setInterval(() => {
            const dateNow = new Date()
            moment.locale("id")
            const localDate = moment(dateNow).format("LLLL")
            setDate(localDate)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    })
    return (
        <>
            <div className="flex items-center col-span-4 p-8 mb-4 space-x-8 text-left bg-white text-primary rounded-xl">
                <Link to="/">
                    <img className="h-48" src={pky} alt="" />
                </Link>
                <div>
                    <p>{date}</p>
                    <h1 className="my-6 text-4xl font-bold">
                        Antri Helu Dinas Pendidikan Kota Palangka Raya
                    </h1>
                    <p className="text-2xl">Semoga harimu menyenangkan!</p>
                </div>
            </div>
            <main>{children}</main>
        </>
    )
}
