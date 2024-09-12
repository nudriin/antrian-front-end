import { NavLink } from "react-router-dom"
import {
  IoIosContacts,
  IoIosArrowDroprightCircle,
  IoIosMic,
  IoMdAddCircle,
} from "react-icons/io"
import tutWuriImg from "../../assets/images/web/tut_wuri.png"

export default function Home() {
  return (
    <section>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3 col-span-3 bg-purples rounded-xl text-white text-left p-6 shadow-box border-2 border-darks2">
          <div>
            <p>tanggal</p>
            <h1 className="text-4xl font-bold my-6">
              Sistem Antrian Berbasis Web Dinas Pendidikan Kota Palangka Raya
            </h1>
            <p className="text-2xl">Semoga harimu menyenangkan!</p>
          </div>
          <img className="h-48" src={tutWuriImg} alt="" />
        </div>
        <div className="col-span-1 bg-white rounded-xl text-darks2 shadow-box border-2 border-darks2 text-left p-6">
          <IoIosContacts size={100} className="text-purples" />
          <h1 className="text-4xl my-3 font-bold">Nomor Antrian</h1>
          <p className="my-3">
            Halaman Nomor Antrian digunakan untuk menampilkan antrian pengunjung
          </p>
          <NavLink to="/queue">
            <button className="bg-purples text-white px-4 py-2 rounded-lg my-3 flex items-center gap-3">
              Tampilkan <IoIosArrowDroprightCircle size={25} />
            </button>
          </NavLink>
        </div>
        <div className="col-span-1 bg-white rounded-xl text-darks2 shadow-box border-2 border-darks2 text-left p-6">
          <IoMdAddCircle size={100} className="text-purples" />
          <h1 className="text-4xl my-3 font-bold">Tambah Antrian</h1>
          <p className="my-3">
            Halaman Nomor Antrian digunakan untuk mengambil nomor antrian
          </p>
          <NavLink to="/queue/add">
            <button className="bg-purples text-white px-4 py-2 rounded-lg my-3 flex items-center gap-3">
              Tampilkan <IoIosArrowDroprightCircle size={25} />
            </button>
          </NavLink>
        </div>
        <div className="col-span-1 bg-white rounded-xl text-darks2 shadow-box border-2 border-darks2 text-left p-6">
          <IoIosMic size={100} className="text-purples" />
          <h1 className="text-4xl my-3 font-bold">Loket</h1>
          <p className="my-3">
            Halaman Loket digunakan petugas loket untuk memanggil antrian
            pengunjung.
          </p>
          <NavLink to="/queue/locket">
            <button className="bg-purples text-white px-4 py-2 rounded-lg my-3 flex items-center gap-3">
              Tampilkan <IoIosArrowDroprightCircle size={25} />
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  )
}
