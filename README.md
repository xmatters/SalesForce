# SalesForce Service
Transform customer relationships, and your business, using the latest in mobile and data technology to deliver the most personalized customer experience ever — every time, and anywhere. This document instructs how to setup an integration between xMatters and SalesForce Case Management.  When a case is created, SalesForce reaches into xMatters to figure out who is on call for assignment of the case.

# Pre-Requisites
* SalesForce Case Module
* xMatters account - If you don't have one, [get one](https://www.xmatters.com)!

# Files
* [xMattersAlert.tgr](xMattersAlert.tgr.js) - The trigger used after a Case is initially submitted.  It sets the tokens/fields of the case that will be passed into xMatters and calls the xMatters request function.
* [xMattersreq.cls](xMattersreq.cls) - This is the Apex class that executes the Restful Post call into xMatters.
* [SalesForce.zip](SalesForce.zip) - The comm plan (if needed) that has all the cool scripts and email format and such. 

# How it works
When a new SalesForce Case is submitted, SalesForce pushes the information into xMatters.  xMatters kicks off an event and sends the SalesForce case information to the engineer on call.  That engineer has the ability to respond in the xMatters notification.  By accepting the assignment in the xMatters notification, this updates the SalesForce Assignment field.

# Installation

## Application ABC set up
Specific steps go here

## xMatters set up
1. Create a new Shared Library or (In|Out)bound integration
2. Add this code here:
   ```
   var items = [];
   items.push( { "stuff": "value"} );
   console.log( 'Do stuff' );
   ```
   
# Testing
Be specific. What should happen to make sure this code works? What would a user expect to see?

# Troubleshooting
Optional section for how to troubleshoot. Especially anything in the source application that an xMatters developer might not know about. 
