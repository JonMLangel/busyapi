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
    - Add loadtest executable to record the number of requests the API can handle in 15 seconds.
    
**INITIAL PERFORMANCE**:

    Requests: 0, requests per second: 0, mean latency: 0 ms
    Requests: 13070, requests per second: 2614, mean latency: 0.4 ms
    Requests: 30769, requests per second: 3540, mean latency: 0.3 ms
     
    Target URL:          http://localhost:3000/api/usages
    Max time (s):        15
    INFO Concurrency level:   1
    Completed requests:  48501
    Total errors:        0
    Total time:          15.000759253 s
    Requests per second: 3233
    Mean latency:        0.3 ms
    Percentage of the requests served within a certain time
    50%       1 ms
    90%       1 ms
    95%       1 ms
    99%       1 ms
    100%      12 ms (longest request)
    
3. Add NPM package cluster to the project.
    - Add clusters to better handle the requests.
    
**PERFORMANCE AFTER ADDING CLUSTERS**:
    
     
    0s  mark: Requests: 0, requests per second: 0, mean latency: 0 ms
    5s  mark: Requests: 13507, requests per second: 2701, mean latency: 0.4 ms
    10s mark: Requests: 31233, requests per second: 3546, mean latency: 0.3 ms
     
    Target URL:          http://localhost:3000/api/usages
    Max time (s):        15
    Concurrency level:   1
    Agent:               none
    Completed requests:  39660
    INFO Total errors:        0
    Total time:          15.00309631 s
    Requests per second: 2643
    Mean latency:        0.4 ms

- Performance went down?
    - Set the number of concurrent requests to 300 and received the following results:
    
    
        0s  mark: Requests: 0, requests per second: 0, mean latency: 0 ms
        5s  mark: Requests: 22655, requests per second: 4522, mean latency: 66.2 ms
        10s mark: Requests: 50404, requests per second: 5561, mean latency: 54 ms
        
        Target URL:          http://localhost:3000/api/usages
        Max time (s):        15
        Concurrency level:   300
        Agent:               none
        
        Completed requests:  78849
        Total errors:        0
        Total time:          15.000393354 s
        Requests per second: 5256
        Mean latency:        56.9 ms
        
    


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
