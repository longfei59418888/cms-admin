import React from 'react';
import { Link } from 'react-router-dom'
import './index.scss';
import popover from '../util/popover'
import {loading,login} from "../../decorators";
import CLASSIFY from 'src/models/classify'
import Btn from '../util/form/btn'
import { autobind } from 'src/decorators'
import { warn ,success} from '../util/toast'
import { comfirm,close } from '../util/common'
import { observer } from 'mobx-react'
@login()
@loading(async (props,state)=>{
    if(CLASSIFY.list != null) return 0
    return await Promise.all([CLASSIFY.get()])
})
@observer
export default class Main extends React.Component {

    state={
        add:{},
    }
    change({target}){
        let add = Object.assign({},this.state.add,
            {[target.name]:target.value})
        this.setState({
            add:add
        })
    }
    @autobind
    async add(){
        let {description ='',title=''} = this.state.add
        if(description.length<1 || title.length<1){
            warn('请填写标题或者描述！')
            return
        }
        let rst = await CLASSIFY.add(this.state.add)
        if(rst) popover.close()
    }
    @autobind
    async del(title,id,index){
        comfirm({
            title:'删除当前分类',
            message:`您是否要删除《${title}》分类？`,
            success:async ()=>{
                let rst = await CLASSIFY.del({id},index)
                if(rst) success('删除成功！')
            }
        })
    }
    render() {
        return (
            <div className='home'>
                <div className="head">
                    <div className="container">

                    </div>
                </div>
                <div className="content">
                    <div className="list">
                        {CLASSIFY.list.map((item,index)=>{
                            return (
                                <div onClick={()=>{
                                    CLASSIFY.current = item
                                    this.props.history.push(`/admin/article/${item.id}`)
                                }} key={index} className="item">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    <span onClick={(e)=>{
                                        this.del(item.title,item.id,index)
                                        e.stopPropagation()
                                    }}>
                                        <img src={require('./images/delete.png')} alt=""/>
                                    </span>
                                </div>
                            )
                        })}
                        <div onClick={()=>{
                            popover.show({
                                head:'文章分类',
                                Com:(<Add click={()=>{
                                    this.add()
                                }} change={this.change.bind(this)}/>),
                                className:'popover-content-list'
                            })
                        }} className="item add">
                            <img src={require('./images/add.png')} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function Add(props) {
    return (
        <div className='add-article' onChange={props.change}>
            <p><input name='title' type="text" placeholder='文章标题'/></p>
            <textarea name="description" id="" cols="30" rows="5" placeholder='文章描述...'></textarea>
            <div><Btn onClick={()=>{
                props.click()
            }}>添加</Btn></div>
        </div>
    )
}
















