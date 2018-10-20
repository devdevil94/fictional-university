import $ from 'jquery';

class Search{

	constructor(){
		this.openButton = $(".js-search-trigger");
		this.closeButton = $(".search-overlay__close");
		this.searchOverlay = $(".search-overlay");
		this.isOverlayOpen = false;

		this.events();
	}

	events(){
		this.openButton.on("click", this.openOverlay.bind(this));
		this.closeButton.on("click", this.closeOverlay.bind(this));

		$(document).on("keydown", this.keyPressDispatcher.bind(this));
	}

	openOverlay(){
		this.searchOverlay.addClass("search-overlay--active");
		this.isOverlayOpen = true;
		$("body").addClass("body-no-scroll");

	}

	closeOverlay(){
		this.searchOverlay.removeClass("search-overlay--active");
		thi.isOverlayOpen = false;
		$("body").removeClass("body-no-scroll");
	}

	keyPressDispatcher(e){
		console.log(e.keyCode);
		if(e.keyCode == 83 && !this.isOverlayOpen)
			this.openOverlay();
		else if (e.keyCode == 27 && this.isOverlayOpen)
			this.closeOverlay();
	}

}

export default Search;