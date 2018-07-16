import React from 'react';
import {Route, Link, withRouter} from "react-router-dom";
import LazyRoute from "lazy-route";
import style from './index.scss'

import dot from './home/lib/dot'

class Home extends React.Component {

    render() {
        let path = this.props.match.path
        return <div>
                <div className='router-box'>
                    <Route exact path={`${path}/home`}
                           render={props => (<LazyRoute {...props} component={import ('./home/index')}/>)}/>
                    <Route exact path={`${path}/article/:id`}
                           render={props => (<LazyRoute {...props} component={import ('./article')}/>)}/>
                </div>

            </div>
    }
}
export default  Home