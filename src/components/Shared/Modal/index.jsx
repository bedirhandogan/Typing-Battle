import './styles.css';
import {IconX} from "@tabler/icons";
import {useContext} from "react";
import {Context as ShowModalContext} from "../../../context/ShowModalProvider";

function Modal({title, children}) {
    const {showModal, setShowModal} = useContext(ShowModalContext);

    return (
        <div className={"modal"} style={showModal ? {display: "flex"} : {display: "none"}}>
            <div className={"modal-header"}>
                {title}
                <div className={"modal-close-btn"} onClick={() => setShowModal(false)}>
                    <IconX style={{ color: "var(--text-color-primary)"}}/>
                </div>
            </div>
            {children}
        </div>
    );
}

export default Modal;