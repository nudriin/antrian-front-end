import {
    TbUsers,
    TbUserCheck,
    TbUserPlus,
    TbUser,
    TbAwardFilled,
} from "react-icons/tb"
import { Queue, QueueAggregateResponse } from "../types/queue"
import { Locket } from "../types/locket"
import LocketLayout from "./LocketLayout"
import QueueTable from "./QueueTable" // Import the new QueueTable component

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
                    <div className="col-span-4">
                        {queues && (
                            <QueueTable
                                queues={queues}
                                locketCode={locketCode}
                                locket={locket}
                                handleCall={handleCall}
                                textToSpeech={textToSpeech}
                            />
                        )}
                    </div>
                </div>
            </section>
        </LocketLayout>
    )
}
