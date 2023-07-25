const soap = require('soap')

function SearchInFutura(apiEndpoint, header, payload) {
        console.log("Inside promise")
        soap.createClient(apiEndpoint, {wsdl_headers:header}, function(err, client) {
            console.log("Inside Create Client function")
            console.log("Endpoint are : "+apiEndpoint)
            console.log("Header: "+header)
            console.log("payload are: "+payload)
            client.setEndpoint('https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR');
            client.addHttpHeader('CF-Access-Client-Id', '30979c34f222ca7ac7ac3d24120060a5.access');
            client.addHttpHeader('CF-Access-Client-Secret', 'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048');
            client.web_search_customer(payload,function(err, result) {
                console.log("web_search_customer method called successfully: "+result)
                console.log(Object.assign( {},result,{"ritesh":"rana"}))
                console.log("Final result value: "+result.web_search_customerResult);
                console.log("End of search in futura method")
            }).then(result => {
                return result;
            })

        });
}

module.exports = {
    SearchInFutura
}
