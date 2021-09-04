import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Footer, Header } from './components/index';
import Router from "./Router";

function App() {
    return (
        <div className="App">
            <Header />
            <BrowserRouter>
                <main className="main wrapper">
                    <Router />
                </main>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
