import './styles.css';
import {useContext, useEffect, useState} from "react";
import {Context} from "../../../context/WordProvider";

function Word({value, isDisable}) {
    const [letters, setLetters] = useState([]);

    const { words, setWords } = useContext(Context);

    useEffect(() => {
        value?.split('').forEach((v, i) => {
            setLetters(prevState => [...prevState, { index: i, check: "empty", letter: v}]);
        });

        document.body.querySelector(".word > input[aria-disabled='false']").focus();

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
            const formIndex = [...form].indexOf(event.target);

            const wordList = JSON.parse(JSON.stringify(words));

            if (event.nativeEvent.data === " ") {
                if (formIndex < (event.target.form.length - 1)) {
                    wordList[formIndex].disable = true;
                    wordList[formIndex + 1].disable = false;

                    await setWords(wordList);
                    await form[formIndex + 1].focus();
                }
            } else {
                if (/[a-zA-Z0-9wığüşöçĞÜŞÖÇİ]/.test(event.target.value[letters.length])) {
                    event.target.value = event.target.value.slice(0, letters.length);
                }
            }
        }
    }

    const onKeyDownHandler = (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
        }
    }

    const onClickHandler = (event) => {
        event.target.setSelectionRange(event.target.value.length, event.target.value.length);
    }

    return (
        <div className={"word"}>
            <div className={"word-letters"}>
                { letters.map((v, i) => <span key={i} id={v?.check}>{v?.letter}</span>) }
            </div>
            <input onKeyDown={onKeyDownHandler}
                   onInput={onInputHandler}
                   onClick={onClickHandler}
                   disabled={isDisable}
                   aria-disabled={isDisable}
                   maxLength={letters.length + 1}
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