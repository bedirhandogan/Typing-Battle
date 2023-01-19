import './styles.css';
import Word from "../../Shared/Word";
import {Context} from "../../../context/WordProvider";
import {useContext} from "react";
import {CursorArrowIcon} from "@radix-ui/react-icons";

function Typing() {
    const { words } = useContext(Context);

    const clickHandler = async () => {
        document.body.querySelector(".word > input[aria-disabled='false']").focus();
    }

    return (
        <form className={"typing"} onClick={clickHandler}>
            <div className={"hover-text"}><CursorArrowIcon /> Click to write </div>
            { words?.map((v, i) => <Word value={v?.word} key={i} isDisable={v?.disable} />) }
        </form>
    );
}

export default Typing;