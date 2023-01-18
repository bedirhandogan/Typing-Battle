import './styles.css';
import Word from "../../Shared/Word";
import {Context} from "../../../context/WordProvider";
import {useContext, useRef} from "react";

function Typing() {
    const { words } = useContext(Context);
    const form = useRef();

    const clickHandler = async () => {
        const inputs = document.body.querySelectorAll(".word > input");
        await inputs.forEach(v => (v.disabled === false) && v.focus());
    }

    return (
        <form className={"typing"} onClick={clickHandler} ref={form}>
            { words?.map((v, i) => <Word value={v?.word} key={i} isDisable={v?.disable} />) }
        </form>
    );
}

export default Typing;