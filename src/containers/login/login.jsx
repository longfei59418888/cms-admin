import React from 'react';
import Radio from '../util/form/checkBox'
import Btn from '../util/form/btn'
import {success,warn} from '../util/toast'
import {set} from '../../utils/session'
import {autobind} from 'src/decorators'
import USER from 'src/models/userinfo'

export default class Main extends React.Component {

    @autobind
    async login(){
        let username = this.refs.username.value
        let password = this.refs.password.value
        if(username.length<1 || password.length<1){
            warn('请填写账号或密码！')
            return
        }
        let login = await USER.login({username,password})
        if(login){
            set('token',login.token)
            success('登录成功！')
            this.props.history.push('/admin/home')
        }
    }
    render() {
        return (
            <div className='login'>
                <div className="input-login">
                    <p className="username">
                        <span><i></i></span>
                        <input ref={'username'} type="text" placeholder='输入账号'/>
                    </p>
                    <p className="password">
                        <span><i></i></span>
                        <input ref={'password'} type="password" placeholder='密码'/>
                    </p>
                </div>
                <div className="option">
                    <div className="cache">
                        <Radio after='记住我'/>
                    </div>
                    <p>登录遇到问题？</p>
                </div>
                <div className="bt">
                    <Btn onClick={()=>{this.login()}}>登录</Btn>
                </div>
            </div>
        )
    }
}