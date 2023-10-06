import { useEffect } from "react";

// custom hook
export function useKey(key, action) {

    useEffect(function () {
        function callback(e) {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                action();
            }
        }

        document.addEventListener('keydown', callback);

        // cleanup function
        return () => {
            document.removeEventListener('keydown', callback);
        };
    }, [key, action]);

    return null;
}