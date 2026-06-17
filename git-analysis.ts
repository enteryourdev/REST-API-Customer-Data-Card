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



export async function getDataBase(){
    // users = id
    // posts = id, userId
    // photos = id, albumId
    const user = await fetch("https://jsonplaceholder.typicode.com/users");
    const userData = await user.json();
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const postsData = await posts.json();
    const photos = await fetch("https://jsonplaceholder.typicode.com/photos")
    const photosData = await photos.json();
}