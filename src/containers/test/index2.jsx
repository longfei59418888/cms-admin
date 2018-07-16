import React from 'react';
import './index.scss';

import { observer } from 'mobx-react'
import Test from './modal'




@observer
/*
* observer(ReactComponentClass)
* 包裹 React 组件,render 函数中 observable 发生变化，重新渲染
* */
export default class Main extends React.Component {

    render() {

        return (
            <div style={{padding:40,fontSize:20}}>
                <p>number:{Test.number} / showNumber:{Test.showNumber}</p>
                <p onClick={()=>{ Test.addNumber() }}>add / Test.addNumber()</p>
                <p onClick={()=>{ Test.number++ }}>add2 / Test.number++</p>
            </div>
        )
    }
}

/*
* Provider 组件
* 利用 context 将 store 传给子组件
* */

/*
* inject('store')
* 从 context 中获取 store ，并注入 组件中
* */















