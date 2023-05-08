const express = require("express");
const router = express.Router();
const connection = require("./config/database");
const bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
    connection.query(
      "SELECT * FROM `students` WHERE usn = ? || email = ?",[req.body.username,req.body.username],
      (err, results, fields) => {
        if (err) return res.status(400).send(err);
        if(results.length > 0){
             bcrypt.compare(req.body.password, results[0].password, function(err, reslt) {
                if(reslt === true){
                    const {password, ...keep} = results[0]
                    if(results[0].verified){
                      return res.send({
                          ...keep,
                      })
                    }
                    return res.status(401).send()
                }
                return res.status(404).send()
            });
            return;
        }
        return res.status(404).send()
      }
    );
  });

  router.post("/faculty_auth", (req, res) => {
    connection.query(
      "SELECT * FROM `faculty` WHERE email = ? || employee_id = ?",[req.body.username,req.body.username],
      (err, results, fields) => {
        if (err) return res.status(400).send(err);
        if(results.length > 0){
             bcrypt.compare(req.body.password, results[0].password, function(err, reslt) {
                if(reslt === true){
                    const {password, ...keep} = results[0]
                    if(results[0].verified){
                      return res.send({
                          ...keep,
                      })
                    }
                    return res.status(401).send()
                }
                return res.status(404).send()
            });
            return;
        }
        return res.status(404).send()
      }
    );
  });
  
  router.post("/admin_auth", (req, res) => {
    connection.query(
      "SELECT * FROM `admin_user` WHERE name = ?",[req.body.username],
      (err, results, fields) => {
        if (err) return res.status(400).send(err);
        if(results.length > 0){
             bcrypt.compare(req.body.password, results[0].password, function(err, reslt) {
                if(reslt === true){
                    const {password, ...keep} = results[0]
                    return res.send({
                        ...keep,
                    })
                }
                return res.status(404).send()
            });
            return;
        }
        return res.status(404).send()
      }
    );
  });

module.exports = router;