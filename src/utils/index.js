export const calculateWPM = (correctLetter, wrongLetter, duration) => {
    return (correctLetter + wrongLetter) / (duration === "30" ? 0.5 : duration === "60" ? 1 : duration === "120" ? 2 : duration);
}

export const calculateWCPM = (correctLetter, wrongLetter, duration) => {
    return ((correctLetter + wrongLetter) - wrongLetter) / (duration === "30" ? 0.5 : duration === "60" ? 1 : duration === "120" ? 2 : duration);
}

export const calculateAccuracy = (correctLetter, wrongLetter, duration) => {
    return (calculateWCPM(correctLetter, wrongLetter, duration) / calculateWPM(correctLetter, wrongLetter, duration)) * 100;
}

export const calculateWrongs = (correctLetter, wrongLetter, duration) => {
    return 100 - ((calculateWCPM(correctLetter, wrongLetter, duration) / calculateWPM(correctLetter, wrongLetter, duration)) * 100);
}
