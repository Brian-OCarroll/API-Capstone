const URL_FDA = "https://api.fda.gov/food/enforcement.json"; 
const URL_GOOGLE = 'https://www.googleapis.com/customsearch/v1'
let skip = 0;
function getDataFromRecallAPI(searchTerm, callback) {
    const recallQuery = {
    url: URL_FDA,
    data: {
        api_key: 'F1QzPnq38QWsSLQzgprkG2UGycgQsqF7QMw4UWx6',
        search: `product_description:"${searchTerm}"`,
        limit: 10,
        skip: skip
        },
    dataType: 'json',
    type: 'GET',
    success: callback,
    error: ifNoResults
    }
    $.ajax(recallQuery)
}

function getDataFromGoogleAPI(searchTerm, callback) {
    const googleQuery = {
        key: 'AIzaSyCPr8TWECg0liCnewSMRPPBxNaceX4sNZY',
        q: `${searchTerm}+image`,
        searchType: 'image',
        cx: '005740929295477467170:javy9zvt87m',
        safe: 'active',
        num: 1
    }
    $.getJSON(URL_GOOGLE, googleQuery, callback);
}


function renderRecallResult(result) {
    return `
    <div class="recall-results"><h3 class="js-product-description">${result.product_description}</h3>
    <p class="js-product-data">${result.product_quantity}</p>
    <p class="js-product-data">${result.reason_for_recall}</p> </div>
    `
}

function renderGoogleImage(result) {
    return `
    <img src="${result.image.thumbnailLink}" alt="${result.snippet}">
    `
}

function displayRecallData(data) {
    const result = data.results.map((item, index) => renderRecallResult(item));
    $('.js-results').html(result);
}

function displayGoogleImage(data) {
    if(data.items) {
    const result = data.items.map((item, index) => renderGoogleImage(item));
    $('.js-google-pic').html(result);
    }
    
}

function ifNoResults() {
    const noResults = `
    <h3>No Results</h3>
    <div class = "js-no-results"><img src=
    "https://3playmedia-wpengine.netdna-ssl.com/wp-content/uploads/cat-research.jpg" 
    alt="Cat With Magnifying Glass"></div>
    `;
    $('.js-results').html(noResults);
    $('.js-google-pic').hide();
    $('.js-load-more').hide();
}

function onSubmit() {
   $('.js-search-form').on('submit', function(event){
    event.preventDefault(event);
    const queryTarget = $(this).find('#js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromRecallAPI(query, displayRecallData);
    getDataFromGoogleAPI(query, displayGoogleImage);
    $('main').prop('hidden', false);
    $('.js-multipage').prop('hidden', false);
   });
}
$(onSubmit);

$('.js-load-more').on('click', function(){
skip= skip+10;
getDataFromRecallAPI('banana', displayRecallData);
document.body.scrollTop = document.documentElement.scrollTop = 0;
});




