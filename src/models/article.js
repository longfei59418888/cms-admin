import {observable, action} from 'mobx'
import {get, post,del} from '../utils/fetch'

class Models {

    @observable list = null;
    @action
    async get(id){
        let rst = await get('admin/api/article/'+id,{})
        this.list = rst.rows;
        if(rst){
            return rst
        }
        return 0
    }
    @action
    async del(data,index){
        let rst = await del('admin/api/classify',{data})
        this.list.splice(index,1)
        if(rst){
            return rst
        }
        return 0
    }
    @action
    async add(data){
        let rst = await post('admin/api/classify',{data})
        this.list.push(rst)
        if(rst){
            return rst
        }
        return 0
    }

}

const Model = new Models()
export default Model
