import React from 'react';

export default class Ring extends React.Component {
    componentDidMount() {
        let {borderWidth, time, percent} = this.props
        let ring = this.refs.ring,
            context = ring.getContext("2d"),
            height,width,
            initIng=null,
            per = percent * 1000 / (time * 60),
            currentPercent;
        init()
        window.addEventListener('resize',function () {
            if(initIng) clearTimeout(initIng)
            initIng = setTimeout(()=>init(false),200)
        })
        function init(action = true){
            currentPercent = 0;
            height = ring.offsetHeight,
                width = ring.offsetWidth;
            ring.width = width;
            ring.height = height;
            let loop = setInterval(() => {
                currentPercent += per;
                if(!action) currentPercent = percent
                if (currentPercent > percent) {
                    clearInterval(loop)
                    return
                }
                draw(currentPercent,action)
            }, 1)
        }
        let draw = (percent) => {
            context.clearRect(0, 0, width, height);
            context.beginPath();
            context.arc(width / 2, height / 2, height / 2 - borderWidth, 0, 2 * Math.PI, false);
            context.strokeStyle = '#113359';
            context.lineWidth = borderWidth;
            context.stroke();
            context.closePath();
            context.lineCap = "round";
            context.lineWidth = borderWidth;
            var linearGrad = context.createLinearGradient(0, 0, width, height);//对角线渐变到（400，300）这个坐标
            linearGrad.addColorStop(0.0, '#02a7ff');
            linearGrad.addColorStop(0.25, '#1da1fb');
            linearGrad.addColorStop(0.5, '#5893f4');
            linearGrad.addColorStop(0.75, '#9484ec');
            context.strokeStyle = linearGrad;
            context.fillStyle = '#113359';
            context.font = "50px Arial";
            let txt = parseInt(percent.toFixed(2) * 100) + '%', contextWidth = context.measureText(txt).width
            context.fillText(txt, width / 2 - contextWidth / 2, height / 2 + 20);
            context.beginPath();
            context.arc(width / 2, height / 2, height / 2 - borderWidth, -.5 * Math.PI, (percent * 2 - .5) * Math.PI, false);
            context.stroke();
            context.closePath();
        }


    }

    render() {
        return <canvas style={{width: '100%', height: '100%'}} ref='ring'></canvas>

    }
}