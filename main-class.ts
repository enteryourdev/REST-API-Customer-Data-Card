/*
Objective: make a person card for each person in the database.
1. make sure to show the person's ID, Name, Post, and Photo.
2. You can press A for go back, or D to go forward for next person.





*/

import { getDataBase } from "./git-analysis"
import { TrimmedUser } from "./git-analysis";


const people = await getDataBase<TrimmedUser>();
let pointer = 0;

function current(){
    return people[pointer];
}
function next(){

}
function prev(){

}

current();

/*
I have a list of people.
you can only see one at a time.
you can go forward or backwards to see other people.
you can either fire or hire.

*/