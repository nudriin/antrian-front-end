import { NavLink } from 'react-router-dom';
import {
    IoIosContacts,
    IoIosArrowDroprightCircle,
    IoIosMic,
    IoMdAddCircle,
} from 'react-icons/io';
import tutWuriImg from '../../assets/images/web/tut_wuri.png';

export default function Home() {
    return (
        <section>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center col-span-3 gap-3 p-6 text-left text-white border-2 bg-purples rounded-xl shadow-box border-darks2">
                    <div>
                        <p>tanggal</p>
                        <h1 className="my-6 text-4xl font-bold">
                            Sistem Antrian Berbasis Web Dinas Pendidikan Kota
                            Palangka Raya
                        </h1>
                        <p className="text-2xl">Semoga harimu menyenangkan!</p>
                    </div>
                    <img className="h-48" src={tutWuriImg} alt="" />
                </div>
                <div className="col-span-1 p-6 text-left bg-white border-2 rounded-xl text-darks2 shadow-box border-darks2">
                    <IoIosContacts size={100} className="text-purples" />
                    <h1 className="my-3 text-4xl font-bold">Nomor Antrian</h1>
                    <p className="my-3">
                        Halaman Nomor Antrian digunakan untuk menampilkan
                        antrian pengunjung
                    </p>
                    <NavLink to="/queue">
                        <button className="flex items-center gap-3 px-4 py-2 my-3 text-white rounded-lg bg-purples">
                            Tampilkan <IoIosArrowDroprightCircle size={25} />
                        </button>
                    </NavLink>
                </div>
                <div className="col-span-1 p-6 text-left bg-white border-2 rounded-xl text-darks2 shadow-box border-darks2">
                    <IoMdAddCircle size={100} className="text-purples" />
                    <h1 className="my-3 text-4xl font-bold">Tambah Antrian</h1>
                    <p className="my-3">
                        Halaman Nomor Antrian digunakan untuk mengambil nomor
                        antrian
                    </p>
                    <NavLink to="/queue/add">
                        <button className="flex items-center gap-3 px-4 py-2 my-3 text-white rounded-lg bg-purples">
                            Tampilkan <IoIosArrowDroprightCircle size={25} />
                        </button>
                    </NavLink>
                </div>
                <div className="col-span-1 p-6 text-left bg-white border-2 rounded-xl text-darks2 shadow-box border-darks2">
                    <IoIosMic size={100} className="text-purples" />
                    <h1 className="my-3 text-4xl font-bold">Loket</h1>
                    <p className="my-3">
                        Halaman Loket digunakan petugas loket untuk memanggil
                        antrian pengunjung.
                    </p>
                    <NavLink to="/locket">
                        <button className="flex items-center gap-3 px-4 py-2 my-3 text-white rounded-lg bg-purples">
                            Tampilkan <IoIosArrowDroprightCircle size={25} />
                        </button>
                    </NavLink>
                </div>
            </div>
        </section>
    );
}
