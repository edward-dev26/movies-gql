import React from 'react';
import './App.css';
import {Layout} from 'antd';
import HeaderContainer from './components/header/Header';
import {BrowserRouter} from 'react-router-dom';
import Routes from './components/Routes';
import {ApolloProvider} from '@apollo/client';
import {apolloClient} from './apolo';

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <BrowserRouter>
                <Layout>
                    <HeaderContainer/>
                    <Routes/>
                </Layout>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
