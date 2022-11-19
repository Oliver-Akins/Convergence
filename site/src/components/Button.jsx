import React, { useState } from "react";

function Button({ text, classes="", onClickCallback, iconSrc = null, hoverText = null}) {
  const [isHover, setHover] = useState(false);

  const onHover = (e) => {
    e.preventDefault();
    setHover(true);
  };

  const onHoverOver = (e) => {
    e.preventDefault();
    setHover(false);
  };

  return (
    <button type="button" className={`btn ${classes}`} onClick={async (e) => { onClickCallback && onClickCallback(e)}} onMouseOver={onHover} onMouseOut={onHoverOver}>
      { iconSrc && <img src={require(`../images/${iconSrc}`)} alt=""></img> }
      {(!hoverText || (hoverText && isHover)) ? text: hoverText }
    </button>
  );
}

function PrimaryButton({ text, onClickCallback }) {
  return (
    <Button classes={"btn--primary"} text={text} onClickCallback={onClickCallback} />
  )
}

function UnfilledButton({ text, onClickCallback }) {
  return (
    <Button classes={"btn--unfilled"} text={text} onClickCallback={onClickCallback} />
  )
}

/** 
 * Button changes to red on hover
*/
function DeletableButton({ text, hoverText, iconSrc=null, isGrey = false, onClickCallback }) {
  return (
    <Button classes={ isGrey ? "btn--grey btn--delete" : "btn--delete"} text={text} iconSrc={iconSrc} onClickCallback={onClickCallback} hoverText={hoverText} />
  )
}

function IconButton({ onClickCallback, classes, imgSrc }) {
  return (
    <button type="button" className={`btn-icon ${ classes }`} onClick={ async (e) => { onClickCallback && onClickCallback(e)}}>
      <img src={require(`../images/icons/${imgSrc}`)} alt="Delete"></img>
    </button>
  );
}

function SimpleDeleteButton({ onClickCallback, outlined, thin }) {
  return (
    <IconButton onClickCallback={onClickCallback} classes={outlined ? "btn-icon--outlined" : ""} imgSrc={ !thin ? "close-button.svg" : "close-button-thin.svg" } />
  );
}

export { Button, PrimaryButton, UnfilledButton, DeletableButton, IconButton, SimpleDeleteButton };
