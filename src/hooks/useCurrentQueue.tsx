import { useCallback, useEffect, useState } from 'react';
import { Locket } from '../types/locket';
import { socket } from '../socket';

export default function useCurrentQueue(name: string) {
    const [locket, setLocket] = useState<Locket>();
    const [current, setCurrent] = useState<number>();
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

    const getTotalQueue = useCallback(async () => {
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
                    setCurrent(body.data.currentQueue);
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
        getTotalQueue();
    }, [getTotalQueue]);

    useEffect(() => {
        socket.connect();

        socket.on('current', () => {
            getTotalQueue();
        });

        return () => {
            socket.off('current');
        };
    }, [getTotalQueue]);

    return current;
}
