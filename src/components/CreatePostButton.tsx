import { Component, Show, createEffect, createSignal } from "solid-js";

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

const CreatePostButton: Component = () => {

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
                    <form onsubmit={async (e) => {
                        e.preventDefault()

                        let cookies = getCookies()

                        if (cookies.length != 2) {
                            alert("Vous ne pouvez pas poster de posts si vous n'êtes pas connecté.")
                            return
                        }
                        

                        const res = await fetch("https://api.creativeblogger.org/posts/new", {
                            method: "PUT",
                            headers: {
                                "Authorization": `${cookies[0]} ${cookies[1]}`
                            }
                        })
                        console.log(res);
                        
                        if (!res.ok) {
                            console.log((await res.json()).errors)
                        }
                        // setShowPopup(false)
                    }} class="bg-black z-[3] relative">
                        <h1 class="text-2xl m-5">Créer un post</h1>
                        <label for="post-title">Titre du post : </label>
                        <input type="text" name="post-title" id="post-title" class="text-black p-1" required /><br />
                        <label for="post-content">Contenu : </label><br />
                        <textarea name="post-content" id="post-content" cols="30" rows="10" class="text-black p-1" required></textarea><br />
                        <input type="submit" value="Créer un nouveau post" class="bg-blue-800 border-blue-950 border-2 p-1 rounded-md" />
                    </form>
                </div>
            </Show>
            
            <button onclick={() => setShowPopup(true)} class="bg-blue-800 hover:bg-blue-700 active:bg-blue-600 fixed bottom-0 right-0 w-10 h-10 rounded-full m-3 text-xl text-white">+</button>
        </>
    )
};

export default CreatePostButton;
