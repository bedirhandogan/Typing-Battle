import Typing from "../components/Layout/Typing";
import WordProvider from "../context/WordProvider";
import Config from "../components/Layout/Config";
import Keyboard from "../components/Layout/Keyboard";

function Home() {
    return (
        <>
            <WordProvider>
                <Config />
                <Typing />
                <Keyboard />
            </WordProvider>
        </>
    );
}

export default Home;