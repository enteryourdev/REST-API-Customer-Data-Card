/*
Objective: make a person card for each person in the database.
1. make sure to show the person's ID, Name, Post, and Photo.
2. You can press A for go back, or D to go forward for next person.
*/

import { getDataBase } from "./git-analysis"
import { TrimmedUser } from "./git-analysis";
import * as readline from "readline";
let gameover: boolean = false;
type Screen = 'game' | 'menu' | 'hiredList' | 'firedList' | 'settings';


class mainClass{
private pointer = 0;
private people: TrimmedUser[] = [];
private hired: TrimmedUser[] = [];
private fired: TrimmedUser[] = [];
private isInMenu: boolean = false;
private started: boolean = false;
private screen: Screen = 'game';

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
            /* 
            if (!this.isInMenu) this.mainGameState(str, key);
            else this.menu(str, key);
            */
           switch (this.screen){
            case 'game':{
                this.mainGameState(str, key);
            }
            case 'menu':{
                this.menu(str, key);
            }
            case 'firedList':{
                this.firedListState(str, key);
            }
            case 'hiredList':{
                this.hiredListState(str, key);
            }
            case 'settings':{
                this.settingState(str, key);
            }
           }
           
    }); 
}
    private mainGameState(str: string, key: any){
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
            this.screen = 'menu';
            console.log("now entering menu.");
        }
    }

    private menu(str: string, key: any){
            let newPointer = 0;
            console.log("Press 1 for hired list, and 2 for fired list, q to exit menu");
            if (key.name === '1'){
                console.log(`you have hired total of: ${this.hired.length} people`);
            }
            if (key.name === '2'){
                console.log(`you have hired total of: ${this.fired.length} people`);
            }
            if (key.name === 'q'){
                this.isInMenu = false;         
            }
        };

    private firedListState(str: string, key: any){

    }
    private hiredListState(str: string, key: any){

    }
    private settingState(str: string, key: any){

    }

    // mechanics.    
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

    private async loadNew(){ // load new profiles.from git-analysis.ts

    }

}
// add updates, and load new profiles.


/*
I have a list of people.
you can only see one at a time.
you can go forward or backwards to see other people.
you can either fire or hire.

*/

//key press

//launch
new mainClass().start();