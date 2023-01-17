import Typing from "../components/Layout/Typing";
import WordProvider from "../context/WordProvider";
import Config from "../components/Layout/Config";

function Home() {
    return (
        <>
            <WordProvider>
                <Config />
                <Typing />
            </WordProvider>
        </>
    );
}

export default Home;