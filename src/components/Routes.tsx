import React from 'react';
import Movies from './movies/Movies';
import {Redirect, Route} from 'react-router-dom';
import Directors from './directors/Directors';
import MoviesForm from './movies/MoviesForm';

const Routes = () => {
    return (
        <>
            <Route path='/' render={() => <Redirect to='/movies'/>} exact/>
            <Route path='/movies' render={() => <Movies/>}/>
            <Route path='/movies/add' render={() => <MoviesForm/>}/>
            <Route path='/movies/edit/:id' render={() => <MoviesForm/>}/>
            <Route path='/directors' render={() => <Directors/>}/>
        </>
    )
};

export default Routes;