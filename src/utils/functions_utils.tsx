import { setPosts } from "../pages/Home";
import { setError } from "./states";

function getHumanDate(date: string) {
    const parsed_date = new Date(Date.parse(date));

    return `${parsed_date.toLocaleDateString()} à ${parsed_date.toLocaleTimeString()}`;
}

function getToken() {
    let cookies = document.cookie
    let token = cookies.split("; ").find(e => e.startsWith("token="))
    if (token == undefined) {
        return ""
    }
    token = token.substring(6)
    if (token != undefined) {
        return token
    }
    return ""
}

async function fetch_posts() {
    const res = await fetch("https://api.creativeblogger.org/posts");

    if (!res.ok) {
        displayError(await res.json())
        return
    }

    const posts: Post[] = await res.json();
    setPosts(posts);
}

function displayError(error: ServerError) {
    setError(error.errors[0].message)
}

export {getHumanDate, fetch_posts, getToken, displayError}