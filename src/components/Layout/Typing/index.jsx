import './styles.css';
import Word from "../../Shared/Word";
import {Context} from "../../../context/WordProvider";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {ReloadIcon} from "@radix-ui/react-icons";
import {wordList} from "../../utilities";

function Typing() {
    const input = document.body.querySelector(".word > input[aria-disabled='false']");
    const [formIncludePath, setFormIncludePath] = useState(true);
    const { words, setWords } = useContext(Context);
    const formRef = useRef();

    const handleClick = useCallback(async event => {
        if (event.composedPath().includes(formRef.current)) {
            setFormIncludePath(true);
            input.disabled = false;
            input.focus();

            await [...formRef.current].forEach(v => {
                if (!!v.value) v.value = ""; }
            );

            if (!formIncludePath) await setWords(wordList());
        } else {
            setFormIncludePath(false);
        }
    }, [setWords, formIncludePath, input]);

    const handleFocus = useCallback(() => {
        if (!document.hasFocus()) setFormIncludePath(false);
        input.disabled = true;
    }, [input]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("focusout", handleFocus);

        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("focusout", handleFocus);
        }
    }, [handleClick, handleFocus]);

    return (
        <form className={`typing ${formIncludePath ? 'active' : ''}`} ref={formRef}>
            <div className={"hover-text"}>
                <div>Click to reload and write</div>
                <ReloadIcon />
            </div>
            { words?.map((v, i) => <Word value={v?.word} key={i} isDisable={v?.disable} />) }
        </form>
    );
}

export default Typing;