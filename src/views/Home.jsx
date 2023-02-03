import Typing from "components/Layout/Typing";
import Config from "components/Layout/Config";
import Keyboard from "components/Layout/Keyboard";
import Duration from "components/Layout/Duration";
import Score from "components/Layout/Score";
import StateProvider from "context/StateProvider";

function Home() {
    return (
        <StateProvider>
            <Score />
            <Config />
            <Duration />
            <Typing />
            <Keyboard />
        </StateProvider>
    );
}

export default Home;