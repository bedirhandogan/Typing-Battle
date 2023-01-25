import './styles.css';
import Word from "../../Shared/Word";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {IconClick} from "@tabler/icons";
import {wordList} from "../../utilities";
import {Context} from "../../../context/StateProvider";

function Typing() {
    const [inputFocus, setInputFocus] = useState(true);
    const { state, dispatch } = useContext(Context);
    const formRef = useRef();

    const handleClick = useCallback(async event => {
        if (event.composedPath().includes(formRef.current)) {
            setInputFocus(true);
            formRef.current[0].disabled = false;

            await [...formRef.current].forEach(v => {
                if (v.ariaDisabled === "false") v.focus();
            });
        } else {
            setInputFocus(false);
        }
    }, []);

    const handleFocus = useCallback(() => {
        if (!document.hasFocus()) setInputFocus(false);
        formRef.current[0].disabled = true;
    }, []);

    const handleInput = (event) => {
        if (event.target.form[0].value.length <= 1) {
            let duration = state.time.duration;

            let interval = setInterval(async () => {
                duration--;
                dispatch({ type: "time", value: { duration: duration, started: true }});

                if (duration === 0) {
                    clearInterval(interval)

                    dispatch({ type: "time", value: { duration: localStorage.getItem("time"), started: false }});
                    dispatch({ type: 'showScoreArea', value: true });
                    dispatch({ type: "words", value: wordList() });

                    await [...formRef.current].forEach(v => {
                        if (!!v.value) v.value = "";
                    });
                }
            }, 1000);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("focusout", handleFocus);

        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("focusout", handleFocus);
        }
    }, [handleClick, handleFocus]);

    return (
        <form className={`typing ${inputFocus ? 'active' : ''}`} ref={formRef} onInput={handleInput}>
            <div className={"hover-text"}>
                <div>Click to write</div>
                <IconClick stroke={2} style={{ color: "var(--color-5)"}} />
            </div>
            { state.words.map((v, i) => <Word value={v?.word} key={i} isDisable={v?.disable} />) }
        </form>
    );
}

export default Typing;