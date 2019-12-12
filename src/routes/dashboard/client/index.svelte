<svelte:head>
  <title>Paradise Dashboard login</title>
</svelte:head>

<script>

  import { goto } from '@sapper/app';
  import { onMount } from "svelte";

  import Spinner from "../../../components/Spinner.svelte";

  let state = {
    loading: true,
    error: null,
    username: null,
    avatar: "https://cdn.dribbble.com/users/882281/screenshots/2927545/ipad_portrait.png"
  };

  onMount(async () => {
    // Проверяем, вошёл ли пользователь или нет...
    let username = Cookies.get('paradise_key');
    let uuk = Cookies.get('paradise_uuk');

    // Имя пользователя установленно:
    if (username) {
      state.username = username;
    }
    // Берём данные пользователя с базы данных:
    fetch(`/dashboard/client/${username}`)
    .then((data) => {
      if (data.status == 404) {
        if (!uuk) {
          Cookies.remove('paradise_key');
          Cookies.remove('paradise_uuk');
        }

        state.username = null;
        state.loading = false;
      } else {
        data.json()
        .then((data) => {
          if (data.avatar) {
            state.avatar = data.avatar;
          }
          setTimeout(() => {
            state.loading = false;
          }, 500);
        })
      }
    })

    // UUK установлен:
    if (uuk) {
      // Проверяем UUK на валидность
      fetch(`/dashboard/api/${uuk}`)
      .then((data) => {
        if (data.status != 404) {
          data.json()
          .then((data) => {
            Cookies.set('paradise_key', data.user.key);
            goto(`/dashboard/${data.user.key}`);
          })
        }
      })
    }
  })

  function logout() {
    Cookies.remove("paradise_key");
    Cookies.remove("paradise_uuk");

    goto("/dashboard/logout");
  }

  async function login() {
    let username = state.username || document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username == "" || username == null || password == "" || password == null) {
      state.error = "\\Fields";
    } else {
      const res = await fetch(`/dashboard/client/${username}`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password,
          type: "login"
        })
      });
      res.json()
      .then((data) => {
        if (data.error) {
          state.error = data.error;
        } else {
          // setting up session cookies and so on
          Cookies.set('paradise_key', data.key, { expires: 365 });
          Cookies.set('paradise_uuk', data.uuk, { expires: 7 });

          // Redirect client to dashboard
          goto(`/dashboard/${username}`);
        }
      })
    }
  }

</script>

<div class="w-full flex justify-center items-center absolute">

  <div class="w-full md:w-3/6 md:shadow-xl md:rounded relative">

    { #if state.loading }

      <div style="z-index: 2;" class="w-full h-full absolute bg-white flex flex-col justify-center items-center">
				<Spinner />
			</div>

    { /if }

    <div class="p-6">
      <p class="w-full mb-4 flex justify-center text-xl">Войти в панель управления</p>
      <p class="text-gray-700 text-sm">🏡 Если вы находитесь в каких-то организациях, то вы должны были получить специальный код, с помощью которого теперь вы можете зайти в эту панель управления.</p>
      
      <div class="pt-6 pb-6 flex flex-col">
        <div class="flex flex-col justify-center md:flex-row md:justify-start">
          
          <!-- РАЗВИЛКА: 
            1. Имя пользователя сохранилось в базе данных,
              но его uuk уже не сохранился
            2. Ни того ни того не сохранилось. Пользователь нам
              неизвестен
          -->
          
          { #if state.username }
            <div class="w-full flex flex-col justify-center text-center">
              <img style="display:block; margin: 0 auto; background-position: top center; background-size: cover; height: 100px; width: 100px; border-radius: 50%; background-image: url('{state.avatar}');" alt="">
              <p>Впишите пароль для входа в аккаунт <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{state.username}</span></p>

              <div class="pt-6 flex flex-row">
                <input class="mx-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Пароль">

                <button on:click={login} class="mr-6 flex w-auto text-sm items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 border border-gray-400 rounded">
                  <img src="icons/key.svg" alt="Login icon" class="pr-4" /> <p class="pr-6">Войти</p>
                </button>

                <button on:click={logout} class="flex w-auto text-sm items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 border border-gray-400 rounded">
                  <img src="icons/log-out.svg" alt="Log out icon" class="pr-4" /> <p class="pr-6">Выйти</p>
                </button>
              </div>
            </div>
          { :else }

            <input class="mx-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="username" placeholder="Код">
            <input class="mx-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Пароль">

            <button on:click={login} class="flex w-auto text-sm items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 border border-gray-400 rounded">
              <img src="icons/key.svg" alt="Login icon" class="pr-4" /> <p class="pr-6">Войти</p>
            </button>

          { /if }
        </div>
      </div>

      <div class="w-full flex flex-col justify-center">
        { #if state.error }
        <div class="p-2 items-center leading-none lg:rounded-full flex lg:inline-flex">
          <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs mr-3">Error</span>
          <span class="mr-2 text-left flex-auto">
            { #if state.error == "\\Password" }
              Неправильный пароль. Попробуйте ещё раз
            { :else if state.error == "\\NotFound" }
              Пользователь с таким именем/ключом не был найден.
            { :else if state.error == "\\Fields" }
              Вам нужно заполнить все поля что бы продолжить.
            { :else }
              Произошла неожиданная ошибка. Обратитесь к Администрации.
            { /if }
          </span>
        </div>
        { /if }
      </div>
    </div>
  </div>

</div>