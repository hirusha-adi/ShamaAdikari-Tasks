export function getDateOrdinalSuffix(day) {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
        case 1: return `${day}st`;
        case 2: return `${day}nd`;
        case 3: return `${day}rd`;
        default: return `${day}th`;
    }
}

function _getDate(date) {
    var dateObj;
    if (date) {
        if (date === "Tomorrow") {
            dateObj = new Date(Date.now() + 1000 * 60 * 60 * 24);
        }
        else if (date === "Today") {
            dateObj = new Date();
        }
        else {
            dateObj = new Date(date);
        }
    } else {
        dateObj = new Date();
    }
    return dateObj;
}

export function getFormattedDate(date) {
    const dateObj = _getDate(date);
    const formattedDate = dateObj.toLocaleDateString("en-US"); // Format as DD/MM/YYYY
    return formattedDate;
}

export function getFormattedDayOfWeek(date) {
    const dateObj = _getDate(date);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" }); // Get day name
    return dayOfWeek;
}

export function getFormattedDayWithSuffix(date) {
    const dateObj = _getDate(date);
    const dayOfMonth = dateObj.getDate();
    const monthName = dateObj.toLocaleDateString("en-US", { month: "long" });
    const formattedDateWithSuffix = `${getDateOrdinalSuffix(dayOfMonth)} of ${monthName} ${dateObj.getFullYear()}`;
    return formattedDateWithSuffix;
}
