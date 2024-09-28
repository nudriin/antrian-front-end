import { ReactNode } from "react"
import pky from "../assets/images/web/pky.png"
export default function HeaderLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="flex items-center col-span-4 p-8 mb-4 space-x-8 text-left bg-white text-primary rounded-xl">
                <img className="h-48" src={pky} alt="" />
                <div>
                    <p>tanggal</p>
                    <h1 className="my-6 text-4xl font-bold">
                        Sistem Antrian Berbasis Web Dinas Pendidikan Kota
                        Palangka Raya
                    </h1>
                    <p className="text-2xl">Semoga harimu menyenangkan!</p>
                </div>
            </div>
            <main>{children}</main>
        </>
    )
}
