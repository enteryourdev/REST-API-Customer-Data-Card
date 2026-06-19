/*
Objective: make a person card for each person in the database.
1. make sure to show the person's ID, Name, Post, and Photo.
2. You can press A for go back, or D to go forward for next person.





*/

import { getDataBase } from "./git-analysis"
import { TrimmedUser } from "./git-analysis";

let pointer = 0;
let people: TrimmedUser[] = [];

async function main() {
    people = await getDataBase<TrimmedUser>();
}


function current(){
    return people[pointer];
}
function next(){
    pointer++
    if (pointer >= people.length) {
        pointer = 0;
    }
    return people[pointer]
}
function prev(){
    pointer--
    if (pointer < 0) {
        pointer = people.length - 1;
    }
    return people[pointer]
}

async function run() {
  await main();              // wait for the fetch, it NEEDS to wait.
  console.log(current());    

}

run();

/*
I have a list of people.
you can only see one at a time.
you can go forward or backwards to see other people.
you can either fire or hire.

*/