import { useEffect, useRef } from "react";

const useInterval = (callback, interval) => {
    const latestCallback = useRef();

    useEffect(() => {
        latestCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const timer = window.setInterval(() => {
            latestCallback.current();
        }, interval);
        return () => window.clearInterval(timer);
    }, [callback, interval]);
};

export default useInterval;
