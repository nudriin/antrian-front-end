import { NavLink } from "react-router-dom"
import {
    IoIosContacts,
    IoIosArrowDroprightCircle,
    IoIosMic,
    IoMdAddCircle,
} from "react-icons/io"
import HeaderLayout from "../../components/HeaderLayout"
import HeaderNavigation from "../../components/HeaderNavigation"
import Footer from "../../components/Footer"

export default function Home() {
    return (
        <>
            <HeaderNavigation>
                <HeaderLayout>
                    <div className="grid max-h-[120vh] grid-cols-4 grid-rows-2 gap-4">
                        <div className="order-1 col-span-2 row-span-1 p-6 text-left bg-white rounded-xl">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4">
                                    <IoIosContacts size={130} className="" />
                                    <div>
                                        <h1 className="text-4xl font-bold">
                                            Nomor Antrian
                                        </h1>
                                        <p className="my-2">
                                            Halaman Nomor Antrian digunakan
                                            untuk menampilkan antrian pengunjung
                                        </p>
                                    </div>
                                </div>
                                <NavLink
                                    to="/queue"
                                    className="flex items-end justify-end"
                                >
                                    <button className="flex items-center order-3 gap-3 px-4 py-2 text-white rounded-xl bg-primary">
                                        Tampilkan
                                        <IoIosArrowDroprightCircle size={25} />
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="order-3 col-span-2 row-span-1 p-6 text-left bg-lime rounded-xl">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4">
                                    <IoMdAddCircle size={130} className="" />
                                    <div>
                                        <h1 className="my-3 text-4xl font-bold">
                                            Tambah Antrian
                                        </h1>
                                        <p className="my-3">
                                            Halaman Nomor Antrian digunakan
                                            untuk mengambil nomor antrian
                                        </p>
                                    </div>
                                </div>
                                <NavLink
                                    to="/queue/add"
                                    className="flex items-end justify-end"
                                >
                                    <button className="flex items-center order-3 gap-3 px-4 py-2 text-white rounded-xl bg-primary">
                                        Tampilkan
                                        <IoIosArrowDroprightCircle size={25} />
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="flex items-center order-2 col-span-2 row-span-2 p-6 text-left bg-primary text-lime rounded-xl">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4">
                                    <IoIosMic size={130} className="" />
                                    <div>
                                        <h1 className="my-3 text-4xl font-bold">
                                            Loket
                                        </h1>
                                        <p className="my-3">
                                            Halaman Loket digunakan petugas
                                            loket untuk memanggil antrian
                                            pengunjung.
                                        </p>
                                    </div>
                                </div>
                                <NavLink
                                    to="/locket"
                                    className="flex items-end justify-end"
                                >
                                    <button className="flex items-center order-3 gap-3 px-4 py-2 mt-10 text-primary rounded-xl bg-lime">
                                        Tampilkan
                                        <IoIosArrowDroprightCircle size={25} />
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </HeaderLayout>
            </HeaderNavigation>
            <Footer />
        </>
    )
}
