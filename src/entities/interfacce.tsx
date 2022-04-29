import Card from "./Card";

export interface Deck {
    deck : Array<Card>
}

export interface Player {
    name : string
    handCard : Array<Card>
    cardInGame : Array<Card>
}