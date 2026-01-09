
const SibApiV3Sdk = require('sib-api-v3-sdk');

let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = "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"; // store key in .env

const brevoApi = new SibApiV3Sdk.TransactionalEmailsApi();

module.exports = brevoApi;
