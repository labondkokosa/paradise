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

    <div class="pt-6 flex absolute inset-x-0 top-0 justify-center items-center">
      <a class="px-4 pt-6 items-center flex absolute inset-y-0 left-0" href="/dashboard/{state.user}">
        <img src="icons/arrow-left.svg" alt="Arrow Left">
        <span class="ml-2">Назад</span>
      </a>

      <div class="flex">
        <a href="/dashboard/users" class="flex mx-6">
          <img src="icons/plus.svg" alt="Add user button">
          <span class="px-2">Добавить жителя</span>
        </a>
      </div>
    </div>

    <div class="pt-16 flex">

      { #each users as user }

        <div class="flex-grow mx-6 py-4 relative flex shadow rounded hover:shadow-lg items-center">
          
          <div class="ml-12 flex items-center">
            <img style="width: 40px; height: 40px;" src="https://minotar.net/avatar/{user.username}/40" alt="user avatar">
            <span class="ml-4">
              <p class="text-xl">{user.username}</p>
              <p class="text-sm text-gray-700">Лояльность: {user.loyalty}</p>
            </span>
          </div>

          <div class="flex absolute inset-y-0 right-0 h-full items-center pr-12">
            <!-- EDIT BUTTON -->
            <a class="mx-6" href="/dashboard/users">
              <img src="icons/edit-3.svg" alt="Edit button">
            </a>

            <!-- DELETE BUTTON -->
            <a href="/dashboard/users">
              <img src="icons/trash-2.svg" alt="Delete button">
            </a>
          </div>
        </div>

      { /each }
    </div>
  </div>

</div>