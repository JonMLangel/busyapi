// HISTORY: Created by Jonathon Langel 2017-11-26
// PURPOSE: Replace the current application's structure of handling requests @ endpoint 'api/usages'

let storage_size = 8192;
let storage_mask = storage_size - 1;

class Usages {
    constructor() {
        this.store = [];
        this.current_id = 0;
    }

    insert(usage) {
        let next_id = this.current_id++;

        this.store[next_id & storage_mask] = usage;

        return next_id;
    }
}

module.exports = function(path){
    let usages = new Usages();

    path['/api/usages'] = function(req, res){
        let body = [];

        // log out any error occurrences
        req.on('error', (err) => {
            console.error(err);
        });

        // store data from request
        req.on('data', (chunk) => {
            body.push(chunk);
        });


        req.on('end', () => {
            body = Buffer.concat(body).toString();

            // Store usage data
            let usage_id = usages.insert(body);

            res.writeHead(201, {'Content-Type': 'application/json'});
            res.write('{"id":' + usage_id + '}');
            res.end();
        });
    };
};