import React from 'react';
import './index.scss';
import './lib/themes/default/default.css'
import { loading,login } from 'src/decorators'
import CLASSIFY from 'src/models/classify'
import ARTICLE from 'src/models/article'

@login()
@loading(async (props,state)=>{
    let id = props.match.params.id
    if(CLASSIFY.current == null){
        return await Promise.all([
            import('./lib/kindeditor-all'),
            CLASSIFY.getCurrent({id})
        ])
    }
    return await Promise.all([import('./lib/kindeditor-all')])
})
export default class Main extends React.Component {

    componentDidMount(){
        let KindEditor = this.props.load[0]
        let classify = this.props.load[1]
        console.log(classify)
        let content = this.refs.content
            this.editor = KindEditor.create(content, {
                // cssPath : '../plugins/code/prettify.css',
                uploadJson : '../php/upload_json.php',
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
                            <div className="add">
                                <img src={require('./images/add.png')} alt=""/>
                                <span>添加文章</span>
                            </div>
                            <div className="list">
                                <div className="item active">
                                    <img src={require('./images/page.png')} alt=""/>
                                    <span>添加文章</span>
                                </div>
                            </div>
                        </div>
                        <div className='content-box'>
                            <div className="title">
                                <input placeholder='标题' type="text"/>
                            </div>
                            <div className='box'>
                                <textarea ref='content' style={{visibility:'hidden'}}>

                            </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


















