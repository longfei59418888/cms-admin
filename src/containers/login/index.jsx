import React from 'react';
import './index.scss';
import {Route} from "react-router-dom";
import LazyRoute from "lazy-route";

export default class Main extends React.Component {

    render() {
        return (
            <div className='login-box'>
                <div className="main">
                    <div className="tab">
                        <span className='active'>登陆</span>
                        <span>·</span>
                        <span>注册</span>
                    </div>
                    <Route exact path='/'
                           render={props => (<LazyRoute {...props} component={import ('./login')}/>)}/>
                    <Route exact path='/login'
                           render={props => (<LazyRoute {...props} component={import ('./login')}/>)}/>
                </div>
            </div>
        )
    }
}