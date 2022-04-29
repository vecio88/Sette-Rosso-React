import { useEffect, useState } from 'react';
import './Board.css';
import CardComponent from '../Card/CardComponent';
import Card from '../../entities/Card';
import { listOfCard } from '../../services/datiAvvio';
import { Player } from '../../entities/interfacce';
import { isConstructorDeclaration } from 'typescript';

function Board() {

  const [deck, setDeck] = useState<Array<Card>>([]);
  const INITIAL_CARD_HAND : number = 7
  const [player1, setPlayer1] = useState<Player>()
  const [cartaSelezionata, setCartaSelezionata] = useState<Card>()

  // Set del mazzo
  useEffect(() => {
    let newDeck : Array<Card> = [];

    let index = 0; 
    const maxNumCard = listOfCard.length

    do {
      let numRandom = Math.abs(Math.trunc(Math.random() * (listOfCard.length) ))
      newDeck.push(listOfCard[numRandom])
      listOfCard.splice(numRandom, 1)
      
      index++
    } while (index < maxNumCard)


    const tmpPlayer1 : Player = {
      name : "Player1", 
      handCard : newDeck.slice(0, INITIAL_CARD_HAND),
      cardInGame : []
    }
    setPlayer1(tmpPlayer1)

    setDeck(newDeck)
  }, [])

  function dragCardFromHand(ev: React.DragEvent<HTMLDivElement>) {
    const id = (ev.target as HTMLDivElement).id;
    const tmpCard : Card | undefined = player1?.handCard.filter(card => card.id === id)[0] 
    setCartaSelezionata(tmpCard)
  }

  function dragCardFromBoard(ev: React.DragEvent<HTMLDivElement>) {
    const id = (ev.target as HTMLDivElement).id;
    const tmpCard : Card | undefined = player1?.cardInGame.filter(card => card.id === id)[0] 
    setCartaSelezionata(tmpCard)
  }

  function onDropInBoard(ev: React.DragEvent<HTMLDivElement>) {   
    ev.preventDefault();
    const tmpNewHandCard = player1?.handCard.filter(card => card.id !== cartaSelezionata?.id) 

    const tmpCardInGame : Array<Card> = player1?.cardInGame || []
    const newCardInGame : Array<any> = [...tmpCardInGame, cartaSelezionata]

    const tmpPlayer = Object.assign({}, player1)
    tmpPlayer.cardInGame = newCardInGame
    if(tmpNewHandCard == undefined) {
      tmpPlayer.handCard = []
    } else {
      tmpPlayer.handCard = tmpNewHandCard
    }
  

    setPlayer1(tmpPlayer)

  }

  function onDropInHand(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const tmpNewCardInGame = player1?.cardInGame.filter(card => card.id !== cartaSelezionata?.id) 
    const tmpHandCard : Array<Card> = player1?.handCard || []
    const newHandCard : Array<any> = [...tmpHandCard, cartaSelezionata]

    const tmpPlayer = Object.assign({}, player1)
    tmpPlayer.handCard = newHandCard

    if(tmpNewCardInGame == undefined) {
      tmpPlayer.cardInGame = []
    } else {
      tmpPlayer.cardInGame = tmpNewCardInGame
    }
  

    setPlayer1(tmpPlayer)

  }

  function onDragOverFunct(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  return (
    
    <div className='boardContainer'>

      <div className='frontPlayerContentainer'></div>
      <div className='boardCenterContentainer'>
        <div className='boardSxContentainer'></div>
        <div className='boardCenterGame'>
        </div>
        <div className='boardDxContentainer'></div>
      </div>
      <div className='selfPlayerContentainer'>
        

        <div className='selfSxContainer'></div>
        <div className='selfCenterContainer'>

          <div className='onBoardHandCard' onDrop={onDropInBoard} onDragOver={onDragOverFunct} >
            {deck.length !== 0 && 
            player1?.cardInGame.length !== 0 &&
            player1?.cardInGame.map(card => 
              <CardComponent 
                key={card.id}
                id={card.id} 
                color={card.color} 
                value={card.value} 
                rule={card.rule} 
                dragCardFromHand={dragCardFromBoard} />) }
          </div>
          
          <div className='selfHandCard' onDrop={onDropInHand} onDragOver={onDragOverFunct}  >
            {deck.length !== 0 && 
            player1?.handCard.map(card => 
              <CardComponent 
                key={card.id}
                id={card.id} 
                color={card.color} 
                value={card.value} 
                rule={card.rule} 
                dragCardFromHand={dragCardFromHand} />) }
          </div>
        </div>
        <div className='selfDxContainer'></div>

        
      </div>   
      
    </div>
  );
}

export default Board;
