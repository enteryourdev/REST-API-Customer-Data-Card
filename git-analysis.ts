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
//run();

interface User{
    id: number,
    username: string,
    email: string,
    address: {
        street: string,
        city: string,
        zipcode: number,
    }
    posts?: Posts,
    photos?: Photos[]
}
interface Posts{
    userId: number,
    id: number,
    title: string,
    body: string
}
interface Photos{
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}
export interface TrimmedUser {
  id: number,
  username: string,
  email: string,
  posts?: { 
    title: string, 
    body: string 
};
}

export async function getDataBase<T>(): Promise<T[]>{
    // users = id
    // posts = id, userId
    // photos = id, albumId
    // goal is to do a join
    const user: User[] = await (await fetch("https://jsonplaceholder.typicode.com/users")).json();
    const posts: Posts[] = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
    //const photos: Photos[] = await (await fetch("https://jsonplaceholder.typicode.com/photos")).json();

    const trimmedUserData = user.map((data) => {
        const post = posts.find(posts => posts.userId === data.id);
        return {
        id: data.id,
        username: data.username,
        email: data.email,
        posts: post ? { title: post.title, body: post.body } : undefined,
    };
});

    return trimmedUserData as T[];
}

getDataBase();
