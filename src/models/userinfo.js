import {observable, action, computed, autorun, transaction} from 'mobx'
import {observer} from "mobx-react/index";
import {get, post} from '../utils/fetch'


class Models {

    @observable userinfo = 0;
    @computed
    get token(){
        if(!this.userinfo.token) return false;
        return this.userinfo.token;
    }
    @action
    async getUserInfo(){
        let rst = await get('admin/api/userinfo',{})
        this.userinfo = rst;
        if(rst){
            return rst
        }
        return 0
    }
    @action
    async login(data){
        let rst = await post('admin/login/login',{data})
        this.userinfo = rst;
        if(rst){
            return rst
        }
        return 0
    }

}

const Modal = new Models()

export default Modal













