import Typing from "../components/Layout/Typing";
import WordProvider from "../context/WordProvider";

function Home() {
    return (
        <>
            <WordProvider>
                <Typing />
            </WordProvider>
        </>
    );
}

export default Home;