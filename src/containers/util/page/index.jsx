import React from 'react';
import ReactDOM,{render} from 'react-dom';
import style from './index.scss'

class Page extends React.Component{
    constructor(){
        super();
    }
    render(){
        //loading  数组，传入的全都为true 则显示页面
        let { loading,children } = this.props,state = true
        if(loading && loading.length>0) state = loading.every(item => item!=='undefined' && item!==null)
        if(true) return (<div>{children}</div>)
        else return (<div>{loading}</div>)
    }
}
export default Page