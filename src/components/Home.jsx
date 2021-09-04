import { useHistory } from 'react-router-dom';
import '../assets/sass/home.scss';
import '../assets/sass/note.scss';
import { Button, EnterKey, Key, Note } from '../components/index';
import * as Strings from '../strings';

const Home = () => {
    const history = useHistory();

    const toStart = () => {
        history.push(Strings.START_TYPING_URL)
    }

    return (
        <section className="home">
            <Note />
            <div className="home__keys--top">
                <Key spell={ 'E/J' } />
                <Key spell={ '1' } />
                <Key spell={ '2' } />
                <Key spell={ '3' } />
                <Key spell={ '4' } />
                <Key spell={ '5' } />
                <Key spell={ '6' } />
                <Key spell={ '7' } />
                <Key spell={ '8' } />
                <Key spell={ '9' } />
                <Key spell={ '0' } />
                <Key spell={ '-' } />
                <Key spell={ '^' } />
                <Key spell={ '¥' } />
                <Key spell={ 'Del' } />
            </div>
            <div className="home__keys--middle-top">
                <Key spell={ 'Tab' } />
                <Key spell={ 'Q' } />
                <Key spell={ 'W' } />
                <Key spell={ 'E' } />
                <Key spell={ 'R' } />
                <Key spell={ 'T' } />
                <Key spell={ 'Y' } />
                <Key spell={ 'U' } />
                <Key spell={ 'I' } />
                <Key spell={ 'O' } />
                <Key spell={ 'P' } />
                <Key spell={ '@' } />
                <Key spell={ '[' } />
                <div className={ 'home__keys--middle-top--enterkey' }>
                    <EnterKey />
                </div>
            </div>
            <div className="home__keys--middle-bottom">
                <Key spell={ 'Ctrl' } />
                <Key spell={ 'A' } />
                <Key spell={ 'S' } />
                <Key spell={ 'D' } />
                <Key spell={ 'F' } />
                <Key spell={ 'G' } />
                <Key spell={ 'H' } />
                <Key spell={ 'J' } />
                <Key spell={ 'K' } />
                <Key spell={ 'L' } />
                <Key spell={ ';' } />
                <Key spell={ ':' } />
                <Key spell={ ']' } />
            </div>
            <div  className="home__keys--bottom">
                <Key spell={ 'Shift' } />
                <Key spell={ 'Z' } />
                <Key spell={ 'X' } />
                <Key spell={ 'C' } />
                <Key spell={ 'V' } />
                <Key spell={ 'B' } />
                <Key spell={ 'N' } />
                <Key spell={ 'M' } />
                <Key spell={ ',' } />
                <Key spell={ '.' } />
                <Key spell={ '/' } />
                <Key spell={ '_' } />
                <Key spell={ 'Shift' } />
            </div>
            <Button
                className={ 'button--primary' }
                name={ Strings.HOME_GAME_START_BUTTON }
                doClick={ toStart }
            />
        </section>
    )
}

export default Home
