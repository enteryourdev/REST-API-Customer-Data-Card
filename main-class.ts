/*
Objective: make a person card for each person in the database.
1. make sure to show the person's ID, Name, Post, and Photo.
2. You can press A for go back, or D to go forward for next person.
*/

import { getDataBase } from "./git-analysis"
import { TrimmedUser } from "./git-analysis";
import * as readline from "readline";
let gameover: boolean = false;


class mainClass{
private pointer = 0;
private people: TrimmedUser[] = [];
private hired: TrimmedUser[] = [];
private fired: TrimmedUser[] = [];

    constructor(){

    }

    async load(){
        this.people = await getDataBase<TrimmedUser>();
    }

    async start(){

        const peopleData = await this.load();
        console.log(this.current()); 

        //key press
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) process.stdin.setRawMode(true);
        process.stdin.on("keypress", (str, key) => {
            if (gameover) return;
            if (key.ctrl && key.name === 'c') process.exit();

            if (key.name === 'a') {
                console.log(this.prev());
            }
            if (key.name === 'd') {
                console.log(this.next());
            }
            if (key.name === 'enter') {
                //hire
            }
            if (key.name === 'backspace') {
                //fire
        }
    }); 
}


    private current(){
        return this.people[this.pointer];
    }

    private next(){
        this.pointer++
        if (this.pointer >= this.people.length) this.pointer = 0;
        return this.current();
    }

    private prev(){
        this.pointer--
        if (this.pointer < 0) {
            this.pointer = this.people.length - 1;
        }
        return this.people[this.pointer]
    }


}

/*
I have a list of people.
you can only see one at a time.
you can go forward or backwards to see other people.
you can either fire or hire.

*/

//key press

//launch
new mainClass().start();