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
        const targetLength = event.target.value.length;

        if (letters.length >= targetLength) {
            setLetters(prevState => prevState.map(value => {
                if (event.nativeEvent.inputType !== "deleteContentBackward" && value.index === (targetLength - 1)) {
                    return {...value, check: (index !== -1 ? "true" : "false")};
                } else if (value.index === targetLength) {
                    return { ...value, check: "empty" };
                }

                return value;
            }));
        } else { // next input
            const letters = [...wordLettersRef.current.children];
            const lettersIds = [];
            const form = event.target.form;
            const formIndex = [...form].indexOf(event.target);

            const wordList = JSON.parse(JSON.stringify(state.words));

            if (event.nativeEvent.data === " " && formIndex < (event.target.form.length - 1)) {
                wordList[formIndex].disable = true;
                wordList[formIndex + 1].disable = false;

                letters.forEach(v => lettersIds.push(v.id));
                const lettersCheck = lettersIds.filter(v => v === "true");

                await dispatch({ type: "words", value: wordList });
                form[formIndex + 1].focus();

                dispatch(lettersCheck.length === (targetLength - 1) ?
                    { type: 'score', value: {...state.score, correctWord: state.score.correctWord + 1}} :
                    { type: 'score', value: {...state.score, wrongWord: state.score.wrongWord + 1}});
            }

            event.target.value = event.target.value.slice(0, letters.length);
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