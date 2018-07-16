import {observable, action, computed, autorun, transaction} from 'mobx'
import {observer} from "mobx-react/index";



class Teat {

    @observable number = 0;

    /*
    * observable(value)
    * 将 value 转化成可观察对象
    * value 可以为 基本类型，引用类型等
    * 实际----是对 value 用 Object.defineProperty() 修改 getter/setter 方法
    *
    * observable.shallow    浅转化，集合内部对数据不会转为 可观察对象
    *
    * */

    @action
    /*
    * action(fn)
    * 动作是任何用来修改状态的东西。
    * */
    addNumber() {
        this.number++
    }

    @computed

    /*
    * computed(()=>{ expression })
    * 当 computed 的回调函数内部的 observable 对象改变的时候，重新执行 computed 的回调函数
    * 实际----收集回调函数中 observable 对象，收集所有的依赖
    *
    * */

    get showNumber() {
        console.log('showInfo:' + this.number)
        return this.number
    }

}

const Modal = new Teat()

autorun(() => {
    console.log('autorun:' + Modal.number)
})

// console.log(Modal)
// Modal.number = 1


/*
* autorun(fn,option)
* 函数内部的 observable 对象改变的时候，执行函数
*
* when
* reaction
* onReactionError
*
* */


/*
* transaction(()=>{})
* 用来批量更新而不会通知任何观察者，直到事务结束
* */


/*
* runInAction(()=>{})
* 将 回调函数中 所有当 action或者state操作合并一个一起执行
* */

//
//
function Observable(observers) {
    Object.defineProperty(observers,'number',{
        set(value){
            observers.next(value)
        }
    })
   return observers
}

let observers = {
    number:1,
    next(value){
        console.log('update：'+value)
    }
}

let ObservableValue = new Observable(observers)
ObservableValue.number =  2
ObservableValue.number =  3




export default Modal













