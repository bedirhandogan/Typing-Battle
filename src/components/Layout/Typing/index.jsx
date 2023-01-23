import './styles.css';
import Word from "../../Shared/Word";
import {Context as WordContext} from "../../../context/WordProvider";
import {Context as TimeContext} from "../../../context/TimeProvider";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {IconClick} from "@tabler/icons";
import {Context as ShowModalContext} from "../../../context/ShowModalProvider";
import {wordList} from "../../utilities";

function Typing() {
    const [inputFocus, setInputFocus] = useState(true);
    const { words, setWords } = useContext(WordContext);
    const { time, setTime } = useContext(TimeContext);
    const { setShowModal } = useContext(ShowModalContext);
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
            let duration = time.duration;

            let interval = setInterval(async () => {
                duration--;
                setTime({started: true, duration: duration});

                if (duration === 0) {
                    clearInterval(interval);
                    setTime({started: false, duration: 0});
                    setShowModal(true);
                    await [...formRef.current].forEach(v => {
                        if (!!v.value) v.value = "";
                    });
                    await setWords(wordList());
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
                <IconClick stroke={2} style={{ color: "var(--text-color-primary)"}} />
            </div>
            { words?.map((v, i) => <Word value={v?.word} key={i} isDisable={v?.disable} />) }
        </form>
    );
}

export default Typing;