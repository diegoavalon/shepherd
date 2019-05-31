import 'whatwg-fetch';

export default () => {
	const existingSidebarWidget = document.querySelector('.comp-cta-wrapper');
	if (existingSidebarWidget) {
		existingSidebarWidget.parentNode.removeChild(existingSidebarWidget);
	}

	const target = document.querySelector('#content > aside');
	const testEl = document.createElement('section');
	testEl.classList.add('comp-cta-wrapper');

	const buildTemplate = () => `
		<header>
			<h3 class="current-pricing">Find plans on eHealth starting at</h3>
		</header>
		<div class="starting-price" id="lowestPrice">
			<svg height="48px" id="L9" version="1.1" viewbox="0 0 100 100" width="48px" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
				<path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" fill="#74a632" transform="rotate(135.633 50 50)">
					<animatetransform attributename="transform" attributetype="XML" dur="1s" from="0 50 50" repeatcount="indefinite" to="360 50 50" type="rotate"></animatetransform>
				</path>
			</svg>
		</div>
		<form class="zip-code-wrap" id="censusForm">
			<fieldset class="form-field-container">
				<div class="form-field">
					<p class="frm-zip-code-label">Zip Code</p>
					<input class="input-field" id="zipCode" maxlength="5" name="zip-code" size="5" tabindex="1" type="tel">
				</div>
				<button class="btn btn-primary" data-wa-link="fea-dynamic cta_find_plans" id="btn-get-quote">Get local prices</button>
			</fieldset>
		</form>
	`;

	const render = () => {
		testEl.innerHTML = buildTemplate();
		target.insertBefore(testEl, target.firstChild);
		return;
	};

	render();

	const data = {};

	fetch('/ehi/ifp/individual-family-health-insurance!refreshContent')
		.then((res) => res.json())
		.then((json) => {
			data.lowestPrice = json.lowestPrice;
			lowestPriceEl.innerHTML = `
				<p class="price right-side-price">$</p>
				<p class="price right-side-price" id="lowest-price">${data.lowestPrice ? data.lowestPrice : '104'}</p>
				<p class="sub-text">per month</p>
			`;
			return;
		});

	const lowestPriceEl = document.querySelector('#lowestPrice');
	const form = document.getElementById('censusForm');
	const zipCodeInput = document.querySelector('#zipCode');
	const redirectUrl = 'https://www.ehealthinsurance.com/small-business-health-insurance/group-health-insurance-plans';

	zipCodeInput.focus();

	function validateZipCode(value) {
		return /^\d{5}(?:[-\s]\d{4})?$/.test(value);
	}

	function submitToCensus(e) {
		const userInputtedValue = zipCodeInput.value;
		const isValidZipCode = validateZipCode(userInputtedValue);

		e.preventDefault();

		if (isValidZipCode) {
			window.location.href = `${redirectUrl  }?zipCode=${  userInputtedValue}`;
			return false;
		}

		window.location.href = redirectUrl;
		return false;
	}

	form.addEventListener('submit', submitToCensus, false);
};