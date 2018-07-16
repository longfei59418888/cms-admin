import React from 'react';
import style from './index.module.scss'

class Btn extends React.Component{
    constructor(){
        super();
        this.loop = null;
    }
    click=()=>{
        clearTimeout(this.loop)
        this.loop = setTimeout(()=>{
            this.props.onClick()
        },300)
    }
    render(){
        return (<p className={style['btn']} onClick={this.click}>
            {this.props.children}
        </p>)
    }
}
export default Btn