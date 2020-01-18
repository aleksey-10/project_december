// Page loading icon

window.addEventListener( 'load', function () {
	document.querySelector('.loading').hidden = true;	
	document.querySelector('.loaded').style.display = 'block';
})

// header

	// menu dropping

menuIcon.onclick = function () {
	let clicked = true;

	return () => {		
		(clicked) ? menuList.classList.add("menu-dropped") :  menuList.classList.remove("menu-dropped");
		return clicked = !clicked;	
	}
} ();



	// main block offset
// window.addEventListener('load', () => document.querySelector('header').classList.add('fixed-header'));

// window.addEventListener('load', () => document.querySelector('main').style.marginTop = document.querySelector('header').offsetHeight + 'px' );
// window.addEventListener('resize', () => document.querySelector('main').style.marginTop = document.querySelector('header').offsetHeight + 'px' );




// window resize task/carousel height setting

document.body.onresize = () =>	document.querySelector('#task').style.height = getComputedStyle(document.querySelector('.appear')).height; 
	


//products

let $products = document.querySelector(".products");

for (let i = 0; i < $products.children.length; i++) {

	$products.children[i].onmouseover = function () {
		$products.children[i].lastElementChild.style.display = 'block';
	}

	$products.children[i].onmouseout = function () {
		$products.children[i].lastElementChild.style.display = 'none';
	}

}
