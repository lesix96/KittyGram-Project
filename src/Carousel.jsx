import React, { useState } from "react";
import "./styles/styles.less";

const Carousel = ({ picsArray }) => {
  const imgWidth = 400;
  const imgHeight = 600;
  const maxLength = picsArray.length - 1;
  const maxMovement = maxLength * imgWidth;
  
  const [currentIndex, setCurentIndex] = useState(0);
  const [movement, setMovement] = useState(0);
  const [beingTouched, setBeingTouched] = useState(false);
  const [touchX, setTouchX] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const renderedPics = picsArray.map(img => {
    return (
        <img key={img.id} src={img.picture} id={img.index} width="100%" height="100%" />
    );
  });

  const indicationBoard = () => {
    return (
      <ul className="list_of_indicators">
      {
        picsArray.map((img) => {
          return (
            <li className="indicator_item" key={img.id}>
              <button className={img.index === currentIndex ? 'indicator active' : 'indicator'} onClick={() => transitionTo(img.index)}>&#9899;</button>
            </li>
          )
        })
      }
      </ul>
    )
  }

  const handleMove = (clientX) => {
    setTouchX(clientX);
    if(beingTouched
      && movement <= (currentIndex+1)* imgWidth
      && movement >= (currentIndex+1)* imgWidth - imgWidth) {
      
      const maxLength = picsArray.length - 1;
      let deltaX = touchStartX - touchX;
      let nextMovement = movement + deltaX;
      if (nextMovement < 0) {
        nextMovement = 0;
      }
      if (nextMovement > maxLength * imgWidth) {
        nextMovement = maxLength * imgWidth;
      }
      
      setMovement(nextMovement);
    } 
    };

  const handleMouseMove = (mouseMoveEvent) => {
    handleMove(mouseMoveEvent.clientX);
  }

  const handleTouchMove = (touchMoveEvent) => {
    handleMove(touchMoveEvent.targetTouches[0].clientX);
  }

  const handleTouchStart = (touchStartEvent) => {
    touchStartEvent.preventDefault();
    handleStart(touchStartEvent.targetTouches[0].clientX);
  }
  
  const handleTouchEnd = () => {
    handleEnd();
  }

  const handleMouseUp = () => {
    handleEnd();
  }

  const handleMouseLeave = () => {
    handleMouseUp();
  }

  const handleMouseDown = (mouseDownEvent) =>{
    mouseDownEvent.preventDefault();
    handleStart(mouseDownEvent.clientX);
  }

  const handleStart = (clientX)  => {
    setTouchStartX(clientX);
    setBeingTouched(true);
  };

  const handleEnd = () => {
    if(beingTouched){
    const endPosition = movement / imgWidth;
    const endPartial = endPosition % 1;
    const endingIndex = endPosition - endPartial;
    const deltaInteger = endingIndex - currentIndex;

    let nextIndex = endingIndex;

    if (deltaInteger >= 0) {
      if (endPartial >= 0.4) {
        nextIndex += 1;
      } else if (deltaInteger < 0) {
        nextIndex = currentIndex - Math.abs(deltaInteger);
        if (endPartial > 0.9) {
          nextIndex +=1;
        }
      }
    }
    setTouchStartX(0);
    setTouchX(0);
    setBeingTouched(false);
    transitionTo(nextIndex);
    }
  }

  const transitionTo = (nextIndex) => {
    setCurentIndex(nextIndex);
    setMovement(nextIndex * imgWidth);
  }

    return (
      <div>
        <div
          className="main"
          style={{
            width: `${imgWidth}px`,
            height: `${imgHeight}px`,
          }}
          onMouseMove={mouseMoveEvent => handleMouseMove(mouseMoveEvent)}
          onMouseDown={mouseDownEvent => handleMouseDown(mouseDownEvent)}
          onMouseLeave={mouseLeaveEvent => handleMouseLeave(mouseLeaveEvent)} 
          onMouseUp={mouseUpEvent => handleMouseUp(mouseUpEvent)}

          onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
          onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
          onTouchEnd={() => handleTouchEnd()}
        >
          <div 
            className="swiper"
            style={{
              transform: `translateX(${movement * -1}px)`,
            }}>
            {renderedPics}
          </div>
          {
            
              <button
                className="move prev"
                onClick={() => {movement !== 0 ? transitionTo(currentIndex - 1) : transitionTo(maxLength)
                }}
              >
                &#8249;
              </button>
            
          }
          {
          
            <button
              className="move next"
              onClick={() => {movement !== maxMovement ? transitionTo(currentIndex + 1) : transitionTo(0);
              }}
            >
              &#8250;
            </button>
          
          }
          
          <div className="indication_board">
          {indicationBoard()}
        </div>
        </div>
        
      </div>
    );
  

}

export default Carousel;