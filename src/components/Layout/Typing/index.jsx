import './styles.css';
import Word from "../../Shared/Word";
import {Context} from "../../../context/WordProvider";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {CursorArrowIcon} from "@radix-ui/react-icons";
import {wordList} from "../../utilities";

function Typing() {
    const [formIncludePath, setFormIncludePath] = useState(true);
    const { words, setWords } = useContext(Context);
    const formRef = useRef();

    const clickHandler = useCallback(async event => {
        if (event.composedPath().includes(formRef.current)) {
            setFormIncludePath(true);
            document.body.querySelector(".word > input[aria-disabled='false']").focus();

            await [...formRef.current].forEach(v => v.value = "");
            if (!formIncludePath) await setWords(wordList());
        } else {
            setFormIncludePath(false);
        }
    }, [setWords, formIncludePath]);

    useEffect(() => {
        document.addEventListener("click", clickHandler);

        return () => document.removeEventListener("click", clickHandler);
    }, [clickHandler])

    return (
        <form className={`typing ${formIncludePath ? 'active' : ''}`} ref={formRef}>
            <div className={"hover-text"}><CursorArrowIcon /> Click to write and reload</div>
            { words?.map((v, i) => <Word value={v?.word} key={i} isDisable={v?.disable} />) }
        </form>
    );
}

export default Typing;