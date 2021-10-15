export const calcTimeLeft = (date: any) => {
    const difference = +new Date(date) - +new Date();
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
    }
}