import LocketLayout from '../../components/LocketLayout';
import {
    TbUsers,
    TbUserCheck,
    TbUserPlus,
    TbUser,
    TbAwardFilled,
} from 'react-icons/tb';
import { IoIosMegaphone } from 'react-icons/io';
import useTotalQueue from '../../hooks/useTotalQueue';
import useNextQueue from '../../hooks/useNextQueue';
import useCurrentQueue from '../../hooks/useCurrentQueue';
import useRemainQueue from '../../hooks/useRemainQueue';

export default function LocketPaud() {
    const total = useTotalQueue('paud');
    const next = useNextQueue('paud');
    const current = useCurrentQueue('paud');
    const remain = useRemainQueue('paud');
    return (
        <LocketLayout>
            <section>
                <div className="grid grid-cols-4 gap-4 p-6">
                    <div className="col-span-4 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <div className="flex items-center gap-3 text-purples">
                            <TbAwardFilled size={80} className="" />
                            <h1 className="text-4xl font-semibold">
                                Loket PAUD
                            </h1>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <div className="flex items-center gap-3">
                            <TbUsers size={80} className="text-purples" />
                            <div className="text-purples">
                                <h1 className="text-4xl">{total}</h1>
                                <p className="text-darks2">Jumlah Antrian</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <div className="flex items-center gap-3">
                            <TbUserCheck size={80} className="text-purples" />
                            <div className="text-purples">
                                <h1 className="text-4xl">{current}</h1>
                                <p className="text-darks2">Antrian Sekarang</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <div className="flex items-center gap-3">
                            <TbUserPlus size={80} className="text-purples" />
                            <div className="text-purples">
                                <h1 className="text-4xl">{next}</h1>
                                <p className="text-darks2">
                                    Antrian Selanjutnya
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <div className="flex items-center gap-3">
                            <TbUser size={80} className="text-purples" />
                            <div className="text-purples">
                                <h1 className="text-4xl">{remain}</h1>
                                <p className="text-darks2">Sisa Antrian</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <table className="w-full ">
                            <thead>
                                <th className="border-2 rounded-lg border-darks2">
                                    Nomor Antrian
                                </th>
                                <th className="border-2 rounded-lg border-darks2">
                                    Panggil
                                </th>
                            </thead>
                            <tbody>
                                <tr className="border-2 rounded-lg border-darks2">
                                    <td className="text-xl font-semibold border-2 rounded-lg border-darks2">
                                        1
                                    </td>
                                    <td className="flex items-center justify-center p-2">
                                        <IoIosMegaphone
                                            size={35}
                                            className="p-2 text-white rounded-full cursor-pointer bg-purples hover:scale-105"
                                        />
                                    </td>
                                </tr>
                                <tr className="border-2 rounded-lg border-darks2">
                                    <td className="text-xl font-semibold border-2 rounded-lg border-darks2">
                                        2
                                    </td>
                                    <td className="flex items-center justify-center p-2">
                                        <IoIosMegaphone
                                            size={35}
                                            className="p-2 text-white rounded-full cursor-pointer bg-purples hover:scale-105"
                                        />
                                    </td>
                                </tr>
                                <tr className="border-2 rounded-lg border-darks2">
                                    <td className="text-xl font-semibold border-2 rounded-lg border-darks2">
                                        3
                                    </td>
                                    <td className="flex items-center justify-center p-2">
                                        <IoIosMegaphone
                                            size={35}
                                            className="p-2 text-white rounded-full cursor-pointer bg-purples hover:scale-105"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </LocketLayout>
    );
}
