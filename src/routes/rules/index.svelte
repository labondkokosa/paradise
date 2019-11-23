<script context="module">
  export async function preload() {
    const res = await this.fetch(`rules.json`);

    if (res.status == 200) {
      const rules = await res.json();
      return { rules };
    }

    this.error(500, `Ошибка сервера, невозможно получить список правил. (${res.statusText})`)
  }
</script>

<script>
  import Spinner from "../../components/Spinner.svelte";
  
  export let rules = {};
</script>

<svelte:head>
  <title>Paradise Rules</title>
</svelte:head>

<div style="width: 100%; height: 100vh; overflow-x: hidden; overflow-y: scroll;" class="p-2 md:p-6 md:pt-24 flex justify-center">
  <div class="md:w-4/6">
    <!-- Правила -->
    <section>
      <h1 class="text-2xl w-full text-center">Основные правила</h1>

      { #each rules as entry }
        <div class="max-w-sm rounded overflow-hidden shadow-lg my-12">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2"><span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{entry.number}</span> {entry.name}</div>
              
            { #if entry.category != null }
              <span class="inline-block text-sm font-semibold text-gray-700 mr-2">{entry.category}</span>  
            { /if }

            <p class="text-gray-700 text-base">
              {entry.description}
            </p> 
          </div>
          <div class="px-6 py-4">
            <p class="mb-2">Наказания:</p>
              
            { #each entry.punishment as p }
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{p}</span>  
            { /each }
          </div>
        </div>
      { /each }
    </section>
  </div>
</div>