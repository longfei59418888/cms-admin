import React from 'react';
import ReactDOM,{render} from 'react-dom';
import style from './index.scss'
let modalContainer = null

function addContainer(dir) {
    if(modalContainer) return
    location.hash='#modal'
    window.addEventListener('popstate',pop)
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('class','xl-modal_container_box animate '+dir);
    document.body.appendChild(modalContainer)

}
function pop(e) {
    if(!modalContainer) return
    modalContainer.classList.remove("action")
    setTimeout(()=>{
        ReactDOM.unmountComponentAtNode(modalContainer)
        modalContainer.parentNode.removeChild(modalContainer)
        modalContainer=null
    },300)
    window.removeEventListener('popstate',pop)
}
function close() {
    pop()
    history.back()
}
function show(dir,Com,bak) {
    addContainer(dir);
    ReactDOM.unmountComponentAtNode(modalContainer)
    let ComCon = render(Com,modalContainer,()=> {
        setTimeout(()=> modalContainer.classList.add("action"),50)
    })

}
class ComContainer extends React.Component{
    render(){
        return (<div style={{height:'100%'}}>{this.props.children}</div>)
    }
}
export default {
    show,
    close
}