import React from 'react';
import classNames from 'classnames'
import { observer } from 'mobx-react'
import './index.scss';
import './lib/themes/default/default.css'
import { loading,login,autobind } from 'src/decorators'
import CLASSIFY from 'src/models/classify'
import ARTICLE from 'src/models/article'
import { success } from '../util/toast'
import { comfirm } from '../util/common'
import { uplaod } from 'src/utils/fetch'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import {getUTFDate} from "../../utils/extend";

@login()
@loading(async (props,state)=>{
    if(ARTICLE.classifyId != props.match.params.id){
        ARTICLE.init(props.match.params.id)
    }
    let promises = [import('./lib/kindeditor-all')]
    if(CLASSIFY.current == null) promises.push(CLASSIFY.getCurrent({id:props.match.params.id}))
    if(ARTICLE.list == null) promises.push(ARTICLE.get())
    let rst = await Promise.all(promises)
    if(ARTICLE.currentItem == null){
        if(ARTICLE.list.length>0){
            await ARTICLE.get(ARTICLE.list[0].id)
        }else {
            ARTICLE.currentItem = {
                title:'',
                content:'<p></p>'
            }
        }
    }
    return rst
})
@observer
export default class Main extends React.Component {

    componentDidMount(){
        let KindEditor = this.props.load[0]
        let content = this.refs.content
        // console.log(SyntaxHighlighter)
        // document.domain = "jiaju.com";
        this.editor = KindEditor.create(content, {
            cssPath : '/public/KindEditor/prettify.css',
            uploadJson : 'http://127.0.0.1:8081/admin/api/upload',
            uploadImage:(input,bak)=>{
                var data = new FormData()
                data.append('file', input.files[0])
                uplaod('admin/api/upload',data).then(rst=>{
                    console.log(rst)
                    bak(rst.imgUrl)
                })
                // fetch(DEVELOPMETN_URL + 'admin/api/upload', {
                //     method: 'POST',
                //     body: data
                // })
            },
            fileManagerJson : '../php/file_manager_json.php',
            allowFileManager : true,
            afterCreate : function() {
                var self = this;
                KindEditor.ctrl(document, 13, function() {
                    self.sync();
                    KindEditor('form[name=example]')[0].submit();
                });
                KindEditor.ctrl(self.edit.doc, 13, function() {
                    self.sync();
                    KindEditor('form[name=example]')[0].submit();
                });
            }
        });
        this.editor.html(ARTICLE.currentItem.content)
        this.refs.title.value = ARTICLE.currentItem.title
        this.saveTime = setInterval(()=>{
            if(ARTICLE.currentItem.isPublish){
                this.add(ARTICLE.currentItem.isPublish,1)
            }
        },10000)
    }
    componentWillUnmount(){
        clearInterval(this.saveTime)
    }
    @autobind
    async add(isPublish,deal){
        let content = this.editor.html(),title = this.refs.title.value;
        let contentPlist = content.match(/<p>((.|\n|(^pre|img))+?)<\/p>/ig)
        let description = [];
        contentPlist.forEach(item=>{
            if(description.length < 3 && item.replace(/[\s\n]/g,'') != '<p><br/></p>'){
                description.push(item)
            }
        })
        description = description.join('')
        let publicDate = ARTICLE.publicTime.format('YYYY-MM-DD h:mm:ss')
        if(ARTICLE.currentItem.id){
            let rst = await ARTICLE.update({
                content,
                description,
                title,
                isPublish,
                publicDate
            })
            if(rst && !deal) success('更新成功！')
            return
        }
        let rst = await ARTICLE.add({
            content,
            description,
            title,
            isPublish,
            publicDate
        })
        if(rst && !deal) success('发布成功！')
    }
    @autobind
    async select(id,index){
        await ARTICLE.get(id,index);
        this.editor.html(ARTICLE.currentItem.content)
        this.refs.title.value = ARTICLE.currentItem.title
    }
    @autobind
    async del(){
        let rst = await ARTICLE.del(ARTICLE.currentItem.id)
        if(rst){
            ARTICLE.currentItem = {}
            this.editor.html('')
            this.refs.title.value=''
            success('删除成功！')
        }
    }
    render() {
        return (
            <div className='article'>
                <div className="head">
                    <div className="container">

                    </div>
                </div>
                <div className="content">
                    <div className="container">
                        <div className='article-list'>
                            <div className="add" onClick={()=>{
                                ARTICLE.currentItem = {}
                                // ARTICLE.publicTime = moment()
                                this.editor.html('<p></p>')
                                this.refs.title.value=''
                            }}>
                                <img src={require('./images/add.png')} alt=""/>
                                <span>添加文章</span>
                            </div>
                            <div className="list">
                                {ARTICLE.list.map((item,index)=>{
                                    return (
                                        <div className={classNames('item',{active:ARTICLE.currentItem.id == item.id})}
                                             onClick={()=>{
                                                 if(ARTICLE.currentItem.id == item.id) return;
                                                 this.select(item.id,index)
                                             }}>
                                            <img src={require('./images/page.png')} alt=""/>
                                            <span>{item.title}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='content-box'>
                            <div className="title">
                                <div className='b'>
                                    <input  ref='title' placeholder='标题' type="text"/>
                                </div>
                                <div className='option'>
                                    {ARTICLE.currentItem.id?
                                        <p onClick={()=>{
                                            comfirm({
                                                message:`您是否要删除文章 ${ARTICLE.currentItem.title} ?`,
                                                success:()=>{
                                                    this.del()
                                                }
                                            })
                                        }}>删除</p>:''}
                                    {!ARTICLE.currentItem.isPublish?
                                        <p onClick={()=>{
                                            this.add(false)
                                        }}>保存</p>:''}
                                    <p onClick={()=>{
                                        this.add(true)
                                    }}>发布</p>
                                    <div className='date'>
                                        <DatePicker
                                            selected={ARTICLE.publicTime}
                                            onChange={(date)=>{
                                                ARTICLE.publicTime = date
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='box'>
                                <textarea  ref='content' style={{visibility:'hidden'}}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


















