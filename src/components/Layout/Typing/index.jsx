import './styles.css';
import Word from "components/Shared/Word";
import {useCallback, useContext, useEffect, useRef} from "react";
import {IconClick} from "@tabler/icons";
import {wordList} from "json";
import {Context} from "context/StateProvider";

function Typing() {
    const { state, dispatch } = useContext(Context);
    const formRef = useRef();

    const handleClick = useCallback(async event => {
        if (event.composedPath().includes(formRef.current)) {
            dispatch({ type: "inputFocus", value: true });
            formRef.current[0].disabled = false;

            await [...formRef.current].forEach(v => {
                if (v.ariaDisabled === "false") v.focus();
            });

            return;
        }

        dispatch({ type: "inputFocus", value: false });
    }, [dispatch]);

    const handleFocus = useCallback(() => {
        if (!document.hasFocus()) dispatch({ type: "inputFocus", value: false });
        formRef.current[0].disabled = true;
    }, [dispatch]);

    const handleInput = (event) => {
        let duration = state.time.duration;

        if (event.target.form[0].value.length) {
            let interval = setInterval(async () => {
                duration--;
                dispatch({ type: "time", value: { duration: duration, started: true }});

                if (duration === 0) {
                    clearInterval(interval);

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
        <form className={`typing ${state.inputFocus ? 'active' : ''}`} ref={formRef} onInput={handleInput}>
            <div className={"hover-text"}>
                <div>Click to write</div>
                <IconClick stroke={2} style={{ color: "var(--color-5)"}} />
            </div>
            { state.words.map((v, i) => <Word value={v?.word} key={i} isDisable={v?.disable} />) }
        </form>
    );
}

export default Typing;