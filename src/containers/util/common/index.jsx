import React from 'react';
import ReactDOM, {render} from 'react-dom';
import style from './index.scss'
import {CSSTransitionGroup} from 'react-transition-group' // ES6

let modalContainer = null

function addContainer(className) {
    if (modalContainer) return
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('class', 'xl-common_container_box '+className);
    document.body.appendChild(modalContainer)

}

function pop() {
    if (!modalContainer) return
    ReactDOM.unmountComponentAtNode(modalContainer)
    modalContainer.parentNode.removeChild(modalContainer)
    modalContainer = null
}

export function close() {
    pop()
}

export function comfirm(options) {
    addContainer(options.className);
    ReactDOM.unmountComponentAtNode(modalContainer)
    render(<ComContainer {...options}/>, modalContainer)

}

class ComContainer extends React.Component {
    state = {
        action: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                action: true
            })
        }, 0)
    }

    render() {
        let {title,message,success,cancel,
            successText='确定',
            cancelText='取消',
        } = this.props
        return (<div className='box'>
            <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {this.state.action ? (
                    <div className='content'>
                        {title?<h4>{title}</h4>:''}
                        <div className="con">
                            {message}
                        </div>
                        <div className='option'>
                            <p onClick={()=>{
                                close()
                                if(cancel) cancel()
                            }}>{cancelText}</p>
                            <p onClick={()=>{
                                close()
                                if(success) success()
                            }}>{successText}</p>
                        </div>
                    </div>
                ) : ''}
            </CSSTransitionGroup>

        </div>)
    }
}











