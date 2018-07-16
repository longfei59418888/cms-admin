import React from 'react';
import {Route, Link, withRouter} from "react-router-dom";
import LazyRoute from "lazy-route";
import style from './index.scss'
import dot from "./home/lib/dot";
class Home extends React.Component {
    componentDidMount(){
        dot(this.refs['canvas'], {})
    }
  render() {
       return <div style={{position:'absolute',width:'100%',height:'100%'}}>
           <Route path='/login'
                  render={props => (<LazyRoute {...props} component={import ('./login')}/>)}/>
           <Route  path='/admin'
                  render={props => (<LazyRoute {...props} component={import ('./admin')}/>)}/>
           <div><canvas ref='canvas' ></canvas></div>
        </div>
  }
}
export default  Home