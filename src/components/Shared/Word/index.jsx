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

    const onInputHandler = async (event) => {
        const index = letters.findIndex(v => v.index === (event.target.value.length - 1) && v.letter === event.nativeEvent.data);
        const length = event.target.value.length;

        if (letters.length >= length) {
            if (event.nativeEvent.inputType !== "deleteContentBackward") {
                if (index !== -1) { // wrong keypress
                    await setLetters(letters.map(value => {
                        if (value.index === (length - 1)) {
                            return {...value, check: "true"};
                        } else return value; }
                    ));
                } else {
                    await setLetters(letters.map(value => {
                        if (value.index !== (length - 1)) {
                            return value;
                        } else return {...value, check: "false"}; }
                    ));
                }
            } else { // backspace keypress
                await setLetters(letters.map(value => {
                    if (value.index === length) {
                        return { ...value, check: "empty" };
                    } else return value;
                }));
            }
        } else { // next input
            const form = event.target.form;
            const index = [...form].indexOf(event.target);

            event.target.disabled = true;
            await form[index + 1].focus();
        }
    }

    const onKeyDownHandler = (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
        }
    }

    const onClickHandler = (event) => event.target.setSelectionRange(event.target.value.length, event.target.value.length);

    return (
        <div className={"word"}>
            <div className={"word-letters"}>
                { letters.map((v, i) => <span key={i} id={v?.check}>{v?.letter}</span>) }
            </div>
            <input onKeyDown={onKeyDownHandler}
                   onInput={onInputHandler}
                   onClick={onClickHandler}
                   className={"word-input"}
                   type={"text"}
                   spellCheck={"false"}
                   autoComplete="off"
                   autoCapitalize="off"
                   autoCorrect={"off"}
            />
        </div>
    );
}

export default Word;