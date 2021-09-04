import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Error, Home, Ranking, Score, StartTyping } from './components';
import * as Strings from './strings';

const Router = () => {
    return (
        <>
            <Switch>
                <Route path={ Strings.HOME_URL } exact component={ Home } />
                <Route path={ Strings.START_TYPING_URL } exact component={ StartTyping } />
                <Route path={ Strings.RANKING_URL } exact component={ Ranking } />
                <Route path={ Strings.SCORE_URL } exact component={ Score } />
                <Route
                    path={ Strings.ERROR_URL }
                    children={
                        <Error
                            errorCode={ Strings.ERROR_500 }
                            errorMessage={ Strings.ERROR_500_MESSAGE }
                            className={ "button--error" }
                        />
                    }
                />
                <Route
                    children={
                        <Error
                            errorCode={ Strings.ERROR_404 }
                            errorMessage={ Strings.ERROR_404_MESSAGE }
                            className={ "button--error" }
                        />
                    }
                />
            </Switch>
        </>
    )
};

export default Router
