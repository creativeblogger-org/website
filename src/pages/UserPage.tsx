import { Component, createSignal, onMount } from "solid-js";
import { customFetch, displayError, findPermissions, getError, getHumanDate } from "../utils/functions_utils";

const [user, setUser] = createSignal({} as User);

async function getUser() {
    const res = await customFetch(`https://api.creativeblogger.org${location.pathname}`);

    if (!res.ok) {
        displayError(getError(await res.json()));
        return;
    }

    const user: User = await res.json()
    console.log(user);
    
    setUser(user);
}

const UserPage: Component = () => {
    onMount(() => getUser())
    
    return <div class="text-center">
        <h1 class="text-xl">{user().username}</h1>
        <h2 class="text-lg">{findPermissions(user().permission)}</h2>
        <h2 class="text-lg">Créé le {getHumanDate(user().created_at)}</h2>
    </div>;
};

export default UserPage;