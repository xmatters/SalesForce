/*
 * This is used in the Outbound Delivery IB script editor to update SalesForce Notes.
 */

var callback = JSON.parse(request.body);
console.log('Executing outbound integration for xMatters event ID: ' + callback.eventIdentifier);



// Convert list of event properties to an eventProperties object
if (callback.eventProperties && Array.isArray(callback.eventProperties)) {
    var eventProperties = callback.eventProperties;
    callback.eventProperties = {};

    for (var i = 0; i < eventProperties.length; i++) {
        var eventProperty = eventProperties[i];
        var key = Object.keys(eventProperty)[0];
        callback.eventProperties[key] = eventProperty[key];
    }
}

// Handle responses without annotations
if (callback.annotation == "null") {
    callback.annotation = null;
}

console.log("Request body -" + JSON.stringify(callback));

var ID      = callback.eventProperties['ID'];
console.log(ID);

console.log( 'Adding a note' );

payload = {
    "ParentId": ID,
    "CommentBody": 'Update from xMatters at - ' + callback.recipient + " contacted on " + callback.device
};

req = http.request({
  method: 'POST',
  endpoint: 'SalesForce',
  path: '/services/data/v22.0/sobjects/CaseComment' + '/',

});

resp = req.write( payload );
console.log(resp);


