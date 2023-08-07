async function clickAndCollect(skuArray,storesArray){
  var responseData = [];
  var config = {};
  var storeIds = "";

  for(i=0; i<storesArray.length; i++) {
    storeIds = storeIds + storesArray[i]+ ",";
  }

  for(j=0; j<skuArray.length; j++) {
    
        var config = {
          method: 'get',
          url: 'https://dusk.viare.io/api/availability/store/'+ skuArray[j]+'?stores=' +storeIds
          //'50209484?stores=100,102,104,105,106'
        };

      try {
        var response = await axios(config);
    
        if (response.status == 200) {
          responseData[j] = JSON.stringify(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return responseData;
}
