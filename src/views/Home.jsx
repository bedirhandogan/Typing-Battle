import Typing from "../components/Layout/Typing";
import WordProvider from "../context/WordProvider";
import Config from "../components/Layout/Config";
import Keyboard from "../components/Layout/Keyboard";
import Duration from "../components/Layout/Duration";
import Score from "../components/Score";
import StateProvider from "../context/StateProvider";

function Home() {
    return (
        <StateProvider>
            <WordProvider>
                <Score />
                <Config />
                <Duration />
                <Typing />
                <Keyboard />
            </WordProvider>
        </StateProvider>
    );
}

export default Home;