import React from "react"
import {
    TbUsers,
    TbUserCheck,
    TbUserPlus,
    TbUser,
    TbAwardFilled,
} from "react-icons/tb"
import { Queue, QueueAggregateResponse } from "../types/queue"
import { Locket } from "../types/locket"
import { IoIosMegaphone } from "react-icons/io"
import LocketLayout from "./LocketLayout"

export default function LocketComponent({
    title,
    total,
    current,
    next,
    remain,
    locket,
    queues,
    locketCode,
    handleCall,
    textToSpeech,
}: {
    title: string
    total: QueueAggregateResponse | undefined
    current: QueueAggregateResponse | undefined
    next: QueueAggregateResponse | undefined
    remain: QueueAggregateResponse | undefined
    locket: Locket | undefined
    queues: Queue[] | undefined
    locketCode: string
    handleCall: (e: React.MouseEvent<HTMLButtonElement>) => void
    textToSpeech: (text: string) => void
}) {
    return (
        <LocketLayout>
            <section>
                <div className="grid grid-cols-4 gap-4 p-6">
                    <div className="col-span-4 p-4 border-2 bg-primary rounded-2xl">
                        <div className="flex items-center gap-3 text-secondary">
                            <TbAwardFilled size={80} />
                            <h1 className="text-4xl font-semibold">{title}</h1>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-white border rounded-2xl border-primary">
                        <div className="flex items-center gap-3">
                            <TbUsers size={80} />
                            <div>
                                <h1 className="text-4xl">{total?.total}</h1>
                                <p className="text-darks2">Jumlah Antrian</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 border-2 text-primary bg-secondary rounded-2xl">
                        <div className="flex items-center gap-3">
                            <TbUserCheck size={80} />
                            <div>
                                <h1 className="text-4xl">
                                    {current?.currentQueue}
                                </h1>
                                <p className="text-darks2">Antrian Sekarang</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-white border rounded-2xl border-primary">
                        <div className="flex items-center gap-3">
                            <TbUserPlus size={80} />
                            <div>
                                <h1 className="text-4xl">{next?.nextQueue}</h1>
                                <p className="text-darks2">
                                    Antrian Selanjutnya
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-white border rounded-2xl border-primary">
                        <div className="flex items-center gap-3">
                            <TbUser size={80} />
                            <div>
                                <h1 className="text-4xl">
                                    {remain?.queueRemainder}
                                </h1>
                                <p className="text-darks2">Sisa Antrian</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 p-4 bg-white border-2 border-primary rounded-2xl">
                        <table className="w-full ">
                            <thead>
                                <tr>
                                    <th className="border-2 rounded-lg border-primary">
                                        Nomor Antrian
                                    </th>
                                    <th className="border-2 rounded-lg border-primary">
                                        Panggil
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {queues?.map((value, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="border-2 rounded-lg border-primary"
                                        >
                                            <td className="text-xl font-semibold border-2 rounded-lg border-primary">
                                                {locketCode}
                                                {String(
                                                    value.queue_number
                                                ).padStart(2, "0")}
                                            </td>
                                            <td className="flex items-center justify-center p-2">
                                                <button
                                                    onClick={(
                                                        e: React.MouseEvent<HTMLButtonElement>
                                                    ) => {
                                                        const text = `Nomor antrian, ${locketCode},${String(
                                                            value.queue_number
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}, silahkan menuju loket, ${
                                                            locket?.name
                                                        }`
                                                        textToSpeech(text)
                                                        handleCall(e)
                                                    }}
                                                    value={value.id}
                                                >
                                                    <IoIosMegaphone
                                                        size={35}
                                                        className={`p-2 text-primary rounded-full cursor-pointer ${
                                                            value.updatedAt
                                                                ? "bg-muted"
                                                                : "bg-secondary"
                                                        }  hover:scale-105`}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </LocketLayout>
    )
}
