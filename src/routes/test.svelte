<script>
  // import Cropper from 'cropperjs';
  import { onMount } from "svelte"

  onMount(async () => {

    const image = document.getElementById('image');

    console.log(image);
    const cropper = new Cropper(image, {
      checkCrossOrigin: false,
      aspectRatio: 1,
      viewMode: 1,
      crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      },
    });
  })
</script>

<div class="w-full absolute mt-24">
  IMAGE:
  <img id="image" src="https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="Image">

  <button id="crop">
    CROP
  </button>
</div>