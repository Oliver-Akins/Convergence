import React, { useState, useEffect } from "react";

function Button({ text, classes="", onClickCallback, type=null, triggerOnEnter = false, iconSrc = null, hoverText = null}) {
  const [isHover, setHover] = useState(false);

  const onHover = (e) => {
    e.preventDefault();
    setHover(true);
  };

  const onHoverOver = (e) => {
    e.preventDefault();
    setHover(false);
  };

  useEffect(() => {
    const listener = event => {
      if (triggerOnEnter && (event.code === "Enter" || event.code === "NumpadEnter")) {
        event.preventDefault();
        onClickCallback(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [onClickCallback, triggerOnEnter]);

  return (
    <button type={type? type: "button"} className={`btn ${classes}`} onClick={async (e) => { onClickCallback && onClickCallback(e)}} onMouseOver={onHover} onMouseOut={onHoverOver}>
      { iconSrc && <img src={require(`../images/${iconSrc}`)} alt=""></img> }
      {(!hoverText || (hoverText && isHover)) ? text: hoverText }
    </button>
  );
}

/** 
 * Button changes to red on hover
*/
function DeletableButton({ text, hoverText, iconSrc=null, classes, onClickCallback }) {
  return (
    <Button classes={`btn--delete ${classes}`} text={text} iconSrc={iconSrc} onClickCallback={onClickCallback} hoverText={hoverText} />
  )
}

function IconButton({ onClickCallback, classes, imgSrc, children}) {
  return (
    <button type="button" className={`btn-icon ${ classes }`} onClick={ async (e) => { onClickCallback && onClickCallback(e)}}>
      { children }
      <img src={require(`../images/icons/${imgSrc}`)} alt="Delete"></img>
    </button>
  );
}

function SimpleDeleteButton({ onClickCallback, outlined, thin, children }) {
  return (
    <IconButton onClickCallback={onClickCallback} children={children} classes={outlined ? "btn-icon--outlined" : ""} imgSrc={ !thin ? "close-button.svg" : "close-button-thin.svg" } />
  );
}

function SimpleCheckButton({ onClickCallback, outlined, children }) {
  return (
    <IconButton onClickCallback={onClickCallback} children={children} classes={outlined ? "btn-icon--check btn-icon--outlined" : "btn-icon--check"} imgSrc="check-button.svg" />
  );
}

export { Button, DeletableButton, IconButton, SimpleDeleteButton, SimpleCheckButton };
