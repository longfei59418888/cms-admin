import React from 'react';
import './index.scss'
import classnames from 'classnames'

class Comp extends React.Component {
    constructor() {
        super();
        this.state={
            isActive : false,
            init:true
        }
        this.updateState = true
    }
    componentDidUpdate(){
        setTimeout(()=>{
            this.queue()
        },100)
    }
    shouldComponentUpdate(nextProps,state){
        if(this.props.children == nextProps.children) this.updateState = false
        else { this.updateState = true }
        return true
    }
    componentDidMount(){
        this.boxHeight = 0
        this.box= this.refs['am_queue_common_box']
        this.contentBox = this.refs['am_queue_content']
        setTimeout(()=>{
            this.queue()
        },100)
    }
    queue(){
        let contentHeight = this.contentBox.offsetHeight;
        let boxHeight = this.box.offsetHeight;
        if(!this.updateState && this.boxHeight!=0 && this.boxHeight == this.box.offsetHeight) return
        this.boxHeight = boxHeight;
        if(contentHeight<1) {
            this.setState({
                init:true
            })
            return
        }else {
            this.setState({
                init:false
            })
        }
        console.log(boxHeight,contentHeight)

        if(contentHeight<boxHeight+5){
            this.setState({
                isActive:false
            })
        }else {
            this.setState({
                isActive:true
            })
        }
    }
    render() {

        return <div ref="am_queue_common_box" style={this.props.style} className={classnames('am_queue_common_box',
            this.props.className,{'init':this.state.init})}>
            <div className={classnames('am_queue_content', { 'action': this.state.isActive })}>
                <div ref='am_queue_content'>{this.props.children}</div>
                <div>{this.props.children}</div>
            </div>
        </div>
    }
}
export default Comp