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

	let status = {
		loaded: false,
		updatable: true,
		number: -1
	};

	onMount(async () => {
		
		function websocket() {
			console.log('[PARADISE DEV] Connecting to websocket server...');
			let socket = new WebSocket("wss://paradise-ws-api.glitch.me/");

			socket.addEventListener('open', function(event) {
				status.updatable = true;
			});

			socket.addEventListener('message', function (event) {
				try {
					let data = JSON.parse(event.data);
					status.loaded = true;
					status.number = data.status;
				}
				catch(error) {
					if (error) console.log(error);
				}
			});
			
			socket.addEventListener('close', function (event) {
				status.updatable = false;

				console.log('[PARADISE DEV] Trying to reconnect to websocket server...');
				setTimeout(() => {websocket()}, 1000);
			});
		}

		websocket();
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
		{ :else }
			<!-- <#HEADER> -->
			<div style="z-index: 1;" class="p-6 lg:p-4 shadow-xl w-full bg-white flex justify-center items-center relative">
				<div class="absolute inset-y-0 left-0 flex items-center ml-12">
					<a href="/">
						<Logo />
					</a>

					<span style="font-size: 0.8em;" class="ml-6 px-4 py-2">
						{ #if status.number == -1 }
							<p>❓ ...{status.updatable ? "" : "~"}</p>
						{ :else if status.number == 0 }
							<p>❌ Выключено{status.updatable ? "" : "~"}</p>
						{ :else if status.number == 1 }
							<p>⭕ Подготовка{status.updatable ? "" : "~"}</p>
						{ :else if status.number == 2 }
							<p>🥳 Работает{status.updatable ? "" : "~"}</p>
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
					</div>
				</div>
				<div class="absolute inset-y-0 right-0 flex items-center mr-12">
					<button class="mx-6" on:click>
						<img src="icons/moon.svg" alt="Change color scheme" />
					</button>
					<a href="https://discord.gg/fcMVANk">
						<img src="icons/chat.svg" alt="Our Discord Server">
					</a>
				</div>
			</div>
			<!-- </HEADER> -->

			<!-- <#MAIN CONTENT> -->
			<div style="width: 100%; height: 100vh;" class="absolute top-auto left-0 mt-16 flex items-center md:top-0 md:mt-0">
				<slot></slot>
			</div>
			<!-- </MAIN CONTENT> -->
		{ /if }
	</div>
</main>