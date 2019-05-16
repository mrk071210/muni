export function debounce(fn, wait=1000) {    
    let timer = null
	return function(){
		clearTimeout(timer);
		timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
        }, wait);
	}
}