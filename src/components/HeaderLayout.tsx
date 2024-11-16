import { ReactNode } from "react"
import pky from "../assets/images/web/pky.png"
import { Link } from "react-router-dom"
export default function HeaderLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="items-center gap-2 p-4 mb-4 bg-dayak-header bg-cover bg-center bg-no-repeat md:space-x-8 md:text-left md:p-8 md:flex text-primary rounded-xl">
                <Link to="/" className="w-1/4">
                    <img
                        className="h-32 mx-auto md:h-36 lg:h-48"
                        src={pky}
                        alt=""
                    />
                </Link>
                <div className="">
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
