import React from "react";
import { applyMiddleware, createStore } from 'redux'
import thunk from "redux-thunk";
import reducer from "./src/reducers";
import Router from "./src/router";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { theme } from "./src/utils/theme";
import { setLocalNotification } from './src/utils/helpers'

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer, {}, applyMiddleware(thunk))}>
                <PaperProvider theme={theme}>
                    <Router />
                </PaperProvider>
            </Provider>
        )
    }
}

