export class Candidate {
    
    private firstName: string;
    private lastName: string;
    private userId: string;
    private score: number;
   
    constructor()   
    constructor(firstName:string, lastName:string, userId:string)
    constructor(firstName ?: string, lastName ?:string, userId ?:string){
         this.firstName = undefined == firstName ? null : firstName;  
         this.lastName = undefined == lastName ? null : lastName;  
         this.userId = undefined == userId ? null : userId;   
    };
    
    public setScore(score){
        this.score = score;
    }
    
    
}