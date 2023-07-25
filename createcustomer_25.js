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
const {SearchInFutura} = require('../futura')
const soap = require('soap');
const { parseString } = require('xml2js');
const { async } = require('regenerator-runtime');
const { promisify } = require('util');

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

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

    // extract the user Bearer token from the Authorization header
    const token = getBearerToken(params)

    var apiEndpoint = 'https://futura-staging-adr.dusk.com.au/SOAP?service=FuturERS_ADR';
  
    var payload = {
        'web_search_kde': {
          'web_fld_names': ['ADD_NUMMER', 'ANS_EMAIL', 'ADD_TYP'],
          'web_flds_fill': ['', '13jan@gmil.com', '3'],
          'web_error': {
            'web_err_nr': 0,
            'web_err_txt': '',
          },
        },
        'web_user': '',
        'web_Pass': '',
    };

    var headers = {
      'CF-Access-Client-Id': '30979c34f222ca7ac7ac3d24120060a5.access',
      'CF-Access-Client-Secret':'ff6e0612ff3cc2962cd1dbad55a55cf72f5d3d5f3678fdd0f3aece5f0586c048'
    }

    var searchInFuturaResult = await SearchInFutura(apiEndpoint, headers, payload);
    console.log("SearchInFutura method result: "+searchInFuturaResult);

    if(searchInFuturaResult.web_search_customerResult == null) {
      const response = {
        statusCode: 200,
        body: "customer not found"
      } 
    }
    else{
      // const content = JSON.stringify(finalResult);
      const response = {
        statusCode: 200,
        body: "customer found"
      }
    }
    
    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    return response
  } 
  catch (error) {
    // log any server errors
    console.error(error); // Log the detailed error object
    // return with 500
    return errorResponse(500, 'server error'+error, logger)
  }
}

// Function to convert XML to JSON using xml2js
function xmlToJSON(xmlData) {
    return new Promise((resolve, reject) => {
      parseString(xmlData, (err, result) => {
        if (typeof err) {
          reject(typeof err);
        } else {
          finalResult = resolve(result);
        }
      });
    });
}

exports.main = main
