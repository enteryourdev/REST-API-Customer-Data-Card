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
private isInMenu: boolean = false;
private started: boolean = false;

    constructor(){
    }

    async load(){
        this.people = await getDataBase<TrimmedUser>(); 
    }

    async start(){
        if (!this.started){ // switch
        const peopleData = await this.load();
        this.started = true;
        }
        console.log(this.current()); 

        //key press
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) process.stdin.setRawMode(true);
        process.stdin.on("keypress", (str, key) => {
            if (gameover) return;
            if (key.ctrl && key.name === 'c') process.exit();
            if (!this.isInMenu) this.mainGameKey(str, key);
            else this.menu(str, key);
           
    }); 
}
    private mainGameKey(str: string, key: any){
        if (key.name === 'a') {
            console.log(this.prev());
        }
        if (key.name === 'd') {
            console.log(this.next());
        }
        if (key.name === 'return') {
            //hire
            //splice the current and push to hired.
            this.hired.push(this.current());
            this.people.splice(this.pointer, 1);
        }
        if (key.name === 'backspace') {
            //fire
            this.fired.push(this.current());
            this.people.splice(this.pointer, 1);
        }
        if (key.name === 'q'){ // open menu
            if (this.isInMenu){
                this.isInMenu = false;
                return;
            }
            this.menu(str, key);
        }
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

    private menu(str: string, key: any){
         process.stdin.on("keypress", (str, key) => {
            let newPointer = 0;
            console.log("Press F1 for hired list, and F2 for fired list");
            if (key.name === 'f1'){
                console.log(`you have hired total of: ${this.hired.length} people`);
            }
            if (key.name === 'f2'){
                console.log(`you have hired total of: ${this.fired.length} people`);
            }
            if (key.name === 'q'){
                this.isInMenu = false;
                this.start();
                
            }
         });
    }
// add updates, and load new profiles.

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