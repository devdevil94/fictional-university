import $ from 'jquery';

class Search{

	constructor(){
		this.addSearchHTML();
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

		$.getJSON(uniData.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val(),
			(results)=>{
				this.resultDiv.html(`
					<div class="row">
						<div class="one-third">
							<h2 class="search-overlay__section">General Information</h2>
							${results.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No general information matches this</p>'}
			 				${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.type=='post'? `by ${item.authorName}`: ''}</li>`).join('')}
							${results.generalInfo.length ? '</ul>' : ''}
						</div>
						<div class="one-third">
							<h2 class="search-overlay__section">Programs</h2>
							${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match this. <a href="${uniData.root_url}/programs">View all programs</a></p>`}
			 				${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}
							${results.programs.length ? '</ul>' : ''}

							<h2 class="search-overlay__section">Professors</h2>
							${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors match this.</p>`}
			 				${results.professors.map(item => `
								<li class="professor-card__list-item">
						            <a class="professor-card" href="${item.permalink}">
						              <img src="${item.img}" class="professor-card__image">
						              <span class="professor-card__name">${item.title}</span>
						            </a>
						         </li>
			 				`).join('')}
							${results.professors.length ? '</ul>' : ''}
						</div>
						<div class="one-third">
							<h2 class="search-overlay__section">Campuses</h2>
							${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match this. <a href="${uniData.root_url}/campuses">View all campuses</a></p>`}
			 				${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}
							${results.campuses.length ? '</ul>' : ''}
							<h2 class="search-overlay__section">Events</h2>
						</div>
					</div>
				`);

				this.isSpinnerVisible = false;
			}
		);
	}

	typingLogic(){
		if (this.searchField.val() != this.prevValue) {
			clearTimeout(this.typingTimer);
			if(this.searchField.val()){
				if(!this.isSpinnerVisible){
					this.resultDiv.html('<div class="spinner-loader"></div>');
					this.isSpinnerVisible = true;
				}
				this.typingTimer = setTimeout(this.getResults.bind(this), 750);
			}else{
				this.resultDiv.html('');
				this.isSpinnerVisible = false;
			}
		}

		this.prevValue = this.searchField.val();
	}

	openOverlay(){
		this.searchOverlay.addClass("search-overlay--active");
		$("body").addClass("body-no-scroll");
		this.searchField.val('');
		setTimeout(() => this.searchField.focus(), 301);
		this.isOverlayOpen = true;
	}

	closeOverlay(){
		this.searchOverlay.removeClass("search-overlay--active");
		this.isOverlayOpen = false;
		$("body").removeClass("body-no-scroll");
	}

	keyPressDispatcher(e){
		if(e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus'))
			this.openOverlay();
		else if (e.keyCode == 27 && this.isOverlayOpen)
			this.closeOverlay();
	}

	addSearchHTML(){
		$("body").append(`
			<div class="search-overlay">
			    <div class="search-overlay__top">
			      <div class="container">
			        <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
			        <input type="text" class="search-term" id="search-term" placeholder="What are you looking for? ">
			        <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
			      </div>
			    </div>

			    <div class="container">
			      <div id="search-overlay__result"></div>
			    </div>
			</div>
		`);
	}

}

export default Search;