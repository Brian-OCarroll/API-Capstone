const URL_FDA = "https://api.fda.gov/food/enforcement.json";
const URL_FLICKR = "https://api.flickr.com/services/rest?jsoncallback=?"; 
const URL_GOOGLE = 'https://www.googleapis.com/customsearch/v1'
//change product description to user input
let JSONRequest = "https://api.fda.gov/food/enforcement.json?api_key:&search=product_description:\"banana\"&limit=25"

function getDataFromRecallAPI(searchTerm, callback) {
    
    const recallQuery = {
    url: URL_FDA,
    data: {
        api_key: 'F1QzPnq38QWsSLQzgprkG2UGycgQsqF7QMw4UWx6',
        search: `product_description:${searchTerm}`,
        limit: 25
        },
    dataType: 'json',
    type: 'GET',
    success: callback,
    error: ifNoResults()
    }
    $.ajax(recallQuery)
}

function getDataFromGoogleAPI(searchTerm, callback) {
    const googleQuery = {
        key: 'AIzaSyCPr8TWECg0liCnewSMRPPBxNaceX4sNZY',
        q: `${searchTerm}`,
        searchType: 'image',
        cx: '005740929295477467170:javy9zvt87m',
        safe: 'active',
        num: 1
    }
    $.getJSON(URL_GOOGLE, googleQuery, callback);
}


function renderRecallResult(result) {
    return `
    <h3>${result.product_description}</h3>
    <p>${result.product_quantity}</p>
    <p>${result.reason_for_recall}</p>
    `
}

function renderGoogleImage(result) {
    return `
    <img src="${result.image.thumbnailLink}" alt="${result.snippet}">
    `
}

function displayRecallData(data) {
    
    /*for (let i =0; i<data.results[i];i++) {
        renderResults(data.results[i])
    }*/
    const result = data.results.map((item, index) => renderRecallResult(item));
    $('.js-results').html(result);
}

function displayGoogleImage(data) {
    const result = data.items.map((item, index) => renderGoogleImage(item));
    $('.js-google-pic').html(result);
}

function ifNoResults() {
    const noResults = `
    <h3>No Results</h3>
    <div class = "js-no-results"><img src=
    "https://3playmedia-wpengine.netdna-ssl.com/wp-content/uploads/cat-research.jpg" 
    alt="Cat With Magnifying Glass"></div>
    `;
    $('.js-results').html(noResults);
}

function onSubmit() {
   $('.js-search-form').on('submit', function(event){
    event.preventDefault(event);
    const queryTarget = $(this).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromRecallAPI(query, displayRecallData);
    getDataFromGoogleAPI(query, displayGoogleImage)
   });
}
$(onSubmit);



//https://api.fda.gov/food/event.json?search=outcomes:"serious+injuries"
//https://api.fda.gov/food/enforcement.json?api_key=F1QzPnq38QWsSLQzgprkG2UGycgQsqF7QMw4UWx6&
//search=product_description:"ice"&limit=25
//results.reason_for_recall
//results.product_quantity
//results.product_description 

//for getting first google flickr image result

 /*function getDataFromFlickrAPI(searchTerm, callback) {
    const flickrQuery = {
        api_key = '5f90685a9a26adf1519a23faa40f32a4',
        method: "flickr.photos.search",
        content_type: 1,
        safe_search:1,
        format: 'json',
        text: `${searchTerm}`,
        sort: 'relevance',
        per_page: 1
    }
    $.getJSON(URL_FLICKR, flickrQuery, callback);
 } */

 //work on this
/* function displayFlickrData(data) {
    const result = data.items.map((item, index) => )
}
 */