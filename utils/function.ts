export function throttle(callback: (...args: any[]) => void, delay: number) {
    let lastCall = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    return function (...args: any[]) {
        const now = Date.now();

        if (now - lastCall < delay) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                lastCall = now;
                callback(...args);
            }, delay);
        } else {
            lastCall = now;
            callback(...args);
        }
    };
}
