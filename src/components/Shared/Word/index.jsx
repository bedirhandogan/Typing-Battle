import './styles.css';
import {useEffect, useState} from "react";

function Word({value}) {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        value.split('').forEach((v, i) => {
            setLetters(prevState => [...prevState, { index: i, check: "empty", letter: v}]);
        });

        return () => setLetters([]);
    }, [value]);

    const wordInputHandler = async (event) => {
        const index = letters.findIndex(v => v.index === (event.target.value.length - 1) && v.letter === event.nativeEvent.data);
        const length = event.target.value.length;
        const inputted_letter = event.nativeEvent.data;

        if (letters.length >= length) {
            if (event.nativeEvent.inputType !== "deleteContentBackward") { // backspace keypress
                if (index !== -1) { // wrong keypress
                    await setLetters(letters.map(value => {
                        if (value.index === (length - 1) && value.letter === inputted_letter) {
                            return {...value, check: "true"};
                        } else return value; }
                    ));
                } else {
                    await setLetters(letters.map(value => {
                        if (value.index !== (length - 1) && value.letter !== inputted_letter) {
                            return value;
                        } else return {...value, check: "false"}; }
                    ));
                }
            } else {
                await setLetters(letters.map(value => {
                    if (value.index === length) {
                        return { ...value, check: "empty" };
                    } else return value;
                }));
            }
        } else {
            // next input
        }
    }

    const onKeyDownHandler = (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
        }
    }

    return (
        <div className={"word"}>
            <div className={"word-letters"}>
                { letters.map((v, i) => <span key={i} id={v?.check}>{v?.letter}</span>) }
            </div>
            <input onKeyDown={onKeyDownHandler} className={"word-input"} type={"text"} spellCheck={"false"} autoComplete="off" autoCapitalize="off" autoCorrect={"off"} onInput={wordInputHandler} />
        </div>
    );
}

export default Word;