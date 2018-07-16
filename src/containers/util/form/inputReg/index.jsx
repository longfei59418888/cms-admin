import React from 'react';
import ReactDOM,{render} from 'react-dom';
import style from './index.scss'

class Btn extends React.Component{
    constructor(){
        super();
        this.targetDom = null
    }
    change=(e)=>{
        let { reg ,error} = this.props

        error()
    }
    blur=(e)=>{
        let { toFixed = 2 ,blur} = this.props
        if(!this.targetDom)  this.targetDom = this.ref.input
        if(this.targetDom.value) blur(parseFloat(this.targetDom.value).toFixed(toFixed))
    }
    render(){
        return <input ref='input' {...this.props}
                      onChange={this.change}
                      onBlur={this.blur}
                      type="text"/>
    }
}
export default Btn