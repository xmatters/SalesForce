/*
 * This is used in the Outbound Response IB script editor to update SalesForce Notes and the Assignment field.
 * This script calls an enternal function (getUserId) to retrieve the SalesForce userid of the user
 * that responded.  This function can be moved to a xMatters Shared Library.
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



var ID      = callback.eventProperties['ID'];

var assigneeId = getUserId(callback.recipient );

var req = http.request({
  method: 'PATCH',
  endpoint: 'SalesForce',
  path: '/services/data/v22.0/sobjects/Case/' + ID,
});
var payload = JSON.stringify({
            "OwnerId": assigneeId
});
var resp = req.write( payload );
console.log( JSON.stringify( resp ) );



/***********************************************
 * getUserId
 * Get a user's unique Id from SF.
 ***********************************************/
function getUserId( userName ) {

    // We're using SOQL here
      var queryParms = "q=select%20Id,%20name,%20username%20from%20User%20where%20Alias='" + encodeURI( userName ) + "'";
    console.log(queryParms);

    var request = http.request({
        'endpoint': 'SalesForce',
        'method': 'GET',
        'path': '/services/data/v22.0/query/?' + queryParms,
    });

    console.log( 'Getting user "' + userName + '"' );

    var response = request.write();
    var userList = JSON.parse( response.body );

    if( userList.totalSize === 0 ){
        return null;
    }
    else
        return userList.records[0].Id;

}




