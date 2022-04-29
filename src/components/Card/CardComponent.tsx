import { DragEventHandler } from 'react';
import Card from '../../entities/Card';
import './Card.css';

interface ICard {
  id : string
  color : string
  value : string
  rule : string
  dragCardFromHand(ev: React.DragEvent<HTMLDivElement>) : void
}

const CardComponent : React.FC<ICard> = ({id, color, value, rule, dragCardFromHand}) => {

  

  return (
    <>
    <div id={id} className={'aCard ' + color} draggable="true" onDragStart={dragCardFromHand} > 
      <div className='numCentrale'><span>{value}</span></div>
      <div className='ruleOnCardBottom'><span>{rule}</span></div>
    </div>
    </>
  )
}

export default CardComponent;
