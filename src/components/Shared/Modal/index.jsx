import './styles.css';
import {IconX} from "@tabler/icons";
import {useContext} from "react";
import {Context as ShowModalContext} from "../../../context/ShowModalProvider";
import {Context as ScoreContext} from "../../../context/ScoreProvider";

function Modal({title, children}) {
    const {showModal, setShowModal} = useContext(ShowModalContext);
    const {setScore} = useContext(ScoreContext);

    const handleClick = () => {
        setShowModal(false);
        setScore({ correctWord: 0, wrongWord: 0 });
    }

    return (
        <div className={"modal"} style={showModal ? {display: "flex"} : {display: "none"}}>
            <div className={"modal-header"}>
                {title}
                <div className={"modal-close-btn"} onClick={handleClick}>
                    <IconX style={{ color: "var(--text-color-primary)"}}/>
                </div>
            </div>
            {children}
        </div>
    );
}

export default Modal;