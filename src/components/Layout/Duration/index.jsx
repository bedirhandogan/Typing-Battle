import './styles.css';
import {useContext} from "react";
import {Context} from "context/StateProvider";

function Duration() {
    const { state } = useContext(Context);

    return <div className={"duration"}>{state.time.duration}</div>;
}

export default Duration;