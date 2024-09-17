import { useCallback, useEffect, useState } from 'react';
import { Locket } from '../types/locket';
import { socket } from '../socket';
import { QueueAggregateResponse } from '../types/queue';

export default function useCurrentQueue(name: string) {
    const [locket, setLocket] = useState<Locket>();
    const [current, setCurrent] = useState<QueueAggregateResponse>();
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

    const getCurrentQueue = useCallback(async () => {
        try {
            if (!loading && locket?.id) {
                const response = await fetch(
                    `/api/queue/${locket?.id}/current`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const body = await response.json();
                if (!body.errors) {
                    setCurrent(body.data);
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
        getCurrentQueue();
    }, [getCurrentQueue]);

    useEffect(() => {
        socket.connect();

        socket.on('currentQueue', (data) => {
            setCurrent(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [getCurrentQueue]);

    return current;
}
