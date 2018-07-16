import React, {createElement} from 'react';
const PropTypes = require('prop-types');

let test = 'xiaolong';

class Main extends React.Component {

    getChildContext(){
        return {test:test}
    }

    state={
        test:1
    }
    render() {

        return (
            <div onClick={()=>{
                test = 'sdfsd'
                this.setState({
                    test:2
                })
            }}>
                {this.props.test}
                <p>{this.state.test}</p>
            </div>
        )
    }
}

Main.childContextTypes = {
    test: PropTypes.string
};
function connect(props) {
    return function (Com) {
        return class Connect extends React.Component {
            state={
                nextState:props
            }
            render(){
                console.log(this)
                return <Com {...this.state.nextState}/>
            }
        }
    }
}

export default connect({test:test})(Main)