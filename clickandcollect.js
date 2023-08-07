/*
* <license header>
*/

/**
 * This is a sample action showcasing how to access an external API
 *
 * Note:
 * You might want to disable authentication and authorization checks against Adobe Identity Management System for a generic action. In that case:
 *   - Remove the require-adobe-auth annotation for this action in the manifest.yml of your application
 *   - Remove the Authorization header from the array passed in checkMissingRequestInputs
 *   - The two steps above imply that every client knowing the URL to this deployed action will be able to invoke it without any authentication and authorization checks against Adobe Identity Management System
 *   - Make sure to validate these changes against your security requirements before deploying the action
 */


const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')
const {sendcloudevent} = require('../token')
const {getProduct,converImageintoBase64} = require('../magento')
const {setViareAuthCode, getViareAuthCode, SendViareAuthRequest, sendProductDetail,updateProductImage, clickAndCollect} = require('../viare')
const {CloudEvent} = require("cloudevents");



// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  let responseData = {};

//   responseData["event_code"] = params.type;
//   responseData["provider_id"] = params.source;
//   responseData["event_id"] = params.event_id;
//   responseData["entity"] = "Update Viare Product";

  try {

    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = [/* add required params */]
    const requiredHeaders = []
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    var skuArray = [50209644,50209484];
    var storesArray = [100,102,104,105,106];

    var response1 = await clickAndCollect(skuArray,storesArray);

    const response = {
        statusCode: 200,
        body: response1[0]
    }
    return response;

  }
  catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    //return errorResponse(500, 'server error'+error, logger)
    const response = {
      statusCode: 200,
      body: error
    }
  }
}
