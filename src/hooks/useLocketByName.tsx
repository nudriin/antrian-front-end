import { useCallback, useEffect, useState } from 'react';
import { Locket } from '../types/locket';

export default function useLocketByName(name: string) {
    const [locket, setLocket] = useState<Locket>();
    const [, setLoading] = useState<boolean>(false);

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

    useEffect(() => {
        getLocketName();
    }, [getLocketName]);

    return locket;
}
