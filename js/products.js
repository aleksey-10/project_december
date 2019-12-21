let $products = document.querySelector(".products");

for (let i = 0; i < $products.children.length; i++) {

	$products.children[i].onmouseover = function () {
		$products.children[i].lastElementChild.style.display = 'block';
	}

	$products.children[i].onmouseout = function () {
		$products.children[i].lastElementChild.style.display = 'none';
	}

}
