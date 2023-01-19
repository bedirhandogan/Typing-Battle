import './styles.css';
import Word from "../../Shared/Word";
import {Context} from "../../../context/WordProvider";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {CursorArrowIcon} from "@radix-ui/react-icons";

function Typing() {
    const { words } = useContext(Context);
    const formRef = useRef();
    const [formIncludePath, setFormIncludePath] = useState(true);

    const clickHandler = useCallback(event => {
        if (event.composedPath().includes(formRef.current)) {
            document.body.querySelector(".word > input[aria-disabled='false']").focus();
            setFormIncludePath(true);
        } else setFormIncludePath(false);
    }, []);

    useEffect(() => {
        document.addEventListener("click", clickHandler);

        return () => document.removeEventListener("click", clickHandler);
    }, [clickHandler])

    return (
        <form className={`typing ${formIncludePath ? 'active' : ''}`} ref={formRef}>
            <div className={"hover-text"}><CursorArrowIcon /> Click to write </div>
            { words?.map((v, i) => <Word value={v?.word} key={i} isDisable={v?.disable} />) }
        </form>
    );
}

export default Typing;