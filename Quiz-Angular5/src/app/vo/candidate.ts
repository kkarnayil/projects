export class Candidate {

  firstName: string;
  lastName: string;
  userId: string;
  score: number;

  constructor()
  constructor(firstName: string, lastName: string, userId: string)
  constructor(firstName?: string, lastName?: string, userId?: string) {
    this.firstName = undefined === firstName ? null : firstName;
    this.lastName = undefined === lastName ? null : lastName;
    this.userId = undefined === userId ? null : userId;
  }

  public setScore(score) {
    this.score = score;
  }

}
