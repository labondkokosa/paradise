<svelte:head>
  <title>Paradise Client Dashboard</title>
</svelte:head>

<div class="w-full h-full pt-20">
  <div style="overflow-x: scroll; overflow-y: hidden; height: 35%;" class="w-full md:my-6 relative">

    <div style="width: 200%;" class="absolute flex justify-center items-center">
      <div class="hover:shadow-xl rounded-lg w-3/12 px-6 py-4 flex flex-col justify-center text-center items-center text-xl">
        <img class="mb-4" style="width: 54px;" src="icons/plus-math.png" alt="Add service">
        Добавить сервис
      </div>

      <div class="mx-6 rounded-lg w-3/12 shadow hover:shadow-xl px-6 py-4 flex flex-col justify-center text-center items-center text-xl">
        <img style="width: 45px;" src="icons/people.png" alt="Civilian Archive Logo">
        Список жителей
        <p class="text-gray-700 text-sm">А вот тут вы сможете найти список всех жителей.</p>
      
        <a class="text-base" href="/dashboard/users">Перейти</a>
      </div>

      <div class="mx-6 rounded-lg w-3/12 shadow hover:shadow-xl px-6 py-4 flex flex-col justify-center text-center items-center text-xl">
        <img style="width: 45px;" src="icons/police-badge.png" alt="Police Archive Logo">
        Полицейский Архив
        <p class="text-gray-700 text-sm">Тут вы можете найти всех преступников!</p>
      
        <a class="text-base" href="/dashboard/police">Перейти</a>
      </div>

      <div class="mx-6 rounded-lg w-3/12 shadow hover:shadow-xl px-6 py-4 flex flex-col justify-center text-center items-center text-xl">
        <img style="width: 45px;" src="icons/new-contact.png" alt="Passport Archive">
        Паспорта
        <p class="text-gray-700 text-sm">Паспорта, паспорта и ещё раз паспорта!</p>
      
        <a class="text-base" href="/dashboard/passport">Перейти</a>
      </div>

      <div class="mx-6 rounded-lg w-3/12 shadow hover:shadow-xl px-6 py-4 flex flex-col justify-center text-center items-center text-xl">
        <img style="width: 45px;" src="icons/cloud.png" alt="Project cloud">
        Проекты
        <p class="text-gray-700 text-sm">Архив всех исходных кодов наших проектов.</p>
      
        <a class="text-base" href="/dashboard/cloud">Перейти</a>
      </div>

      <div class="mx-6 rounded-lg w-3/12 shadow hover:shadow-xl px-6 py-4 flex flex-col justify-center text-center items-center text-xl">
        <img style="width: 45px;" src="icons/cloud.png" alt="Project cloud">
        Скоро...
        <p class="text-gray-700 text-sm">Тут скоро что-то будет... Надеемся на это, господа</p>
    
      </div>

      <div class="mx-6 rounded-lg w-3/12 shadow hover:shadow-xl px-6 py-4 flex flex-col justify-center text-center items-center text-xl">
        <img style="width: 45px;" src="icons/cloud.png" alt="Project cloud">
        Скоро...
        <p class="text-gray-700 text-sm">Тут тоже что-то будет</p>
      </div>

      <div class="mx-6 rounded-lg w-3/12 shadow hover:shadow-xl px-6 py-4 flex flex-col justify-center text-center items-center text-xl">
        <img style="width: 45px;" src="icons/cloud.png" alt="Project cloud">
        Скоро...
        <p class="text-gray-700 text-sm">И тут да</p>
      </div>
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