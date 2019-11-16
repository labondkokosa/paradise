<script>
  function partyPopper(selector) {
    const colors = [
      '#bea4ff',
      '#feb535',
      '#ff6e83',
      '#58cafe',
    ]

    const flight = {
      isSwirl: true,
      swirlSize: 'rand(10, 20)',
      swirlFrequency: 'rand(1, 3)',
      direction: [-1, 1],
      degreeShift: 'rand(-15, 15)',
      duration: 1200,
      easing: 'cubic.out',
      pathScale: 'stagger(.2)',
    }

    // Confetti shapes
    const torsade = {
      shape: 'zigzag',
      points: 'rand(4, 6)',
      radius: 40,
      radiusY: 30,
      strokeLinecap: 'round',
      strokeWidth: 8,
      fill: 'none',
      stroke: colors,
      angle: {0: 'rand(-720, 720)'},
      ...flight,
    }

    const bent = {
      shape: 'curve',
      radius: 'rand(25, 35)',
      radiusY: 15,
      strokeLinecap: 'round',
      strokeWidth: 8,
      fill: 'none',
      stroke: colors,
      angle: {0: 'rand(-720, 720)'},
      ...flight,
    }

    const flake = {
      shape:'circle',
      radius: 'rand(5, 10)',
      fill: colors,
      ...flight,
    }

    // Bursts
    const burst = {
      parent: selector,
      radius: {0 : 'rand(50, 100)'},
      count: 'rand(18, 22)',
      degree: 30,
    }

    const torsadeBurst = new mojs.Burst({
      ...burst,
      children: {
        ...torsade,
      }
    });

    const bentBurst = new mojs.Burst({
      ...burst,
      children: {
        ...bent,
      }
    });

    const flakeBurst = new mojs.Burst({
      ...burst,
      children: {
        ...flake,
      }
    });

    // Timeline (debug only)
    torsadeBurst.play()
    bentBurst.play()
    flakeBurst.play()
  };

  partyPopper('.party-popper');
</script>

<div style="width: 500px; height: 500px;" class="party-popper bg-green-500"></div>