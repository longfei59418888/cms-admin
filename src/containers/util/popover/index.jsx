import React from 'react';
import ReactDOM, {render} from 'react-dom';
import style from './index.scss'
import classnames from 'classnames'
import {CSSTransitionGroup} from 'react-transition-group' // ES6

let modalContainer = null

function addContainer(className) {
    if (modalContainer) return
    location.hash = '#modal'
    window.addEventListener('popstate', pop)
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('class', 'xl-popover_container_box '+className);
    document.body.appendChild(modalContainer)

}

function pop() {
    if (!modalContainer) return
    ReactDOM.unmountComponentAtNode(modalContainer)
    modalContainer.parentNode.removeChild(modalContainer)
    modalContainer = null
    window.removeEventListener('popstate', pop)
}

function close() {
    pop()
    history.back()
}

function show(options) {
    addContainer(options.className);
    ReactDOM.unmountComponentAtNode(modalContainer)
    let ComCon = render(<ComContainer {...options}/>, modalContainer)

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
        let {head,Com} = this.props
        return (<div className='box'>
            <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {this.state.action ? (
                    <div className='content'>
                        <span onClick={()=>{
                            close()
                        }} className='close'><img src={require('./close.png')} alt=""/></span>
                        {head?<h4>{head}</h4>:''}
                        <div className="con">
                            {Com}
                        </div>
                    </div>
                ) : ''}
            </CSSTransitionGroup>

        </div>)
    }
}

export default {
    show,
    close
}