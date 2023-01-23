import Typing from "../components/Layout/Typing";
import WordProvider from "../context/WordProvider";
import Config from "../components/Layout/Config";
import Keyboard from "../components/Layout/Keyboard";
import ScoreProvider from "../context/ScoreProvider";
import TimeProvider from "../context/TimeProvider";
import Duration from "../components/Layout/Duration";
import Modal from "../components/Shared/Modal";
import ShowModalProvider from "../context/ShowModalProvider";

function Home() {
    return (
        <WordProvider>
            <ScoreProvider>
                <TimeProvider>
                    <ShowModalProvider>
                        <Modal title={"Statistics"} />
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