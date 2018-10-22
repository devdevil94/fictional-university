import $ from 'jquery';

class Search{

	constructor(){
		this.resultDiv = $("#search-overlay__result");
		this.openButton = $(".js-search-trigger");
		this.closeButton = $(".search-overlay__close");
		this.searchOverlay = $(".search-overlay");
		this.searchField = $("#search-term");
		this.isOverlayOpen = false;
		this.isSpinnerVisible = false;
		this.typingTimer;
		this.prevValue;
		this.events();
	}

	events(){
		this.openButton.on("click", this.openOverlay.bind(this));
		this.closeButton.on("click", this.closeOverlay.bind(this));

		$(document).on("keydown", this.keyPressDispatcher.bind(this));

		this.searchField.on("keyup", this.typingLogic.bind(this));
	}

	getResults(){
		$.getJSON(uniData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchField.val(), posts =>{this.resultDiv.html(`
			<h2 class="search-overlay__section">General Information</h2>
			${posts.length ? '<ul class="link-list min-list">' : '<p>No general information matches this</p>' }
			
			${posts.map(item => `<li><a href="${item.link}">${item.title.rendered}</a></li>`).join('')}
			
			${posts.length ? '</ul>' : ''}
			`);

			this.isSpinnerVisible = false;
		});	
	}

	typingLogic(){
		if (this.searchField.val() != this.prevValue) {
			clearTimeout(this.typingTimer);
			if(this.searchField.val()){
				if(!this.isSpinnerVisible){
					this.resultDiv.html('<div class="spinner-loader"></div>');
					this.isSpinnerVisible = true;
				}
				this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
			}else{
				this.resultDiv.html('');
				this.isSpinnerVisible = false;
			}
		}

		this.prevValue = this.searchField.val();
	}

	openOverlay(){
		this.searchOverlay.addClass("search-overlay--active");
		this.isOverlayOpen = true;
		$("body").addClass("body-no-scroll");

	}

	closeOverlay(){
		this.searchOverlay.removeClass("search-overlay--active");
		this.isOverlayOpen = false;
		$("body").removeClass("body-no-scroll");
	}

	keyPressDispatcher(e){
		console.log(e.keyCode);
		if(e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus'))
			this.openOverlay();
		else if (e.keyCode == 27 && this.isOverlayOpen)
			this.closeOverlay();
	}

}

export default Search;