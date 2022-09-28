export const AddDays = (date, days) => {
    let originalTimeStamp = date.getTime();
    originalTimeStamp += days * 86400000;
    return new Date(originalTimeStamp);
}

export const DateToString = (date) => {
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    return `${year}-${month}-${day}`
}