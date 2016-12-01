var express = require('express');
var router = express.Router();
var fs = require('fs');
var Room = require('../models/Room');



router.get('/:uuid/:filename', function(req, res, next) {
    console.log("***************" + req.params.filename);
    console.log("***************" + req.params.uuid);
    Room.findOne({
        'image.filename': req.params.uuid,
        'image.originalname': req.params.filename
    }, function(err, room) {

        if (err) next(err);
        else {
            res.set({
                "Content-Disposition": 'attachment; filename="' + room.image.originalname + '"',
                "Content-Type": room.image.mimetype
            });
            var st = fs.createReadStream(room.image.path);
            st.on('error', function () {
                res.status(404).end();
            });
            st.pipe(res);
        }
    });
});


module.exports = router;
