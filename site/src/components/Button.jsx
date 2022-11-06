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
    <button type="button" className={`btn ${classes}`} onClick={() => { onClickCallback && onClickCallback()}} onMouseOver={onHover} onMouseOut={onHoverOver}>
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
function DeletableButton({ text, hoverText, iconSrc=null, onClickCallback }) {
  return (
    <Button classes={"btn--delete"} text={text} iconSrc={iconSrc} onClickCallback={onClickCallback} hoverText={hoverText} />
  )
}

export { Button, PrimaryButton, UnfilledButton, DeletableButton };
