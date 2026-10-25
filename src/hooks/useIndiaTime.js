import { useEffect, useState } from 'react';

let formatter = null;
try {
    formatter = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
} catch {
    // very old browsers can't format other time zones; the clock is simply left out
}

// Current time in Rajkot as "HH:MM", or '' when the browser can't tell
export default function useIndiaTime() {
    const [time, setTime] = useState(() => (formatter ? formatter.format(new Date()) : ''));

    useEffect(() => {
        if (!formatter) return;
        const id = setInterval(() => setTime(formatter.format(new Date())), 15000);
        return () => clearInterval(id);
    }, []);

    return time;
}
