<svelte:head>
  <title>Жители | Paradise</title>
</svelte:head>

<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`/dashboard/api/users`);
		const data = await res.json();
		if (res.status === 200) {
			return { users: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>

  // import _app from "_app.js";
  import { onMount } from "svelte"
  import { goto } from "@sapper/app";

  import Spinner from "../../components/Spinner.svelte";

  let state = {
    user: "user",
    loading: true
  }

  onMount(() => {
    // Проверяем пользователя...
    let username = Cookies.get('paradise_key');
    let uuk = Cookies.get('paradise_uuk');

    if (username && uuk) {
      // Проверяем пользователя через бд...
      fetch(`/dashboard/client/${username}`)
      .then((data) => {
        if (data.status != 404) {
          // Проверяем uuk ключ...
          data.json()
          .then((data) => {
            state.user = data.key;
          })
          fetch(`/dashboard/api/${uuk}`)
          .then((data) => {
            if (data.status != 404) {
              state.loading = false;
            } else {
              goto("/dashboard/client");
            }
          })
        } else {
          goto("/dashboard/client");
        }
      })
    } else { 
      goto("/dashboard/client");
    }
  })

  export let users;

</script>

{ #if state.loading }
  <div style="width: 100%; height: 100vh; z-index: 2;" class="absolute bg-white flex flex-col justify-center items-center">
		<Spinner />
	</div>
{ /if }

<div style="overflow: scroll;" class="w-full h-full absolute">

  <div class="px-12 mt-12 relative">
    <!-- Берём список всех пользователей... -->

    <div class="pt-6 px-4 flex absolute inset-x-0 top-0">
      <a class="flex" href="/dashboard/{state.user}">
        <img src="icons/arrow-left.svg" alt="Arrow Left">
        <span class="ml-2">Назад</span>
      </a>
    </div>

    <div class="pt-16">

      { #each users as user }

        <div class="p-6 bg-red-500">
          USER: {user.username}
          Loyalty: {user.loyalty}
          discord: {user.discord}
          id: {user._id}
        </div>

      { /each }
    </div>
  </div>

</div>