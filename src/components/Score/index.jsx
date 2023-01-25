import './styles.css';
import {IconReload} from "@tabler/icons";
import {useContext} from "react";
import Indicator from "../Shared/Indicator";
import {Context} from "../../context/StateProvider";

function Score() {
    const {state, dispatch} = useContext(Context);

    const handleClick = () => {
        dispatch({ type: 'showScoreArea', value: false });
        dispatch({ type: 'score', value: { correctWord: 0, wrongWord: 0 }})
    }

    return (
        <div className={"score"} style={state.showScoreArea ? {display: "flex"} : {display: "none"}}>
            <div className={"indicators"}>
                <Indicator name={"wpm"} />
                <Indicator name={"wcpm"} />
                <Indicator name={"accuracy"} />
                <Indicator name={"wrong"} />
            </div>

            <div className={"score-reload"}>
                Click to reload and write
                <div className={"score-close-btn"} onClick={handleClick}>
                    <IconReload style={{ color: "var(--color-5)"}}/>
                </div>
            </div>
        </div>
    );
}

export default Score;