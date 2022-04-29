export class Card  {
    id : string
    color : string
    value : string
    rule : string

    constructor(id:string, color: string, value : string, rule : string){
        this.id = id
        this.color = color
        this.value = value
        this.rule = rule
    }
   
    
}

export default Card;