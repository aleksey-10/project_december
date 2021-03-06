// carousel

let imgs ={
	current: 0,
	arr: [img0, img1, img2, img3],
	circles: [],
	delay: 3000,

	addClass() {
		this.arr[this.current].classList.add("appear");
		this.circles[this.current].classList.add("current-circle");
	},

	deleteClass(){
		this.arr[this.current].classList.toggle("appear", false);
		this.circles[this.current].classList.toggle("current-circle", false);
	},

	stepNext() {
		this.deleteClass();

		if (this.current == this.arr.length-1) {

			this.arr[0].classList.add("appear");
			this.circles[0].classList.add("current-circle");

			this.current = 0;

			return this;
		}

		this.arr[this.current + 1].classList.add("appear");
		this.circles[this.current + 1].classList.add("current-circle");
		
		this.current++;

		return this; 
	}, 
	
	stepPrev() {
		this.deleteClass();

		if (this.current == 0) {
			this.arr[this.arr.length-1].classList.add("appear");
			this.circles[this.arr.length-1].classList.add("current-circle");

			this.current = this.arr.length-1;
			return this;
		}

		this.arr[this.current - 1].classList.add("appear");
		this.circles[this.current - 1].classList.add("current-circle");

		this.current--;

		return this;
	},

	setByCircle (current) {
		this.deleteClass();

		this.current = current;

		for (let key of this.arr) {
			key.classList.toggle("appear", false); 
		};

		for(let key of this.circles){
			key.classList.toggle("current-circle", false);
		}

		this.addClass();

		timer(false);
		return this;
	},

	swapByAngle(side) {
		(side) ? imgs.stepNext() : imgs.stepPrev();
		timer(false);
	},

	setTimer() {
		function set (obj) {
			return setTimeout( function loop(){
				obj.stepNext();
				setTimeout( loop, obj.delay);		
			}, obj.delay );
		}

		let timerId = set(this);

		return function(swt = true) {
			return (swt) ? 1 : clearTimeout(timerId);
		}
	}
};

for (let i = 0; i < imgs.arr.length; i++){
	let circle = document.createElement("button");
	circle.className = "circle";
	document.querySelector('.circles').append( circle );
	imgs.circles.push( circle );

	imgs.circles[i].onclick = () => imgs.setByCircle(i);
}


imgs.addClass();

let timer = imgs.setTimer();
timer();


document.querySelector(".fa-angle-right").onclick = () => imgs.swapByAngle(true);
document.querySelector(".fa-angle-left").onclick = () => imgs.swapByAngle(false);


// print arg

function print (...args) {
	let arr = [];

	for(let i = 0; i < args.length; i++) {
		arr[i] = document.createElement('p');
		arr[i].innerText = args[i];
		task.append(arr[i]);
	}
}