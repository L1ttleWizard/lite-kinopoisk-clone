import { useEffect, useRef } from 'react';

interface UseObserverProps {
    targetRef: React.RefObject<HTMLElement | null>;
    canLoad: boolean;
    isLoading: boolean;
    callback: () => void;
}

export const useObserver = ({ targetRef, canLoad, isLoading, callback }: UseObserverProps) => {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        const cb: IntersectionObserverCallback = (entries) => {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        };

        observer.current = new IntersectionObserver(cb);
        if (targetRef.current) {
            observer.current.observe(targetRef.current);
        }
    }, [isLoading, canLoad, callback, targetRef]);
};