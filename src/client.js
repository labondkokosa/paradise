import * as sapper from '@sapper/app';

sapper.prefetch('/rules');
sapper.start({
	target: document.querySelector('#sapper')
});