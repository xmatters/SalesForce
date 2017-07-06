/*
 * This is used in the Inbound IB script editor to parse the incoming JSON payload from SalesForce.  This script
 parses the information, sets it to the xMatters form format and creates a xMatters Event.
 */

var data = JSON.parse(request.body);

var datan = '{' + '"properties":' + JSON.stringify(data) + '}';
var json = JSON.parse(datan);
console.log(JSON.stringify(json));


// Post trigger to form
form.post(json);
