global class xMattersreq {
  @future(callout=true)
  WebService static void xRESTCall(String endpoint, String payload){
    HttpRequest req = new HttpRequest();
    req.setEndpoint(endpoint);
    req.setMethod('POST');
    
    req.setBody(payload);
    req.setHeader( 'Content-Type', 'application/json' );
    
    Http http = new Http();
    HTTPResponse res = http.send(req);
    System.debug(' Response: ' + res.getBody());
  }
}
