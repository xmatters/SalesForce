/*
 * This is used in the Inbound IB script editor to parse the incoming JSON payload from SalesForce.  This script
 parses the information, sets it to the xMatters form format and creates a xMatters Event.
 */

var data = JSON.parse(request.body);

var datan = '{' + '"properties":' + JSON.stringify(data) + '}';
var json = JSON.parse(datan);
console.log(JSON.stringify(json));


// Parse data from incoming payload and construct the trigger object.  This is not needed because the JSON values match the
// properties/fields on the form.
//trigger.properties.Company = json["soapenv:envelope"]["soapenv:body"]["notifications"]["notification"]["sobject"]["sf:accountid"];

// Post trigger to form
form.post(json);
