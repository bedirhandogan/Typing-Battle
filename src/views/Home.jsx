import Typing from "../components/Layout/Typing";
import WordProvider from "../context/WordProvider";
import Config from "../components/Layout/Config";
import Keyboard from "../components/Layout/Keyboard";
import ScoreProvider from "../context/ScoreProvider";
import TimeProvider from "../context/TimeProvider";
import Duration from "../components/Layout/Duration";
import Modal from "../components/Shared/Modal";
import ShowModalProvider from "../context/ShowModalProvider";
import Indicator from "../components/Shared/Indicator";

function Home() {
    return (
        <WordProvider>
            <ScoreProvider>
                <TimeProvider>
                    <ShowModalProvider>
                        <Modal title={"Score"}>
                            <div className={"indicators"}>
                                <Indicator name={"wpm"} />
                                <Indicator name={"wcpm"} />
                                <Indicator name={"accuracy"} />
                                <Indicator name={"wrong"} />
                            </div>
                        </Modal>
                        <Config />
                        <Duration />
                        <Typing />
                        <Keyboard />
                    </ShowModalProvider>
                </TimeProvider>
            </ScoreProvider>
        </WordProvider>
    );
}

export default Home;