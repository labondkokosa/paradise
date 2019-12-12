<svelte:head>
	<link rel="apple-touch-icon" sizes="57x57" href="icons/popper/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="icons/popper/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="icons/popper/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="icons/popper/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="icons/popper/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="icons/popper/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="icons/popper/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="icons/popper/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="icons/popper/apple-icon-180x180.png">
	
	<link rel="icon" type="image/png" sizes="192x192"  href="icons/popper/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="icons/popper/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="icons/popper/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="icons/popper/favicon-16x16.png">

	<meta name="msapplication-TileImage" content="icons/popper/ms-icon-144x144.png">

	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
</svelte:head>

<script>
	import Arrow from "../components/Arrow.svelte";
	import Logo from "../components/icons/Logo.svelte";
	import Spinner from "../components/Spinner.svelte";

	import { onMount } from 'svelte';
	import { goto } from "@sapper/app";

	let status = {
		loaded: false,
		number: -1,
		players: 0,
	};

	let user = {
		key: null,
		name: null,
		avatar: "https://cdn.dribbble.com/users/882281/screenshots/2927545/ipad_portrait.png",
		loading: true
	};

	function logout() {
		// Cookies.remove('paradise_key');
		Cookies.remove('paradise_uuk');

		user.key = null;
		user.name = null;

		goto("/dashboard/client");
	}

	onMount(() => {
		status.loaded = true;

		// Обновляем статус сервера..
		async function update() {
			let username = Cookies.get('paradise_key');
			let uuk = Cookies.get('paradise_uuk');

			if (username && uuk) {
				if (!user.name) {
					// Берём аватарку пользователя...
					fetch(`/dashboard/client/${username}`)
					.then((data) => {
						if (data.status != 404) {
							data.json()
							.then((data) => {
								user.key = data.key;
								user.name = data.username;
								user.avatar = data.avatar;

								// Проверяем, загрузилась ли картинка...
								setTimeout(() => {
									user.loading = false;
								}, 500)
							})
						}
					})
				}
			} else {
				user.key = null;
				user.name = null;
				user.loading = true;
			}

			const get = await fetch(`/api/status`);
			let res = await get.json();

			switch (res.status.online) {
				case true:
					status.number = 2
					status.players = res.status.players;
					break;
				
				case false:
					status.number = 0
					break;
			
				default:
					status.number = -1;
					break;
			}
		}
		update();
		setInterval(update, 2000);
	})
</script>

<main>
	<div style="width: 100%; height: 100vh;">
		<!-- 
			SPINNER (LOADER)
		 -->
		{ #if !status.loaded } 
			<div style="width: 100%; height: 100vh; z-index: 2;" class="absolute bg-white flex flex-col justify-center items-center">
				<Spinner />
			</div>
		{ /if }
		<!-- <#HEADER> -->
		<div style="z-index: 1;" class="p-6 lg:p-4 shadow-xl w-full bg-white flex justify-center items-center relative">
			<div class="absolute inset-y-0 left-0 flex items-center ml-12">
				<a href="/">
					<Logo />
				</a>

				<span style="font-size: 0.8em;" class="hidden md:block ml-6 px-4 py-2">
					{ #if status.number == -1 }
						<p>❓ Ожидание</p>
					{ :else if status.number == 0 }
						<p>❌ Выключено</p>
					{ :else if status.number == 1 }
						<p>⭕ Подготовка</p>
					{ :else if status.number == 2 }
						<p>🥳 Работает <span class="">(Игроков: {status.players})</span></p>
					{ /if }
				</span>

			</div>
			<div>
				<div id="list" class="hidden lg:flex items-center">
					<style>
						#list a {
							font-size: 0.8em;
							margin: 0px 16px;
						}

						#list svg {
							width: 18px;
						}
					</style>
					<a href="/universe">
						Описание вселенной
					</a>

					<a href="/rules">
						Правила
					</a>

					<a href="/dashboard">
					  🎉 Дашборд
					</a>
				</div>
			</div>
			<div class="absolute inset-y-0 right-0 flex items-center mr-12">
				<button class="hidden md:block" on:click>
					<img src="icons/moon.svg" alt="Change color scheme" />
				</button>
				<a class="hidden md:block mx-6" href="https://discord.gg/fcMVANk">
					<img src="icons/chat.svg" alt="Our Discord Server">
				</a>

				{ #if user.name }

					<div class="relative flex items-center">
				
						<!-- Загрузка... -->
						{ #if user.loading }
							<div style="z-index: 2;" class="w-full h-full absolute bg-white flex flex-col justify-center items-center">
								<Spinner size="20" />
							</div>
						{ /if }

						<a class="flex" href="/dashboard/{user.key}">
							<img id="avatar" style="display:block; margin: 0 auto; background-position: top center; background-size: cover; height: 40px; width: 40px; border-radius: 50%; background-image: url('{user.avatar}');" alt="">
						</a>
						<a class="hidden md:block" href="/dashboard/{user.key}"><p class="ml-4 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{user.name}</p></a>
					
						<button class="hidden md:block" on:click={logout}>
							<img src="icons/log-out.svg" alt="Logout button">
						</button>
					</div>

				{ :else }
					<a href="/dashboard/client">
						<img src="icons/key.svg" alt="Dashboard login button" >
					</a>
				{ /if }
			</div>
		</div>
		<!-- </HEADER> -->

		<!-- <#MAIN CONTENT> -->
		<div style="width: 100%; height: 100vh;" class="absolute top-0 left-0 flex items-center">
			<slot></slot>
		</div>
		<!-- </MAIN CONTENT> -->
	</div>
</main>