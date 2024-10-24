import {
    TbUsers,
    TbUserCheck,
    TbUserPlus,
    TbUser,
    TbAwardFilled,
    TbTrashXFilled,
} from "react-icons/tb"
import { Queue, QueueAggregateResponse } from "../types/queue"
import { Locket } from "../types/locket"
import LocketLayout from "./LocketLayout"
import QueueTable from "./QueueTable" // Import the new QueueTable component
import { Button } from "./ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog"

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
    handlePending,
    handleReset,
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
    handlePending: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleReset: () => void
}) {
    return (
        <LocketLayout>
            <section>
                <div className="grid grid-cols-4 gap-4 p-6">
                    <div className="col-span-4 p-4 border-2 bg-primary rounded-2xl">
                        <div className="flex items-center gap-3 text-lime">
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
                    <div className="col-span-1 p-4 border-2 text-primary bg-lime rounded-2xl">
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
                    <div className="text-right col-span-full">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="gap-2 bg-red-500">
                                    Reset Antrian <TbTrashXFilled />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Kamu yakin ingin mereset anntrian pada
                                        loket ini?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <span className="text-red-500">
                                            Dengan mereset antrian pada loket
                                            ini, antrian untuk hari ini akan
                                            terhapus sepenuhnya pada loket ini
                                        </span>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-red-500"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        {/* <Button
                            className="bg-destructive text-secondary"
                            onClick={handleReset}
                        >
                            Reset Antrian
                        </Button> */}
                    </div>
                    <div className="col-span-4">
                        {queues && (
                            <QueueTable
                                queues={queues}
                                locketCode={locketCode}
                                locket={locket}
                                handleCall={handleCall}
                                handlePending={handlePending}
                            />
                        )}
                    </div>
                </div>
            </section>
        </LocketLayout>
    )
}
