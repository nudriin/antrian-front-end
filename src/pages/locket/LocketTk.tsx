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
import useAllQueueInLocket from '../../hooks/useAllQueueInLocket';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { socket } from '../../socket';
import { Queue, QueueAggregateResponse } from '../../types/queue';
import useLocketByName from '../../hooks/useLocketByName';
import { Locket } from '../../types/locket';
import textToSpeech from '../../helper/textToSpeech';

export default function LocketTk() {
    const total = useTotalQueue('ptk');
    const initialNext = useNextQueue('ptk');
    const initialCurrent = useCurrentQueue('ptk');
    const initialRemain = useRemainQueue('ptk');
    const initialQueues = useAllQueueInLocket('ptk');
    const initalLocket = useLocketByName('ptk');
    const [cookie] = useCookies(['auth']);
    const token = cookie.auth;

    const [remain, setRemain] = useState<QueueAggregateResponse | undefined>(
        undefined
    );
    const [next, setNext] = useState<QueueAggregateResponse | undefined>(
        undefined
    );
    const [current, setCurrent] = useState<QueueAggregateResponse | undefined>(
        undefined
    );
    const [queues, setQueues] = useState<Queue[] | undefined | []>(undefined);
    const [locket, setLocket] = useState<Locket | undefined>(undefined);

    useEffect(() => {
        if (initialRemain !== undefined) {
            setRemain(initialRemain);
        }
        if (initialNext !== undefined) {
            setNext(initialNext);
        }
        if (initialCurrent !== undefined) {
            setCurrent(initialCurrent);
        }
        if (initialQueues !== undefined) {
            setQueues(initialQueues);
        }
        if (initalLocket !== undefined) {
            setLocket(initalLocket);
        }
    }, [
        initialRemain,
        initialNext,
        initialCurrent,
        initialQueues,
        initalLocket,
    ]);

    const handleCall = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const id = e.currentTarget.value;
            const response = await fetch(`/api/queue/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const body = await response.json();
            if (!body.errors) {
                socket.emit('getRemainQueue', locket?.id);
                socket.emit('getNextQueue', locket?.id);
                socket.emit('getCurrentQueue', locket?.id);
                socket.emit('getAllQueue', locket?.id);
                console.log(body);
            } else {
                console.log(body.errors);
                throw new Error(body.errors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LocketLayout>
            <section>
                <div className="grid grid-cols-4 gap-4 p-6">
                    <div className="col-span-4 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <div className="flex items-center gap-3 text-purples">
                            <TbAwardFilled size={80} className="" />
                            <h1 className="text-4xl font-semibold">
                                Loket PTK
                            </h1>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <div className="flex items-center gap-3">
                            <TbUsers size={80} className="text-purples" />
                            <div className="text-purples">
                                <h1 className="text-4xl">{total?.total}</h1>
                                <p className="text-darks2">Jumlah Antrian</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <div className="flex items-center gap-3">
                            <TbUserCheck size={80} className="text-purples" />
                            <div className="text-purples">
                                <h1 className="text-4xl">
                                    {current?.currentQueue}
                                </h1>
                                <p className="text-darks2">Antrian Sekarang</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <div className="flex items-center gap-3">
                            <TbUserPlus size={80} className="text-purples" />
                            <div className="text-purples">
                                <h1 className="text-4xl">{next?.nextQueue}</h1>
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
                                <h1 className="text-4xl">
                                    {remain?.queueRemainder}
                                </h1>
                                <p className="text-darks2">Sisa Antrian</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 p-4 bg-white border-2 rounded-xl border-darks2 shadow-box">
                        <table className="w-full ">
                            <thead>
                                <tr>
                                    <th className="border-2 rounded-lg border-darks2">
                                        Nomor Antrian
                                    </th>
                                    <th className="border-2 rounded-lg border-darks2">
                                        Panggil
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {queues?.map((value, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="border-2 rounded-lg border-darks2"
                                        >
                                            <td className="text-xl font-semibold border-2 rounded-lg border-darks2">
                                                A
                                                {String(
                                                    value.queue_number
                                                ).padStart(2, '0')}
                                            </td>
                                            <td className="flex items-center justify-center p-2">
                                                <button
                                                    onClick={(
                                                        e: React.MouseEvent<HTMLButtonElement>
                                                    ) => {
                                                        const text = `Nomor antrian, A,${String(
                                                            value.queue_number
                                                        ).padStart(
                                                            2,
                                                            '0'
                                                        )}, silahkan menuju loket, ${
                                                            locket?.name
                                                        }`;
                                                        textToSpeech(text);
                                                        handleCall(e);
                                                    }}
                                                    value={value.id}
                                                >
                                                    <IoIosMegaphone
                                                        size={35}
                                                        className={`p-2 text-white rounded-full cursor-pointer ${
                                                            value.updatedAt
                                                                ? 'bg-slate-300'
                                                                : 'bg-purples'
                                                        }  hover:scale-105`}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </LocketLayout>
    );
}
