import React, { useCallback, useEffect, useState } from 'react';
import tutWuriImg from '../../assets/images/web/tut_wuri.png';
import { IoMdAddCircle } from 'react-icons/io';
import { Locket } from '../../types/locket';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/id';
import { QueueTotal } from '../../types/queue';
import { useCookies } from 'react-cookie';
import { socket } from '../../socket';
import { Button } from '@chakra-ui/react';
export default function AddQueue() {
    const [loading, setLoading] = useState(false);
    const [locket, setLocket] = useState<Locket[]>([]);
    const [dates, setDates] = useState(moment());
    const [queues, setQueues] = useState<Map<number, QueueTotal>>(new Map());
    const [cookies] = useCookies(['auth']);

    useEffect(() => {
        moment.locale('id');
        const interval = setInterval(() => setDates(moment()), 60000); // update per 1 minute

        return () => clearInterval(interval);
    }, []);

    //
    const getAllLocket = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/locket', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const body = await response.json();

            if (!body.errors) {
                setLocket(body.data);
            } else {
                throw new Error(body.errors);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const getTotalQueue = useCallback(async () => {
        if (locket.length === 0) return; // Exit if no locket data

        try {
            setLoading(true);
            const queuePromises = locket.map(async (value) => {
                const response = await fetch(`/api/queue/${value.id}/total`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                return await response.json();
            });

            const result = await Promise.all(queuePromises);
            const queueMap = new Map<number, QueueTotal>();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result.forEach((result: any) => {
                if (!result.errors) {
                    queueMap.set(result.data.locket_id, result.data);
                } else {
                    console.error(result.errors);
                    throw new Error(result.errors);
                }
            });

            setQueues(queueMap);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [locket]);

    useEffect(() => {
        getAllLocket();
    }, [getAllLocket]);

    useEffect(() => {
        getTotalQueue();
    }, [getTotalQueue]);

    useEffect(() => {
        setLoading(true);

        socket.connect();

        socket.on('connect', () => {
            console.log(socket.id); // an alphanumeric id...
        });

        socket.on('total', () => {
            getTotalQueue();
        });

        setLoading(false);
        return () => {
            socket.disconnect();
        };
    }, [getTotalQueue]);

    const addQueue = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        socket.emit('getTotalQueue', parseInt(e.currentTarget.value));

        try {
            setLoading(true);
            const token = cookies.auth;
            const response = await fetch('/api/queue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    locket_id: e.currentTarget.value,
                }),
            });

            const body = await response.json();

            console.log(body.data);
            if (!body.errors) {
                setLoading(true);
                await getTotalQueue();
                setLoading(false);
            } else {
                setLoading(false);
                throw new Error(body.errors);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    return (
        <section className="min-h-full">
            <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-3 col-span-4 bg-purples rounded-xl text-white text-left p-6 shadow-box border-2 border-darks2">
                    <div>
                        <p>{dates.format('LLLL')}</p>
                        <h1 className="text-4xl font-bold my-6">
                            Selamat Datang di Dinas Pendidikan Kota Palangka
                            Raya
                        </h1>
                        <p className="text-2xl">Semoga harimu menyenangkan!</p>
                    </div>
                    <img className="h-48" src={tutWuriImg} alt="" />
                </div>
                {locket.map((value: Locket, index: number) =>
                    index > 3 ? (
                        <div
                            key={index}
                            className="col-span-2 bg-white rounded-xl text-purples shadow-box border-2 border-darks2"
                        >
                            <h3 className="text-2xl my-3 uppercase font-semibold">
                                Antrian
                            </h3>
                            <h1 className="text-6xl my-6 font-bold">
                                {queues.get(value.id)?.total ?? '-'}
                            </h1>
                            <h3 className="text-2xl my-3 uppercase font-semibold">
                                Loket {value.name}
                            </h3>
                            <Button
                                loadingText="Tambah Antrian"
                                isLoading={loading}
                                onClick={addQueue}
                                marginBlock={5}
                                backgroundColor="purples"
                                color="white"
                                value={value.id}
                                leftIcon={<IoMdAddCircle size={25} />}
                            >
                                Tambah Antrian
                            </Button>
                        </div>
                    ) : (
                        <div
                            key={index}
                            className="col-span-1 bg-white rounded-xl text-purples shadow-box border-2 border-darks2"
                        >
                            <h3 className="text-2xl my-3 uppercase font-semibold">
                                Antrian
                            </h3>
                            <h1 className="text-6xl my-6 font-bold">
                                {queues.get(value.id)?.total ?? '-'}
                            </h1>
                            <h3 className="text-2xl my-3 uppercase font-semibold">
                                Loket {value.name}
                            </h3>
                            <Button
                                loadingText="Tambah Antrian"
                                isLoading={loading}
                                onClick={addQueue}
                                marginBlock={5}
                                backgroundColor="purples"
                                color="white"
                                value={value.id}
                                leftIcon={<IoMdAddCircle size={25} />}
                            >
                                Tambah Antrian
                            </Button>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}
