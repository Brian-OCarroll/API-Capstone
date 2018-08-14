const endpoint = "https://api.fda.gov/food/enforcement.json";
//change product description to user input
let JSONRequest = "https://api.fda.gov/food/enforcement.json?api_key:&search=product_description:\"ice+cream\"&limit=25"
function getDataFromAPI(searchTerm, callback) {
    const query = {
        api_key: 'F1QzPnq38QWsSLQzgprkG2UGycgQsqF7QMw4UWx6',
        search: `product_description:${searchTerm}`,
        limit: 25
    }
    $.getJSON(endpoint, query, callback);
}

function renderResult(result) {
    return `
    <h2>Results</h2>
    <h3>${result.product_description}</h3>
    <p>${result.product_quantity}</p>
    <p>${result.reason_for_recall}</p>
    `
}

function displayRecallData(data) {
    console.log(data)
    /*for (let i =0; i<data.results[i];i++) {
        renderResults(data.results[i])
    }*/
    //check to see if results is the right reference
    //trying to use map on the returned json
    const result = data.results.map((item, index) => renderResult(item));
    $('.js-results').html(result)
}

function onSubmit() {
   $('.js-search-form').on('submit', function(event){
    event.preventDefault(event);
    const queryTarget = $(this).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromAPI(query, displayRecallData);
   });
}
$(onSubmit);
//https://api.fda.gov/food/event.json?search=outcomes:"serious+injuries"
//https://api.fda.gov/food/enforcement.json?api_key=F1QzPnq38QWsSLQzgprkG2UGycgQsqF7QMw4UWx6&
//search=product_description:"ice"&limit=25
//results.reason_for_recall
//results.product_quantity
//results.product_description 