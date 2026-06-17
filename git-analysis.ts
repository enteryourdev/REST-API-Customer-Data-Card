// generating Git analysis from my own link, testing REST API
//https://jsonplaceholder.typicode.com/posts/1
//https://pokeapi.co/api/v2/pokemon/charizard
import open from "open";

async function run(){
    const res = await fetch("https://api.github.com/users/enteryourdev");
    const data = await res.json();
    console.log(data.login);
    console.log(data.name);       
    console.log(data.public_repos); 
    open(data.avatar_url);
}
run();



async function getDataBase(){
    const user = await fetch("https://jsonplaceholder.typicode.com/users");
    const userData = await user.json();
}