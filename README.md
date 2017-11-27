# Open Discussion  -  Jonathon Langel

- What can make Node handle POST requests at a rate of 16666.66/s?? (~1m requests / min)
     - Remove the Express framework and use the raw node server interface
     - What is the speed of the application dependent on?
         - Node is single-threaded, relying heavily on the processor of what is currently running the application.
             - memory limit of 512MB on 32-bit systems and 1GB on 64-bit systems
                 
         - How can we alter the architecture of the application to accomplish the requirements?
             - Job Control - Master/Child processes to control the jobs that are being done on the application.
               - Add Clusters to handle the requests
             - Host on Amazon EC2 and use Elastic Load balancing to correctly route heavy loads to various EC2 instances of the application.
         - What is the current state of the application? 
            - Data is currently not being stored.
                - Could add MongoDB or SQL support but not a requirement. Will skip for now with respect to time constraint.
            
         
# Changelog

1. Ran example POST request for Proof of Concept.
2. Add loadtest package to my machine. 
    a. Add loadtest executable to record the number of requests the API can handle in 15 seconds.
    b. 

# busyapi

A sample API server for use as an optimization subject.

## Setup

  *  Clone this repository
  *  Install dependencies `npm install`
  *  Start the server `npm start`
  *  Go to [http://localhost:3000/](http://localhost:3000/) to confirm the server is running

## API

The API consists of a single endpoint which receives data when a patient uses their inhaler.

### Add Usage

  *  **method**: POST
  *  **endpoint**: /api/usages
  *  **data**: JSON usage object
  *  **result**: JSON object containing the usageId, HTTP Status 201, 200, 500

#### Example

**Data**
````
{
    "patientId":100,
    "timestamp":"Tue Nov 01 2016 09:11:51 GMT-0500 (CDT)",
    "medication":"Albuterol",
}
````

**Request**

     curl -X POST -H "Content-Type: application/json" --data '{"patientId":"100","timestamp":"Tue Nov 01 2016 09:11:51 GMT-0500 (CDT)","medication":"Albuterol"}' http://localhost:3000/api/usages

**Response**
````
{
    "id":22954
}
````
