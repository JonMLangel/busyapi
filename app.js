let  path_map = {};


require('./routes/api/usages')(path_map);

module.exports = (req, res) => {

    let { method, url } = req;

    res.on('error', () => {
        res.statusCode = 500;
    res.end();
});

    if (method === 'POST') {
        let endpoint = path_map[url];
        if (endpoint) {
            endpoint(req, res);
            return;
        }
    }

    res.statusCode = 404;
    res.end();
};