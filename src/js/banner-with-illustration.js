import { _raf, isElInView } from "./utils/scrollHelpers";

export default () => {
    const bannerEl = document.createElement("div");

    bannerEl.innerHTML = `
		<style>
			.banner a,.banner h4,.banner h5{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}:root{--cubic-bezier:cubic-bezier(0.215,0.61,0.355,1);--orange:#f69234;--blue:#0099d6}@supports (--css:variables){@media only screen and (min-width:760px){body{--space-unit:1.25rem}}@media only screen and (min-width:1023px){body{--space-unit:1.5rem}}}.banner{font-family:proxima,sans-serif;line-height:1.5;font-size:17px}@media screen and (min-width:600px){.banner{font-size:calc(17px + 2*(100vw - 600px)/600)}}@media screen and (min-width:1200px){.banner{font-size:19px}}.banner{-webkit-overflow-scrolling:touch;-webkit-text-size-adjust:none;text-rendering:optimizeLegibility;word-wrap:break-word}.banner h4,.banner h5{clear:both;font-weight:600;line-height:1.1;margin:0}.banner h4{font-size:20px}@media screen and (min-width:514px){.banner h4{font-size:calc(20px + 5*(100vw - 514px)/306)}}@media screen and (min-width:820px){.banner h4{font-size:25px}}.banner h5{font-size:19px;font-size:1em}@media only screen and (min-width:600px){.banner h5{font-size:20px;font-size:1em}}.banner .button{display:inline-block;padding:0 16px;border-radius:5px;height:40px;line-height:40px;font-size:16px;font-weight:600;-webkit-font-smoothing:antialiased;-webkit-transition:.15s ease;-o-transition:.15s ease;transition:.15s ease;-webkit-transition-property:background-color border-color color;-o-transition-property:background-color border-color color;transition-property:background-color border-color color;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;background:var(--orange);color:#fff!important;border:0 solid rgba(0,0,0,0)}.banner .button-lg{font-size:18px;padding:0 24px;height:40px;line-height:40px}.banner .bg-orange{background-color:#f69234}.banner .font-normal{font-weight:400}.banner .Button,.banner .shadow-4dp{-webkit-box-shadow:0 4px 5px 0 rgba(33,33,33,.08),0 1px 10px 0 rgba(33,33,33,.08),0 2px 4px -1px rgba(33,33,33,.12);box-shadow:0 4px 5px 0 rgba(33,33,33,.08),0 1px 10px 0 rgba(33,33,33,.08),0 2px 4px -1px rgba(33,33,33,.12)}.banner .Button{display:inline-block;position:relative;top:0;left:0;border:0;border-radius:5px;letter-spacing:.03125rem;text-decoration:none;opacity:1;outline:0;-webkit-appearance:none;will-change:transform;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transition:-webkit-box-shadow .2s ease;transition:-webkit-box-shadow .2s ease;-o-transition:box-shadow .2s ease;transition:box-shadow .2s ease;transition:box-shadow .2s ease,-webkit-box-shadow .2s ease;cursor:pointer}.banner .Button:hover{-webkit-box-shadow:0 9px 12px 1px rgba(33,33,33,.08),0 3px 16px 2px rgba(33,33,33,.08),0 5px 6px -3px rgba(33,33,33,.12);box-shadow:0 9px 12px 1px rgba(33,33,33,.08),0 3px 16px 2px rgba(33,33,33,.08),0 5px 6px -3px rgba(33,33,33,.12)}.banner .container{position:relative;z-index:100;max-width:740px;margin-left:auto;margin-right:auto;padding:0 20px}@media screen and (min-width:580px){.banner .container{padding:0 50px}}.banner .container--wide{max-width:1000px}@-webkit-keyframes pulse-animation{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:0;-webkit-transform:scale(1.15);transform:scale(1.15)}to{opacity:0;-webkit-transform:scale(1.15);transform:scale(1.15)}}@keyframes pulse-animation{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:0;-webkit-transform:scale(1.15);transform:scale(1.15)}to{opacity:0;-webkit-transform:scale(1.15);transform:scale(1.15)}}.banner{position:fixed;bottom:0;left:0;width:100%;background:#0099d6;color:#fff;-webkit-box-shadow:0 -8px 10px 1px rgba(33,33,33,.08),0 -3px 14px 2px rgba(33,33,33,.08),0 -5px 5px -3px rgba(33,33,33,.12);box-shadow:0 -8px 10px 1px rgba(33,33,33,.08),0 -3px 14px 2px rgba(33,33,33,.08),0 -5px 5px -3px rgba(33,33,33,.12);padding:0;z-index:9999;transition:-webkit-transform .5s var(--cubic-bezier);-webkit-transition:-webkit-transform .5s var(--cubic-bezier);-o-transition:transform .5s var(--cubic-bezier);transition:transform .5s var(--cubic-bezier);transition:transform .5s var(--cubic-bezier),-webkit-transform .5s var(--cubic-bezier);-webkit-transform:translateY(110%);-ms-transform:translateY(110%);transform:translateY(110%)}.banner.is-active,.banner.is-active .banner__illustration{-webkit-transform:none;-ms-transform:none;transform:none}.banner.is-active .banner__illustration{opacity:1}.banner .container{max-width:1200px}.banner__illustration,.banner__spacer{display:none}.banner__center-text{text-align:center;padding-top:24px;padding-bottom:24px}.banner__center-text h4{margin-bottom:8px}.banner__cta{text-align:center;padding-bottom:28px}.banner .button{position:relative;white-space:nowrap}.banner .button:hover{color:#fff;-webkit-box-shadow:0 16px 24px 2px rgba(33,33,33,.08),0 6px 30px 5px rgba(33,33,33,.08),0 8px 10px -5px rgba(33,33,33,.12);box-shadow:0 16px 24px 2px rgba(33,33,33,.08),0 6px 30px 5px rgba(33,33,33,.08),0 8px 10px -5px rgba(33,33,33,.12)}.banner .button.pulse:after,.banner .button.pulse:before{content:"";display:block;position:absolute;width:100%;height:100%;top:0;left:0;background-color:inherit;border-radius:inherit;transition:opacity .3s,-webkit-transform .3s;-webkit-transition:opacity .3s,-webkit-transform .3s;-o-transition:opacity .3s,transform .3s;transition:opacity .3s,transform .3s;transition:opacity .3s,transform .3s,-webkit-transform .3s;-webkit-animation:pulse-animation 4s cubic-bezier(.24,0,.38,1) infinite;animation:pulse-animation 4s cubic-bezier(.24,0,.38,1) infinite;z-index:-1}.banner .button.pulse:after{-webkit-animation-delay:.08s;animation-delay:.08s}@media screen and (min-width:760px){.banner .container{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.banner__center-text{text-align:left;padding-right:40px}.banner__cta{padding-bottom:0}}@media screen and (min-width:1200px){.banner .container{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.banner__cta,.banner__spacer{min-width:180px}.banner__illustration,.banner__spacer{display:block}.banner__illustration{position:absolute;bottom:0;opacity:0;-webkit-transform:translateX(-60px);-ms-transform:translateX(-60px);transform:translateX(-60px);-webkit-transition:.5s all var(--cubic-bezier);-o-transition:.5s all var(--cubic-bezier);transition:.5s all var(--cubic-bezier)}.banner__center-text{text-align:center;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:24px 40px 28px}}
		</style>
		<section class="banner">
            <div class="container container--wide">
                <div class="banner__spacer"></div>
                <svg
                    class="banner__illustration"
                    width="180"
                    height="178"
                    viewBox="0 0 125 122"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" fill-rule="evenodd">
                        <path
                            fill="#FFF"
                            d="M118.18202 5.52025V1h5.50296v28.53252H125v3.79594h-1.31502v53.87896H125v3.79594h-1.31502V123H59.31425V91.00336H58v-3.79594h1.31425V33.32846H58v-3.79594h1.31425V1h5.50373v4.52025h53.36404"
                        />
                        <path
                            d="M112 28.30022c0 .38604-.3287.69978-.73481.69978-.40612 0-.73482-.31374-.73482-.69978V5.69978c0-.38604.3287-.69978.73482-.69978.40612 0 .73481.31374.73481.69978v22.60044zm-39.53037 0c0 .38604-.3287.69978-.73482.69978C71.3287 29 71 28.68626 71 28.30022V5.69978C71 5.31374 71.3287 5 71.73481 5c.40612 0 .73482.31374.73482.69978v22.60044zm6.58827-4.7799c0 .38676-.3287.7005-.73482.7005-.40612 0-.73481-.31374-.73481-.7005V5.69978c0-.38604.3287-.69978.73481-.69978.40612 0 .73482.31374.73482.69978v17.82054zm6.58826-2.83238c0 .38676-.32869.7005-.7348.7005-.40537 0-.73482-.31374-.73482-.7005V5.69978c0-.38604.32945-.69978.73481-.69978.40612 0 .73481.31374.73481.69978v14.98816zm6.58827-2.83237c0 .38676-.32869.69978-.73481.69978-.40536 0-.73481-.31302-.73481-.69978V5.69978c0-.38604.32945-.69978.73481-.69978.40612 0 .73481.31374.73481.69978v12.15579zm6.58827 2.83237c0 .38676-.32869.7005-.73405.7005-.40612 0-.73557-.31374-.73557-.7005V5.69978c0-.38604.32945-.69978.73557-.69978.40536 0 .73405.31374.73405.69978v14.98816zm6.58903 2.8331c0 .38676-.32945.69978-.73481.69978-.40612 0-.73482-.31302-.73482-.69978V5.69978c0-.38604.3287-.69978.73482-.69978.40536 0 .73481.31374.73481.69978v17.82126zM59 37h64v-2H59z"
                            fill="#a2d9f0"
                        />
                        <path fill="#a2d9f0" d="M59 92h64v-2H59z" />
                        <path
                            fill="#a2d9f0"
                            d="M90 55h6V42h-6zM71 55h6V42h-6zM108 83h6V70h-6zM90 83h6V70h-6zM71 83h6V70h-6zM108 119h6V99h-6zM71 119h25V99H71zM108 55h6V42h-6z"
                        />
                        <path
                            d="M71.99987 100.32654c.01093.91957-.67946 1.67346-1.4996 1.67346-.829 0-1.50027-.74782-1.50027-1.66966V96h2.99987v4.32654"
                            fill="#FFF"
                        />
                        <path
                            d="M74.99987 100.32654c.01093.91957-.6793 1.67346-1.49993 1.67346C72.6718 102 72 101.25218 72 100.33034L72.00068 96h2.9992v4.32654"
                            fill="#a2d9f0"
                        />
                        <path
                            d="M78.99986 100.32654c.0116.91957-.67946 1.67346-1.4996 1.67346-.829 0-1.50026-.74782-1.50026-1.66966V96h2.99986v4.32654"
                            fill="#FFF"
                        />
                        <path
                            d="M81.99987 100.32654c.01093.91957-.6793 1.67346-1.49925 1.67346C79.6718 102 79 101.25218 79 100.33034V96h2.99987v4.32654"
                            fill="#a2d9f0"
                        />
                        <path
                            d="M84.99987 100.32654c.01093.91957-.6793 1.67346-1.49993 1.67346C82.6718 102 82 101.25218 82 100.33034V96h2.99987v4.32654"
                            fill="#FFF"
                        />
                        <path
                            d="M88.99987 100.32654c.01093.91957-.67946 1.67346-1.4996 1.67346-.829 0-1.50027-.74782-1.50027-1.66966V96h2.99987v4.32654"
                            fill="#a2d9f0"
                        />
                        <path
                            d="M91.99987 100.32654C92.0108 101.2461 91.32041 102 90.4996 102 89.67127 102 89 101.25218 89 100.33034V96h2.99987v4.32654"
                            fill="#FFF"
                        />
                        <path
                            d="M94.99987 100.32654C95.0108 101.2461 94.31988 102 93.49994 102 92.6718 102 92 101.25218 92 100.33034V96h2.99987v4.32654"
                            fill="#a2d9f0"
                        />
                        <path
                            d="M74.63438 96.68989c0-.3809.32693-.68989.73086-.68989.40394 0 .73086.309.73086.68989v4.07882c.00604.23282.10948.44356.27181.59663.16762.15805.3994.2563.65612.2563v.00214h.01283c.24765-.00285.47793-.10252.64706-.26129.16459-.1545.26803-.36666.26803-.59947l-.00076-4.07313c0-.3809.32768-.68989.73086-.68989.40394 0 .73087.309.73087.68989v4.05675c0 .24136.10419.46064.2718.6187.16837.15805.40017.2563.65687.2563v.00214h.01284c.24765-.00285.47793-.10252.64705-.26129.16384-.1545.26728-.36666.26728-.59947v-4.07313c0-.3809.32693-.68989.73086-.68989.40394 0 .73086.309.73086.68989v4.05675c0 .24136.1042.46064.27181.6187l-.0015.00142.0015.00143c.1661.15592.3979.25345.65612.25345v.00214h.01283c.2484-.00285.47793-.10252.64706-.26129.1646-.1545.26803-.36666.26803-.59947l-.00076-4.07313c0-.3809.32768-.68989.73162-.68989.40318 0 .73086.309.73086.68989v4.05675c0 .22854.09211.43715.24236.59307l.02945.02563c.16761.15805.3994.2563.65611.2563v.00214h.01284c.24765-.00285.47793-.10252.64705-.26129.1646-.1545.26728-.36666.26728-.59947v-4.07313c0-.3809.32768-.68989.73086-.68989.40394 0 .73162.309.73162.68989v4.05675c0 .22854.09136.43715.24236.59307l.0287.02563c.1676.15805.40015.2563.6561.2563v.00214h.01284c.2484-.00285.47869-.10252.64781-.26129.16158-.15236.26426-.36025.26728-.5888v-4.0838c0-.3809.32768-.68989.73086-.68989.40318 0 .73086.309.73086.68989v4.05675c0 .22854.09212.43715.24312.59307l.02869.02563c.16762.15805.40016.2563.65611.2563v.00214h.01284c.24765-.00285.47793-.10252.64705-.26129.1646-.1545.26804-.36666.26804-.60018h.00226v-.01709c-.0015-.37876.32315-.68776.72558-.68918.40243-.00142.72935.30472.73086.6842v.02207H96c0 .613-.2703 1.16975-.70142 1.57485-.42658.40013-1.01626.65216-1.65878.66h-.02945V103c-.64478 0-1.23144-.24207-1.66104-.63365-.42357.38375-.99965.62297-1.62632.6308h-.0302V103c-.6448 0-1.23069-.24207-1.66105-.63365-.42357.38375-.99965.62297-1.62556.6308h-.0302V103c-.64555 0-1.23145-.24207-1.66105-.63365-.42357.38375-.99965.62297-1.62632.6308h-.0302V103c-.64328 0-1.22767-.24207-1.65954-.63507-.42357.38446-1.0004.6244-1.62708.63222h-.0302V103c-.64554 0-1.23144-.24207-1.66105-.63365-.42432.38375-.99964.62297-1.62631.6308h-.0302V103c-.64555 0-1.23145-.24135-1.66105-.63365-.42357.38375-.99965.62297-1.62632.6308h-.0302V103c-.6448 0-1.23069-.24135-1.66105-.63365-.42357.38375-.99965.62297-1.62632.6308h-.02944V103c-.65763 0-1.25485-.25275-1.68823-.66141l-.00151.00142c-.43263-.40795-.69991-.97182-.69991-1.59337 0-.3809.32692-.68918.73086-.68918.40318 0 .73086.30828.73086.68918 0 .24136.1042.46064.27181.6187l-.0015.00142.0015.00143c.1661.15592.3979.25345.65612.25345v.00214h.01283c.24765-.00285.47793-.10252.64705-.26129.16158-.15236.26426-.36025.26728-.5888v-4.0838c0-.3809.32768-.68989.73086-.68989.40394 0 .73162.309.73162.68989v4.05675c0 .22854.09136.43715.24236.59307l.0287.02563c.1676.15805.40016.2563.6561.2563v.00214h.01284c.2484-.00285.47869-.10252.64781-.26129.16158-.15236.26426-.36025.26728-.5888v-4.0838"
                            fill="#2E3B40"
                        />
                        <path
                            d="M95.8555 122.25942c0 .4093-.33117.74058-.73866.74058-.40825 0-.73866-.33127-.73866-.74058v-1.98152H69.03384v1.98152c0 .4093-.33117.74058-.73866.74058-.40825 0-.73867-.33127-.73867-.74058V96.14475c0-.40931.33042-.74135.73867-.74135h26.82166c.40749 0 .73867.33204.73867.74135v26.11467zm10.3566-9.5105h6.75482v-15.8636h-6.75483v15.8636zm0 6.04782h6.75482v-4.56666h-6.75483v4.56666zm6.75482 1.48117h-6.75483v1.9815c0 .40932-.33041.74059-.73866.74059s-.73867-.33127-.73867-.74058V96.14475c0-.40931.33042-.74135.73867-.74135h8.23215c.40825 0 .73867.33204.73867.74135v26.11467c0 .4093-.33042.74058-.73867.74058-.40748 0-.73866-.33127-.73866-.74058v-1.98152zM59.78297 28.42057h3.98635v-3.02123h-3.98635v3.02123zm0-4.5024h3.98635v-22.437h-3.98635v22.437zm-1.47733 4.5024V.74135c0-.40931.33118-.74135.73866-.74135H64.508c.40825 0 .73943.33204.73943.74135V4.5024h51.50592V.74135c0-.40931.33042-.74135.73867-.74135h5.46369c.40825 0 .73866.33204.73866.74135v27.67922h.56697c.4075 0 .73867.33128.73867.74058v3.78095c0 .40854-.33118.74058-.73867.74058h-.56697v52.18497h.56697c.4075 0 .73867.33127.73867.74058v3.78094c0 .40855-.33118.74059-.73867.74059h-.56697v31.12966c0 .4093-.33041.74058-.73866.74058-.4075 0-.73867-.33127-.73867-.74058V91.12976H59.78297v31.12966c0 .4093-.33042.74058-.73867.74058-.40748 0-.73866-.33127-.73866-.74058V91.12976h-.56621c-.40825 0-.73943-.33204-.73943-.74059v-3.78094c0-.4093.33118-.74058.73943-.74058h.5662V33.68268h-.5662c-.40825 0-.73943-.33204-.73943-.74058v-3.78095c0-.4093.33118-.74058.73943-.74058h.5662zm6.94178-22.43624v22.43624h10.54125v-3.76181c0-.31674.19764-.5868.47617-.69239l14.43222-6.53287c.20069-.09028.42046-.0834.60588 0l.00458.0023.00382.00152 14.46503 6.54742c.27242.12317.43496.39247.43496.67402h.00076v3.76181h10.54125V5.98433H65.24742zm52.98326 17.93385h3.98635V1.48193h-3.98635v22.43625zm0 4.5024h3.98635v-3.02124h-3.98635v3.02123zm-13.49592 0v-3.28519L91 18.91925 77.266 25.1354v3.28518h27.46876zm1.47733 19.84803h6.75483v-8.54346h-6.75483v8.54346zm0 5.91853h6.75483v-4.4366h-6.75483v4.4366zm7.4935 1.48116h-8.23216c-.40825 0-.73867-.33127-.73867-.74058V38.98457c0-.40931.33042-.74058.73867-.74058h8.23215c.40825 0 .73867.33127.73867.74058v15.94315c0 .40931-.33042.74058-.73867.74058zm-26.083-7.39969h6.75482v-8.54346H87.6226v8.54346zm0 5.91853h6.75482v-4.4366H87.6226v4.4366zm7.49425 1.48116h-8.23292c-.40749 0-.73866-.33127-.73866-.74058V38.98457c0-.40931.33117-.74058.73866-.74058h8.23292c.40749 0 .73867.33127.73867.74058v15.94315c0 .40931-.33118.74058-.73867.74058zm-26.083-7.39969h6.75483v-8.54346h-6.75482v8.54346zm0 5.91853h6.75483v-4.4366h-6.75482v4.4366zm7.4935 1.48116h-8.23216c-.40825 0-.73943-.33127-.73943-.74058V38.98457c0-.40931.33118-.74058.73943-.74058h8.23216c.40748 0 .73866.33127.73866.74058v15.94315c0 .40931-.33118.74058-.73866.74058zm31.55584 9.16087h-3.2164l.29226 1.99452h8.86093l.29227-1.99452h-3.21717c-.40749 0-.73867-.33203-.73867-.74058v-.43685h-1.5338v.43685c0 .40855-.33117.74058-.73942.74058zm-3.34842 3.47569h-.2129v-.00077c-.36094.00077-.67686-.26395-.73027-.6327l-.50364-3.43897a.74726.74726 0 0 1-.01373-.14383c0-.4093.33041-.74058.73866-.74058h3.33163v-.43685c0-.40854.33118-.74058.73867-.74058h3.0119c.40824 0 .73866.33204.73866.74058v.43685h3.33315c.40749 0 .73867.33127.73867.74058 0 .04897-.00534.09716-.0145.14383l-.50364 3.43896c-.05341.36876-.36933.63348-.73027.63271v.00077h-.2129v15.20257c0 .4093-.33042.74058-.73867.74058h-8.23215c-.40825 0-.73867-.33127-.73867-.74058V68.30486zm1.47733 8.54422h6.75483v-8.54346h-6.75483v8.54346zm0 5.91777h6.75483v-4.4366h-6.75483v4.4366zm-18.5895-5.91777h6.75482v-8.54346H87.6226v8.54346zm0 5.91777h6.75482v-4.4366H87.6226v4.4366zm7.49425 1.48116h-8.23292c-.40749 0-.73866-.33127-.73866-.74058V68.30486h-.2129v-.00077c-.36094.00077-.67686-.26395-.73028-.6327l-.50363-3.43897a.74726.74726 0 0 1-.01374-.14383c0-.4093.33042-.74058.73867-.74058h3.33239v-.43685c0-.40854.33118-.74058.73866-.74058h3.19351c.40825 0 .73867.33204.73867.74058v.43685h3.15078c.40748 0 .73866.33127.73866.74058 0 .04897-.00534.09716-.0145.14383l-.50287 3.43896c-.05418.36876-.3701.63348-.73027.63271v.00077h-.2129v15.20257c0 .4093-.33118.74058-.73867.74058zM86.88392 66.8237h8.54731l.2915-1.99452h-3.03479c-.40748 0-.73866-.33203-.73866-.74058v-.43685H90.2331v.43685c0 .40855-.33118.74058-.73867.74058h-3.21716l.29226 1.99452h.3144zM69.03384 82.76685h6.75483v-4.4366h-6.75482v4.4366zm0-5.91777h6.75483v-8.54346h-6.75482v8.54346zM71.6436 64.0886c0 .40855-.33041.74058-.73866.74058h-3.2164l.2915 1.99452h8.8617l.2915-1.99452h-3.2164c-.40826 0-.73867-.33203-.73867-.74058v-.43685h-1.53457v.43685zm-4.08784 4.21627h-.2129v-.00077c-.36018.00077-.6761-.26395-.7295-.6327l-.5044-3.43897c-.0084-.04667-.01374-.09486-.01374-.14383 0-.4093.33117-.74058.73866-.74058h3.3324v-.43685c0-.40854.33117-.74058.73866-.74058h3.0119c.40824 0 .73866.33204.73866.74058v.43685h3.33239c.40825 0 .73867.33127.73867.74058a.74725.74725 0 0 1-.01374.14383l-.50364 3.43896c-.05341.36876-.36933.63348-.73027.63271v.00077h-.2129v15.20257c0 .4093-.33118.74058-.73866.74058h-8.23216c-.40825 0-.73943-.33127-.73943-.74058V68.30486zm-7.77278 17.56279h62.43482V36.18979H59.78297v49.67786zm0-51.15902h62.43482v-1.02595H59.78297v1.02595zm-1.30487-2.50788h65.04457v-2.29901H58.4781v2.29901zm0 57.44784h65.04457v-2.29901H58.4781v2.29901zm16.35977 29.14815h13.73628v-4.56666H74.83787v4.56666zm13.73552-6.04782v-10.7545c0-.40854.33118-.74058.73867-.74058.40825 0 .73866.33204.73866.74058v10.7545h4.32746v-15.8636H69.03384v15.8636h4.3267v-10.7568c0-.40854.33041-.74058.73866-.74058.40749 0 .73867.33204.73867.74058v10.7568h13.73552zm1.47733 6.04782h4.3267v-4.56666h-4.3267v4.56666zm-21.01687 0h4.32669v-4.56666h-4.3267v4.56666z"
                            fill="#2E3B40"
                        />
                        <path
                            d="M16.5 78C25.06046 78 32 84.93954 32 93.5c0 8.56046-6.93954 15.5-15.5 15.5C7.93954 109 1 102.06046 1 93.5 1 84.93954 7.93954 78 16.5 78"
                            fill="#a2d9f0"
                        />
                        <path
                            d="M15.00038 80C21.62795 80 27 85.37282 27 92.00038S21.62795 104 15.00038 104C8.37282 104 3 98.62794 3 92.00038S8.37282 80 15.00038 80"
                            fill="#F2FCFC"
                        />
                        <path
                            d="M19.31187 96.29712c.29232-.28707.76638-.28707 1.0587 0 .29155.28783.29155.7546 0 1.04244l-3.12198 3.07325v8.58775c3.84505-.1858 7.30962-1.79705 9.8601-4.30834 2.7152-2.67349 4.39412-6.36657 4.39412-10.44571 0-4.0799-1.67892-7.77298-4.39412-10.4457-2.71443-2.6735-6.4659-4.32738-10.60869-4.32738-4.14279 0-7.89426 1.65389-10.60869 4.32737-2.7152 2.67273-4.39412 6.36657-4.39412 10.44571s1.67892 7.77222 4.39412 10.4457c2.55048 2.5113 6.01505 4.12255 9.8601 4.30835v-3.70298l-5.69953-5.61196c-.29155-.28783-.29155-.7546 0-1.04244.29233-.28707.76716-.28707 1.0587 0l4.64083 4.56952v-8.96619c0-.40738.33563-.7371.74859-.7371.41374 0 .7486.32972.7486.7371v4.08219l2.06327-2.03158zm-2.06328 14.17915v11.78664c0 .40738-.33485.73709-.74859.73709-.41296 0-.7486-.32971-.7486-.7371v-11.78663c-4.25878-.18732-8.09687-1.96305-10.9188-4.74161C1.84675 102.79466 0 98.73303 0 94.2465s1.84674-8.54815 4.8326-11.48815C7.81849 79.81836 11.94349 78 16.5 78c4.55652 0 8.68152 1.81837 11.6674 4.75836C31.15403 85.69836 33 89.76 33 94.24651s-1.84596 8.54815-4.8326 11.48815c-2.82193 2.77856-6.66002 4.55429-10.9188 4.7416zM44.97764 122.23624c0 .42212-.33057.76376-.73901.76376-.40844 0-.73901-.34164-.73901-.76376v-4.15806H29.50038v4.15806c0 .42212-.33133.76376-.73901.76376-.40844 0-.73901-.34164-.73901-.76376v-4.15806H26v-1.52752h2.02236v-1.24742H26v-1.5283h2.02236v-1.24742H26V111h21v1.52752h-2.02236v1.24742H47v1.5283h-2.02236v1.24742H47v1.52752h-2.02236v4.15806zm-15.47726-8.4613h13.99924v-1.24742H29.50038v1.24742zm0 2.77572h13.99924v-1.24742H29.50038v1.24742z"
                            fill="#2E3B40"
                        />
                    </g>
                </svg>
                <div class="banner__center-text">
                    <h4>Compare hundreds of affordable plans in your area.</h4>
                    <h5 class="font-normal">
                        See how free quotes and more options can help you find
                        the right health insurance plan.
                    </h5>
                </div>
                <div class="banner__cta">
                    <a
                        class="button button--lg bg-orange pulse shadow-4dp"
                        href="/individual-family-health-insurance"
                    >
                        Get Quotes
                    </a>
                </div>
            </div>
        </section>
	`;

    document.body.appendChild(bannerEl);

    const referenceEl = document.querySelector(".section--hero");
    const el = document.querySelector(".banner");

    window.addEventListener("scroll", () => {
        _raf(() => {
            isElInView(referenceEl)
                ? el.classList.remove("is-active")
                : el.classList.add("is-active");
        });
    });
};
