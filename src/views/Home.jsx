import Typing from "../components/Layout/Typing";
import WordProvider from "../context/WordProvider";
import Config from "../components/Layout/Config";
import Keyboard from "../components/Layout/Keyboard";
import ScoreProvider from "../context/ScoreProvider";
import Duration from "../components/Layout/Duration";
import Score from "../components/Score";
import StateProvider from "../context/StateProvider";

function Home() {
    return (
        <StateProvider>
            <WordProvider>
                <ScoreProvider>
                    <Score />
                    <Config />
                    <Duration />
                    <Typing />
                    <Keyboard />
                </ScoreProvider>
            </WordProvider>
        </StateProvider>
    );
}

export default Home;