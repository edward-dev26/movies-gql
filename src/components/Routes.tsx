import React from 'react';
import Movies from './movies/Movies';
import {Redirect, Route} from 'react-router-dom';
import Directors from './directors/Directors';
import MoviesForm from './movies/MoviesForm';
import DirectorsForm from './directors/DirectorsForm';

const Routes = () => {
    return (
        <>
            <Route path='/' render={() => <Redirect to='/movies'/>} exact/>
            <Route path='/movies' render={() => <Movies/>}/>
            <Route path='/movies/add' render={() => <MoviesForm/>}/>
            <Route path='/movies/edit/:id' render={() => <MoviesForm/>}/>
            <Route path='/directors' render={() => <Directors/>}/>
            <Route path='/directors/add' render={() => <DirectorsForm/>}/>
            <Route path='/directors/edit/:id' render={() => <DirectorsForm/>}/>
        </>
    )
};

export default Routes;