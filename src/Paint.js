import React, {useRef, useState, useEffect}  from 'react';
import "./Paint.css";



const Paint = () => {
    const INITIAL_COLOR = "#2c2c2c";
    // const COLORS = ["#2c2c2c", "white", "#ff3b30","#ff9500", "#ffcc00", "#4cd963", "#5ac8fa", "#0579ff", "#5856d6"];
    const canvasRef = useRef(null); //useRef 사용
    const contextRef = useRef(null); //cvt canvas context
    const [ctx, setCtx] = useState([]);
    const [isPainting, setIsPainting] = useState(false);
    const [rangeval, setRangeval] = useState(null);
    // const [canvasTag, setCanvasTag] = useState([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 700;
        canvas.height = 700;

        const context = canvas.getContext("2d");
        context.strokeStyle = INITIAL_COLOR;
        context.lineWidth = 2.5;
        // contextRef.current = context;

        setCtx(context);
    }, []);
    const startPainting = () => {
        setIsPainting(true);
    }
    const stopPainting = () => {
        setIsPainting(false);
    }
    const painting = ({nativeEvent}) => {
        const { offsetX, offsetY} = nativeEvent;
        if(ctx){
            if(!isPainting){
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY);
            }else{
                ctx.lineTo(offsetX, offsetY);
                ctx.stroke();
            }
        }
    };
    const handleColorClick = ({nativeEvent}) => {
        const {target} = nativeEvent;
        const color = target.style.backgroundColor;
        // const context = ctx;
        // context.strokeStyle = color;
        // setCtx((prevState) => ({...prevState, strokeStyle : color}));
        ctx.strokeStyle = color;
        // context.strokeStyle = color;

        // setCtx(context);
    };
    const handleRangeChange = (event) => {
        setRangeval(event.target.value);
    }

    //TODO: color선택버튼? 그냥div+ 하드코딩했는데 간단하게하면 좋을것같다.
    return(
        <div className="canvas_wrap">
            <h1 style={{textAlign : 'center'}}>Paint</h1>
            <canvas 
                className="canvas"
                ref={canvasRef}
                onMouseDown={startPainting}
                onMouseUp={stopPainting}
                onMouseMove={painting}
                onMouseLeave={stopPainting}
                ></canvas>
                <div className="controls">
                    {/* <div className="controls_range">
                        <input onInput={handleRangeChange} type="range" min="0.1" max="5.0" value="2.5" step="0.1"/>
                        {rangeval}
                    </div> */}
                    <div className="controls__colors" id="jsColors">
                        <div onClick={handleColorClick} className="controls__color jsColor" style={{backgroundColor:"#2c2c2c"}}></div>
                        <div onClick={handleColorClick} className="controls__color jsColor" style={{backgroundColor:"white"}}></div>
                        <div onClick={handleColorClick} className="controls__color jsColor" style={{backgroundColor:"#ff3b30"}}></div>
                        <div onClick={handleColorClick} className="controls__color jsColor" style={{backgroundColor:"#ff9500"}}></div>
                        <div onClick={handleColorClick} className="controls__color jsColor" style={{backgroundColor:"#4cd963"}}></div>
                        <div onClick={handleColorClick} className="controls__color jsColor" style={{backgroundColor:"#5ac8fa"}}></div>
                        <div onClick={handleColorClick} className="controls__color jsColor" style={{backgroundColor:"#0579ff"}}></div>
                        <div onClick={handleColorClick} className="controls__color jsColor" style={{backgroundColor:"#5856d6"}}></div>
                    </div>
                </div>
        </div>
    );
}

export default Paint;