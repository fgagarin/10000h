module.exports = function(db) {
    var module = {}

    var opt = function(param, def) {
        return param ? param : def
    }

    module.count = function(req, res) {
        db.count({}, function(err, count) {
            res.send(JSON.stringify(count))
        })
    }
    module.findAll = function(req, res) {
        var skip = opt(req.query.skip, 0)
          , limit = opt(req.query.limit, 10)
        db.find({}).sort({_id:1}).skip(skip).limit(limit).exec(function(err, docs) {
            res.send(docs)
        })
    }
    module.findById = function(req, res) {
        db.findOne({_id:req.params.id}, function(err, doc) {
            res.send(doc)
        })
    }
    module.create = function(req, res) {
        db.insert(req.body, function(err, newDoc) {
            res.send(newDoc)
        })
    }
    module.update = function(req, res) {
        db.update({_id:req.params.id},{},{},function(err, numReplaced, newDoc) {
            res.send(newDoc)
        })
    }
    module.delete = function(req, res) {
        db.remove({_id:req.params.id},{},function(err, numRemoved) {
            res.send(JSON.stringify(numRemoved))
        })
    }
    return module
}
