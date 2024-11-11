import LocketLayout from "../../components/LocketLayout"
import { TbAwardFilled } from "react-icons/tb"

export default function Welcome() {
    return (
        <LocketLayout>
            <div className="grid grid-cols-4 gap-4 p-6">
                <div className="col-span-4 p-4 bg-primary text-lime rounded-xl">
                    <div className="flex items-center gap-4">
                        <TbAwardFilled size={80} className="" />
                        <div className="text-left">
                            <h1 className="text-4xl font-semibold">
                                Selamat Datang di Dinas Pendidikan Kota
                                Palangkaraya!
                            </h1>
                            <p className="text-darks2">
                                Silahkan pilih loket anda pada menu di bagian
                                samping kiri
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 p-4 text-left bg-white border-2 border-primary rounded-xl min-h-screen">
                    <p className="mb-4">
                        Kami hadir untuk melayani dan mendukung kebutuhan
                        pendidikan di kota Palangkaraya. Kami berkomitmen untuk
                        meningkatkan kualitas pendidikan, memberikan layanan
                        terbaik, dan memastikan semua anak memiliki akses
                        pendidikan yang berkualitas.
                    </p>
                    <p className="mb-4">
                        <span className="text-lg font-semibold">
                            Jam Pelayanan:
                        </span>
                        <br />
                        Senin - Jumat: 08.00 - 15.00 <br />
                        Sabtu & Minggu: Libur
                    </p>
                    <p className="mb-4">
                        <span className="text-lg font-semibold">
                            Tentang Kami:
                        </span>
                        <br />
                        Dinas Pendidikan Kota Palangkaraya berperan sebagai
                        lembaga yang mengelola, mengawasi, dan mengembangkan
                        sistem pendidikan di wilayah kami. Kami terus berupaya
                        menciptakan lingkungan belajar yang kondusif bagi
                        seluruh peserta didik, guru.
                    </p>
                </div>
            </div>
        </LocketLayout>
    )
}
