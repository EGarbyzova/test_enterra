import React, { useRef, useState, useEffect, useCallback } from "react";

function animation(elem, fromX, fromY, toX, toY) {
  const dx = fromX - toX;
  const dy = fromY - toY;
  let i = 1,
    count = 20,
    delay = 20;

  function loop() {
    if (i >= count) {
      return;
    }
    i += 1;
    elem.style.left = (fromX - (dx * i) / count).toFixed(0) + "px";
    elem.style.top = (fromY - (dy * i) / count).toFixed(0) + "px";
    setTimeout(loop, delay);
  }
  loop();
}

export default function MainComponent() {
  const movedSquare = useRef(null);
  const staticSquare = useRef(null);
  const circle = useRef(null);

  const [isDisabled, setIsDisabled] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const timerId = useRef(null);
  useEffect(() => {
    if (seconds === 0 && timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
      setSeconds(5);
      setIsDisabled(false);
      setTimerActive(false);
      circle.current.classList.toggle("circle-animation");
      circle.current.style.left = 0;
      circle.current.style.top = 0;
    }
  }, [seconds, timerId]);

  const handleClick = useCallback(() => {
    if (!timerId.current) {
      timerId.current = setInterval(() => {
        console.log("timer");
        setSeconds((prev) => --prev);
      }, 1000);
      setIsDisabled(true);
      setTimerActive(true);
    }
    circle.current.classList.toggle("circle-animation");
    animation(
      circle.current,
      movedSquare.current.getBoundingClientRect().left,
      movedSquare.current.getBoundingClientRect().top,
      staticSquare.current.getBoundingClientRect().left,
      staticSquare.current.getBoundingClientRect().top
    );
  }, [timerId]);

  return (
    <>
      <div className="square-container">
        <div className="square vertical-animation" ref={movedSquare}>
          1
        </div>
        <div className="circle" ref={circle}></div>
        <div className="square vertical-center" ref={staticSquare}>
          2
        </div>
      </div>
      <button className="btn" onClick={handleClick} disabled={isDisabled}>
        {timerActive ? seconds : "START"}
      </button>
    </>
  );
}
