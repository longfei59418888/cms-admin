import React from 'react';
import ReactDOM,{render} from 'react-dom';
import { autobind } from 'core-decorators'

import classnames from 'classnames'
import actions from 'src/actions/userInfo'
import { defaultProps , loading, login, connect, setTitle} from 'src/decorators'
// const SwitchTabs  = ()=> import('../util/SwitchTabs')
import SwitchTabs from '../util/SwitchTabs'

@setTitle('test')
@defaultProps({select:false})
@connect(['userInfo'],actions)

@loading(async (props,state)=>{
    let userinfo = props.getUserInfo()
    await Promise.all([userinfo,SwitchTabs]);

})
@login()
export default class Btn extends React.Component{
    constructor(props){
        super();
        this.state={
            select:props.select && true
        }
    }
    @autobind
    change(){
        if(this.props.change) this.props.change(!this.state.select)
        this.setState({
            select:!this.state.select
        })
    }
    @autobind
    show(){
        this.setState({
            show:!this.state.show
        })
    }
    state = {
        show:false
    }
    render(){
        return(
            <div>
                <p style={{margin:0}} onClick={this.show}>SwitchTabs</p>
                <SwitchTabs show={this.state.show}>
                    <div>asdgadfa</div>
                    <div>asdgadfa</div>
                    <div>asdgadfa</div>
                    <div>asdgadfa</div>
                    <div>asdgadfa</div>
                    <div>asdgadfa</div>
                    <div>asdgadfa</div>
                    <div>asdgadfa</div>
                </SwitchTabs>
            </div>
        )
    }
}

