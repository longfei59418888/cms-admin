import React from 'react';
import ReactDOM,{render} from 'react-dom';
import style from './index.scss'

class Btn extends React.Component{
    constructor(){
        super();
        this.targetDom = null
    }
    change=(e)=>{
        let { toFixed = 2 ,change} = this.props
        if(!this.targetDom)  this.targetDom = this.ref.input
        let value = this.targetDom.value,values = value.split('.')
        if (value.match(/[^\d\.]/g)) {
            value = value.replace(/[^\d\.]/g, '')
            this.targetDom.value = value
            return
        }
        if (value.match(/^\./)) {
            this.targetDom.value = '0.'
            return
        }
        if ((values.length == 2 && values[1].length > toFixed) || values.length == 3) {
            this.targetDom.value = values[0] + '.' + values[1].substr(0, 2)
            return
        }
        change(parseFloat(value).toFixed(toFixed))
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