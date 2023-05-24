import { Component, Show, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { fetch_posts, getToken } from "../utils/functions_utils";

const [showPopup, setShowPopup] = createSignal(false);
const [error, setError] = createSignal("")

async function onPostSubmit(e: Event) {
    e.preventDefault()

    let token = getToken()

    if (token.length == 0) {
        alert("Vous ne pouvez pas poster de posts si vous n'êtes pas connecté.")
        return
    }

    const res = await fetch("https://api.creativeblogger.org/posts/new", {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: new FormData(
            document.getElementById("post-form") as HTMLFormElement
        )
    })

    if (!res.ok) {
        const error: ServerError = await res.json()
        setError(error.errors[0].message)
        return
    }
    
    alert("Post publié avec succès !")
    close_popup()
    fetch_posts()
}

function close_popup() {
    setError("")
    setShowPopup(false)
}

function open_popup() {
    setError("")
    setShowPopup(true)
}

const CreatePostButton: Component = () => {
    window.addEventListener("keyup", e => {
        if (e.key == "Escape") {
            close_popup()
        }
    })

    createEffect(() => {
        if (showPopup()) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }
    })

    onMount(() => setError(""))

    onCleanup(() => setError(""))

    return (
        <>
            <Show
                when={showPopup()}
            >
                <div class="text-white fixed p-40 pt-10 top-0 left-0 w-screen h-screen z-[2]">
                    <form onsubmit={onPostSubmit} class="bg-black z-[3] relative p-2 rounded-xl" id="post-form">
                        <button class="absolute top-0 left-0 p-2 m-2 font-bold" onclick={close_popup}>X</button>
                        <h1 class="text-2xl m-5">Créer un post</h1>
                        <label for="title">Titre du post : </label>
                        <input type="text" name="title" id="post-title" class="text-black p-1" required /><br />
                        <label for="content">Contenu : </label><br />
                        <textarea name="content" id="content" cols="30" rows="10" class="text-black p-1" required></textarea><br />
                        <h2 class="text-center text-red-500 pt-3 text-2xl">{error()}</h2>
                        <input type="submit" value="Créer un nouveau post" class="bg-blue-800 border-blue-950 border-2 p-1 rounded-md" />
                    </form>
                </div>
            </Show>
            
            <button onclick={open_popup} class="bg-blue-800 hover:bg-blue-700 active:bg-blue-600 fixed bottom-0 right-0 w-10 h-10 rounded-full m-3 text-xl text-white">+</button>
        </>
    )
};

export default CreatePostButton;