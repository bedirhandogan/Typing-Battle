import './styles.css';
import Word from "../../Shared/Word";

function Typing() {
    const words = ["Hello", "world", "apple", "orange", "with", "car", "sky"];

    return (
        <form className={"typing"}>
            { words.map((v, i) => <Word value={v} key={i} />) }
        </form>
    );
}

export default Typing;