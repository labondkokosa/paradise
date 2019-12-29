<svelte:head>
  <title>Paradise Client Dashboard</title>
</svelte:head>

<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`/dashboard/api/services`);
		const data = await res.json();
		if (res.status === 200) {
			return { services: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
  import Spinner from "../../components/Spinner.svelte";

  export let services;
</script>

<div class="w-full h-full pt-20">
  <div style="overflow-x: scroll; overflow-y: hidden; height: 35%;" class="w-full md:my-6 relative">

    <div style="width: {100 + (services.size * 10)}%;" class="absolute flex justify-center items-center">
      <div class="hover:shadow-xl rounded-lg w-3/12 px-6 py-4 flex flex-col justify-center text-center items-center text-xl">
        <img class="mb-4" style="width: 54px;" src="icons/plus-math.png" alt="Add service">
        Добавить сервис
        <p class="text-sm text-gray-700">Кол-во работающих сервисов: {services.size}</p>
      </div>

      { #each services.list as service }

        <div class="relative mx-6 rounded-lg w-3/12 shadow hover:shadow-xl px-6 py-4 flex flex-col justify-center text-center items-center text-xl">
          <img style="width: 45px;" src="icons/{service.icon}" alt="Service Logo">
          {service.name}
          <p class="text-gray-700 text-sm">{service.description}</p>
      
          <!-- Иконка загрузки -->
          <div style="width: 100%; height: 100%; z-index: 2; background-color:rgba(0, 0, 0, 0.3);" class="rounded-lg spinner hidden absolute flex flex-col justify-center items-center">
            <Spinner />
          </div>
          <!-- / -->

          <a on:click={(event) => {
            let node = event.target.parentNode;
            let spinner = node.getElementsByClassName("spinner");
            spinner[0].classList.remove("hidden");
          }} class="text-base" href="/dashboard/{service.link}">Перейти</a>
        </div>

      { /each }
    </div>
  </div>
</div>

<!-- <svelte:head>
  <title>Paradise Client Dashboard</title>
</svelte:head>

<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/dashboard/client/${params.user}`);

    if (res.status == 200) {
      const user = await res.json();
      return { user };
    }

    this.error(500, `Ошибка сервера.`)
  }
</script>

<script>
  export let user;

  if (user.error != null) {
    window.location.href = "/dashboard/client";
  }
</script>

<div class="w-full h-screen absolute pt-12">
  
  <section style="overflow: scroll" class="flex w-full md:flex-col md:w-3/12">
    <a class="flex" href="/dashboard/police/{user.id}">
      <img class="mr-4" src="icons/archive.svg" alt="Police Archive">
      Полицейский архив
    </a>
  </section>

</div> -->