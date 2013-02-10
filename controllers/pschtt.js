var pschttParameters = {
    pschtt:{ version : "0.0.1",
     name : "Pschtt",
     title : "Pschtt : easy way to track your time",
     license : "GPL",
     authors : "A. Ragon & D. Loureiro"
   }
};

// index listing of widgets at /pschttParameters/
exports.index = function(req, res) {  
   res.send(pschttParameters);
};