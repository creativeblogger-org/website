import { Component, Show, createEffect, createSignal } from "solid-js";
import { fetch_posts } from "../pages/Home";

const [showPopup, setShowPopup] = createSignal(false);


function getCookies() {
    let headers = document.cookie.split("; ")
    console.log(headers);
    let type = headers.find(cookie => cookie.startsWith("type="))?.substring(5)
    let token = headers.find(cookie => cookie.startsWith("token="))?.substring(6)
    if (type && token) {
        return [type, token]
    }
    return []
}

async function onPostSubmit(e: Event) {
    e.preventDefault()

    let cookies = getCookies()

    if (cookies.length != 2) {
        alert("Vous ne pouvez pas poster de posts si vous n'êtes pas connecté.")
        return
    }

    console.log(cookies);
    

    const res = await fetch("https://api.creativeblogger.org/posts/new", {
        method: "PUT",
        headers: {
            "Authorization": `${cookies[0]} ${cookies[1]}`
        },
        body: new FormData(
            document.getElementById("post-form") as HTMLFormElement
        ),
    })
    console.log(res);

    if (!res.ok) {
        alert((await res.json()).errors[0].message)
        return
    }
    alert("Post publié avec succès !")
    setShowPopup(false)
    fetch_posts()
}

const CreatePostButton: Component = () => {
    window.addEventListener("keyup", e => {
        if (e.key == "Escape") {
            setShowPopup(false)
        }
    })

    createEffect(() => {
        if (showPopup()) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }
    })

    return (
        <>
            <Show
                when={showPopup()}
            >
                <div class="text-white fixed p-40 pt-10 top-0 left-0 w-screen h-screen z-[2]">
                    <form onsubmit={onPostSubmit} class="bg-black z-[3] relative p-2 rounded-xl" id="post-form">
                        <button class="absolute top-0 left-0 p-2 m-2 font-bold" onclick={() => setShowPopup(false)}>X</button>
                        <h1 class="text-2xl m-5">Créer un post</h1>
                        <label for="title">Titre du post : </label>
                        <input type="text" name="title" id="post-title" class="text-black p-1" required /><br />
                        <label for="content">Contenu : </label><br />
                        <textarea name="content" id="content" cols="30" rows="10" class="text-black p-1" required></textarea><br />
                        <input type="submit" value="Créer un nouveau post" class="bg-blue-800 border-blue-950 border-2 p-1 rounded-md" />
                    </form>
                </div>
            </Show>
            
            <button onclick={() => setShowPopup(true)} class="bg-blue-800 hover:bg-blue-700 active:bg-blue-600 fixed bottom-0 right-0 w-10 h-10 rounded-full m-3 text-xl text-white">+</button>
        </>
    )
};

export default CreatePostButton;
export {getCookies};