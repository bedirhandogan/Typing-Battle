import Typing from "../components/Layout/Typing";
import WordProvider from "../context/WordProvider";
import Config from "../components/Layout/Config";
import Keyboard from "../components/Layout/Keyboard";
import ScoreProvider from "../context/ScoreProvider";
import TimeProvider from "../context/TimeProvider";
import Duration from "../components/Layout/Duration";

function Home() {
    return (
        <WordProvider>
            <ScoreProvider>
                <TimeProvider>
                    <Config />
                    <Duration />
                    <Typing />
                    <Keyboard />
                </TimeProvider>
            </ScoreProvider>
        </WordProvider>
    );
}

export default Home;