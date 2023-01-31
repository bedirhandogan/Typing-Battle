export const calculateWPM = (correctWord, wrongWord, duration) => {
    return (correctWord + wrongWord) / (duration === "30" ? 0.5 : duration === "60" ? 1 : duration === "120" ? 2 : duration);
}

export const calculateWCPM = (correctWord, wrongWord, duration) => {
    return ((correctWord + wrongWord) - wrongWord) / (duration === "30" ? 0.5 : duration === "60" ? 1 : duration === "120" ? 2 : duration);
}

export const calculateAccuracy = (correctWord, wrongWord, duration) => {
    return (calculateWCPM(correctWord, wrongWord, duration) / calculateWPM(correctWord, wrongWord, duration)) * 100;
}

export const calculateWrongs = (correctWord, wrongWord, duration) => {
    return 100 - ((calculateWCPM(correctWord, wrongWord, duration) / calculateWPM(correctWord, wrongWord, duration)) * 100);
}
