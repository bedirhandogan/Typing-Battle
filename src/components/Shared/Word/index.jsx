import './styles.css';
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "context/StateProvider";

function Word({value, isDisable}) {
    const [letters, setLetters] = useState([]);
    const wordLettersRef = useRef();

    const {state, dispatch} = useContext(Context);

    useEffect(() => {
        value?.split('').forEach((v, i) => {
            setLetters(prevState => [...prevState, { index: i, check: "empty", letter: v}]);
        });

        document.body.querySelector(".word > input[aria-disabled='false']").focus();

        return () => setLetters([]);
    }, [value]);

    const handleInput = async (event) => {
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
            const letters = [...wordLettersRef.current.children];
            const lettersIds = [];
            const form = event.target.form;
            const formIndex = [...form].indexOf(event.target);

            const wordList = JSON.parse(JSON.stringify(state.words));

            if (event.nativeEvent.data === " ") {
                if (formIndex < (event.target.form.length - 1)) {
                    wordList[formIndex].disable = true;
                    wordList[formIndex + 1].disable = false;

                    letters.forEach(v => lettersIds.push(v.id));
                    const lettersCheck = lettersIds.filter(v => v === "true");

                    await dispatch({ type: "words", value: wordList });
                    await form[formIndex + 1].focus();
                    if (lettersCheck.length === (length - 1)) {
                        dispatch({ type: 'score', value: {...state.score, correctWord: state.score.correctWord + 1}})
                    } else dispatch({ type: 'score', value: {...state.score, wrongWord: state.score.wrongWord + 1}})
                }
            } else {
                if (event.target.value[letters.length] !== " ") {
                    event.target.value = event.target.value.slice(0, letters.length);
                }
            }
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
        }
    }

    const handleClick = (event) => {
        event.target.setSelectionRange(event.target.value.length, event.target.value.length);
    }

    return (
        <div className={"word"}>
            <div className={"word-letters"} ref={wordLettersRef}>
                { letters.map((v, i) => <span key={i} id={v?.check}>{v?.letter}</span>) }
            </div>
            <input onKeyDown={handleKeyDown}
                   onInput={handleInput}
                   onClick={handleClick}
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