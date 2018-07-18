import {observable, action, runInAction} from 'mobx'
import {get, post, del, put} from '../utils/fetch'

class Models {

    @observable list = null;
    @observable currentItem = null;
    @observable classifyId = '';

    @action
    init(id){
        runInAction(()=>{
            this.classifyId = id
            this.list = null
            this.currentItem = null;
        })
    }

    @action
    async get(id,index) {
        if (id) {
            let rst = await get(`admin/api/article/${this.classifyId}`, {data: {id}})
            if (rst) {
                rst.index = index?index:0
                this.currentItem = rst
                return 1;
            }
            return 0;
        }
        if (this.list != null) return [];
        let rst = await get(`admin/api/article/${this.classifyId}`, {})
        this.list = rst.rows;
        if (rst) {
            return rst
        }
        return 0
    }

    @action
    async del(id) {
        let rst = await del(`admin/api/article/${id}`, {})
        if (rst) {
            this.list.splice(this.currentItem.index,1)
            return rst
        }
        return 0
    }

    @action
    async add(data) {
        let rst = await post(`admin/api/article/${this.classifyId}`, {data})
        if (rst) {
            runInAction(() => {
                this.list.unshift(rst)
                rst.index = 0
                this.currentItem = rst
            })
            return rst
        }
        return 0
    }

    @action
    async update(data) {
        let rst = await put(`admin/api/article/${this.currentItem.id}`, {data})
        if (rst) {
            this.currentItem.isPublish = data.isPublish
            this.currentItem.content = data.content
            this.list[this.currentItem.index].title = data.title
            return rst
        }
        return 0
    }

}

const Model = new Models()
export default Model
