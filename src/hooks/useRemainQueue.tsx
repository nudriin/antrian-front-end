import { useCallback, useEffect, useState } from 'react';
import { Locket } from '../types/locket';
import { socket } from '../socket';
import { QueueAggregateResponse } from '../types/queue';

export default function useRemainQueue(name: string) {
    const [locket, setLocket] = useState<Locket>();
    const [remain, setRemain] = useState<QueueAggregateResponse>();
    const [loading, setLoading] = useState<boolean>(false);

    const getLocketName = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/locket/${name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const body = await response.json();

            if (!body.errors) {
                setLocket(body.data);
                setLoading(false);
            } else {
                setLoading(false);
                throw new Error(body.errors);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [name]);

    const getRemainQueue = useCallback(async () => {
        try {
            if (!loading && locket?.id) {
                const response = await fetch(
                    `/api/queue/${locket?.id}/remain`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const body = await response.json();
                if (!body.errors) {
                    setRemain(body.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    throw new Error(body.errors);
                }
            } else {
                setLoading(false);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }, [loading, locket]);

    useEffect(() => {
        getLocketName();
    }, [getLocketName]);

    useEffect(() => {
        getRemainQueue();
    }, [getRemainQueue]);

    useEffect(() => {
        socket.connect();

        socket.on('remainQueue', (data) => {
            setRemain(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return remain;
}
