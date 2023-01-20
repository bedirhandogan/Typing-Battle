import Typing from "../components/Layout/Typing";
import WordProvider from "../context/WordProvider";
import Config from "../components/Layout/Config";
import Keyboard from "../components/Layout/Keyboard";
import ScoreProvider from "../context/ScoreProvider";

function Home() {
    return (
        <WordProvider>
            <ScoreProvider>
                <Config />
                <Typing />
                <Keyboard />
            </ScoreProvider>
        </WordProvider>
    );
}

export default Home;