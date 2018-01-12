function handleResponse(message) {
  console.log("background script sent a response:",message);
}
function handleError(error) {
  console.log("Error:",error);
}
const BROWS = browser;

const handleSelect = (e)=>{
	if (e.shiftKey) {
		let s = document.getSelection().toString();
		if (s) {
			console.log(BROWS);
			let sending = BROWS.runtime.sendMessage({text: s});
			sending.then(handleResponse, handleError);
			console.log(BROWS);
		}
	}
}
console.log("content",BROWS);
document.onkeydown = handleSelect;