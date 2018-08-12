const endpoint = "https://api.fda.gov/food/enforcement.json";
//change product description to user input
let JSONRequest = "https://api.fda.gov/food/enforcement.json?api_key:&search=product_description:\"ice+cream\"&limit=25"
function constructQuery(searchTerm, callback) {
    const query = {
        api_key: 'F1QzPnq38QWsSLQzgprkG2UGycgQsqF7QMw4UWx6',
        search: `product_description:${searchTerm}`,
        limit: 25
    }
    $.getJSON(endpoint, query, callback);
}

function renderResult(search) {
    return `
    <h2>Results</h2>
    <h3>${results.product_description}</h3>
    <p>${results.product_quantity}</p>
    <p>${search.results.reason_for_recall}</p>
    `
}
function onSubmit(event) {
    event.preventDefault();
}

//https://api.fda.gov/food/event.json?search=outcomes:"serious+injuries"
//https://api.fda.gov/food/enforcement.json?api_key=F1QzPnq38QWsSLQzgprkG2UGycgQsqF7QMw4UWx6&
//search=product_description:"ice"&limit=25
//results.reason_for_recall
//results.product_quantity
//results.product_description 