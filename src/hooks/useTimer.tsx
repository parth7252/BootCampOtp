import { useCallback, useEffect, useRef, useState } from "react";


export default function useTimer(initialSec = 60) {
    const [timeLeft, setTimeLeft] = useState<number>(initialSec);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {

        if (timeLeft <= 0) {
            if (timerRef.current){
                clearInterval(timerRef.current)
                timerRef.current = null;
            }
            return;
        }
        timerRef.current = globalThis.setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        };
    },[timeLeft]);

    const reset = useCallback(() => setTimeLeft(initialSec), [initialSec]);

    return { timeLeft, reset };
}
