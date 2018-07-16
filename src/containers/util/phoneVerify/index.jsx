import React from 'react';
import {Route, Link, withRouter} from "react-router-dom";
import classnames from 'classnames'
import VerifyNumber from './images/verify-phone-number.png'
import VerifyCode from './images/verify-phone-code.png'
import validate from '../validate'
require('./index.scss')
/*
* 手机验证
* */
class Comp extends React.Component {
    constructor() {
        super();
        this.state={
            verifyIng:false,
            time:61
        }
    }
    render() {
        let { className , number , url} = this.props;
        return <div className={classnames('xl-phone-verify',className)} >
            <div className="xl-phone-verify-item">
                <p className='icon-box'><img src={VerifyNumber} alt=""/></p>
                <p className='input-box'><input disabled ref='phone' defaultValue={number} type="number" placeholder='输入手机号码'/></p>
            </div>
            <div className="xl-phone-verify-item">
                <div className='code-box'>
                    <p className='icon-box'><img src={VerifyCode} alt=""/></p>
                    <p className='input-box'><input ref='code' type="number" placeholder='输入验证码'/></p>
                </div>
                <p  onClick={this.sendVerify.bind(this)} style={
                    {color:this.state.time<61?'#ccc':'#3B7ED1'}} className='get-verify-btn'>
                    {this.state.time<61?this.state.time+'后重新获取':'获取验证码'}
                </p>
            </div>
        </div>
    }
    sendVerify(){
        if(this.state.time<61) return;
        var phone = this.refs.phone.value
        if(!validate.isMobile(phone) || phone.length<1){
            StaticToast.error('请输入正确的手机号！')
            return;
        }
        this.setState({time:this.state.time-1})
        let loop = setInterval(()=>{
            this.setState({time:this.state.time-1})
            if(this.state.time<1) {
                clearInterval(loop)
                this.setState({time:61})
            };
        },1000)
        this.props.sendCode(phone)
    }
}

export default Comp