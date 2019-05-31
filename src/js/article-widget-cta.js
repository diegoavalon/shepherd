import 'whatwg-fetch';

export default () => {
	const target = document.querySelector('#main > article > section');
	const testEl = document.createElement('div');

	const buildTemplate = () => `
	<style>
	.container-fluid:after,.container-fluid:before,.container:after,.container:before,.row:after,.row:before{content:" ";display:table}.container-fluid:after,.container:after,.row:after{clear:both}.comp-cta-wrapper{margin-bottom:48px;margin-left:-20px;margin-right:-20px;padding:16px 35px 20px;border-top:1px solid #dbdbdb;border-bottom:1px solid #dbdbdb;background-color:#fcfcfc;text-align:center}.comp-cta-wrapper .form-field{margin-bottom:10px}.comp-cta-wrapper .input-field{width:120px}.comp-cta-wrapper .current-pricing{font-family:proxima,Helvetica,Arial,sans-serif;font-size:20px;line-height:140%}.comp-cta-wrapper .cta-paragraph{font-size:18px;padding:0 15px;margin-bottom:20px}.comp-cta-wrapper .non-ifp-img{margin:20px 0}.comp-cta-wrapper .starting-price{margin-top:12px;padding-top:.5em;padding-bottom:.8em;color:#85b23f;font-family:din,Helvetica,Arial,sans-serif}.comp-cta-wrapper .starting-price .price{margin-bottom:0;margin-left:-5px;display:inline-block;line-height:.9em;font-size:54px;font-weight:700}.comp-cta-wrapper .starting-price .price.right-side-price{margin-top:0}.comp-cta-wrapper .starting-price .sub-text{margin-bottom:14px;font-size:18px;font-family:proxima,Helvetica,Arial,sans-serif;line-height:140%}.comp-cta-wrapper .zip-code-wrap{min-width:128px}.comp-cta-wrapper .frm-zip-code-label{margin-bottom:5px;text-align:center}@media (min-width:480px) and (max-width:1025px){.comp-cta-wrapper{padding:22px 35px 28px}.comp-cta-wrapper .current-pricing{font-size:28px}.comp-cta-wrapper .price{margin-left:-10px;font-size:80px}.comp-cta-wrapper .form-field{margin-bottom:15px}.comp-cta-wrapper .cta-paragraph{font-size:22px}.comp-cta-wrapper button.btn.btn-primary{display:block;margin:auto}}@media (min-width:1025px){.comp-cta-wrapper{margin-left:auto;margin-right:auto;padding:22px 35px 28px;border-left:1px solid #dbdbdb;border-right:1px solid #dbdbdb}.comp-cta-wrapper .current-pricing{font-size:20px}.current-pricing.right-side-heading{margin-top:0}}.right-side-comp-wrapper{padding-bottom:0}.right-side-wrap{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding-bottom:0}.right-side-zip{margin-right:15px}.right-side-btn{margin-top:-10px}@media (max-width:543px){.right-side-wrap{display:block;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding-bottom:0}}
	</style>
	<section class="comp-cta-wrapper right-side-comp-wrapper">
		<header>
			<h3 class="current-pricing right-side-heading">Find plans on eHealth starting at</h3>
		</header>
		<form class="zip-code-wrap" data-form-processed="true" id="censusForm">
			<fieldset class="form-field-container">
				<div class="right-side-wrap">
					<div class="starting-price right-side-price-wrap" id="lowestPrice">
						<svg height="48px" id="L9" version="1.1" viewbox="0 0 100 100" width="48px" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
							<path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" fill="#74a632" transform="rotate(135.633 50 50)">
								<animatetransform attributename="transform" attributetype="XML" dur="1s" from="0 50 50" repeatcount="indefinite" to="360 50 50" type="rotate"></animatetransform>
							</path>
						</svg>
					</div>
					<div class="form-field right-side-zip">
						<input class="input-field" id="zipCode" maxlength="5" name="zip-code" placeholder="Zip Code" size="5" tabindex="1" type="tel">
					</div>
					<div class="right-side-btn">
						<button class="btn btn-primary" data-wa-link="fea-dynamic cta_find_plans" id="btn-get-quote">Get local prices</button>
					</div>
				</div>
			</fieldset>
		</form>
	</section>
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