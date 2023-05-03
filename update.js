const express = require("express");
const router = express.Router();
const connection = require("./config/database");

router.patch("/save_question", (req, res) => {
  var topics;
  var questionInfo;
  connection.query(
    "SELECT * FROM `questions_mcq` WHERE question_id = ?;",
    [req.body.question_id],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      questionInfo = results[0];
      if(req.body.answer === questionInfo['correct_answer']){
        connection.query(
          "UPDATE `attended_test` SET `score` = score+? WHERE `attended_test`.`test_id` = ?;",
          [parseInt(questionInfo['points']),parseInt(req.body.test_id)],
          (err, results, fields) => {
            if (err) return res.status(400).send(err);
            connection.query(
              "SELECT mt.topic_id FROM `mcq_topic` mt INNER JOIN `topics` t ON mt.topic_id = t.topic_id WHERE mt.q_id = ?;",
              [req.body.question_id],
              (err, results, fields) => {
                if (err) return res.status(400).send(err);
                topics = results;
                queryStatus = true;
                topics.forEach(topic => {
                    connection.query("INSERT INTO `student_topic_score` (user_id, topic_id, score) VALUES(?, ?, 1) ON DUPLICATE KEY UPDATE score=score+1",
                    [req.body.user_id, topic.topic_id],
                    (err, results, fields) => {
                        if(err) queryStatus = false
                        else queryStatus = queryStatus && true
                    }            
                    )
                });
                if (!queryStatus) return res.status(400).send(err);
                return res.send({message: 'success'})
              }
            );

          }
        );
      }else{
            return res.send({message:'success'});
      }
    }
  );
});


router.patch("/submit_test", (req, res) => {
  connection.query('UPDATE `attended_test` SET `time_taken` = ? WHERE `attended_test`.`id` = ?;',[req.body.duration, req.body.test_id],
  (err,results,fields)=>{
    if (err) return res.status(400).send(err);
    return res.send(results);
  })
});

router.patch("/change_status", (req, res) => {
  connection.query("UPDATE `tests` SET `status` = ? WHERE `tests`.`id` = ?;",[req.body.status, req.body.test_id],
  (err,results,fields)=>{
    if (err) return res.status(400).send(err);
    return res.send(results);
  })
});

router.patch("/update_question", (req, res) => {
  connection.query("UPDATE `questions_mcq` SET `question_title` = ?, `correct_answer` = ?, `difficulty_level` = ?, `option_set` = ?, `points` = ?, `time_limit` = ? WHERE `question_id` = ?;",[req.body.question_title, req.body.correct_answer, req.body.difficulty_level,req.body.option_set.toString(), req.body.points,req.body.time_limit,req.body.q_id],
  (err,results,fields)=>{
    if (err) return res.status(400).send(err);
    let insertPromise = new Promise((resolve,reject)=>{
      if(req.body.addedTopics.length>0){
        req.body.addedTopics.forEach((topic,index)=>{
          connection.query("INSERT INTO `mcq_topic` (`q_id`, `topic_id`) VALUES (?, ?);",[req.body.q_id,topic],(err,result,fields)=>{
            if (err) reject(err) 
            if(index == req.body.addedTopics.length-1) {
              resolve()
            }
          })
        })
      }else{
        resolve()
      }
    })

    insertPromise.then(()=>{
      if(req.body.removedTopics.length>0){
        req.body.removedTopics.forEach((topic,index)=>{
          connection.query("DELETE FROM `mcq_topic` WHERE `q_id`=? AND `topic_id`=?;",[req.body.q_id,topic],(err,result,fields)=>{
            if (err) reject(err)
            if(index == req.body.removedTopics.length-1) 
              res.send(results)
          })
        })
      }else{
        res.send(results)
      }
    }).catch(err=>{
      return res.status(400).send(err);
    })
  })
});


router.patch("/update_test", (req, res) => {
  connection.query("UPDATE `tests` SET `test_name` = ?, `deadline` = ? WHERE `tests`.`id` = ?;",[req.body.test_name,req.body.deadline,req.body.test_id],
  (err,results,fields)=>{
    if (err) return res.status(400).send(err);
    let insertPromise = new Promise((resolve,reject)=>{
      if(req.body.addedQuestions.length>0){
        req.body.addedQuestions.forEach((question,index)=>{
          connection.query("INSERT INTO `test_questions` (`test_id`, `question_id`) VALUES (?, ?);",[req.body.test_id,question],(err,result,fields)=>{
            if (err) reject(err) 
            if(index == req.body.addedQuestions.length-1) {
              resolve()
            }
          })
        })
      }else{
        resolve()
      }
    })

    insertPromise.then(()=>{
      if(req.body.removedQuestions.length>0){
        req.body.removedQuestions.forEach((question,index)=>{
          connection.query("DELETE FROM `test_questions` WHERE `question_id`=? AND `test_id`=?;",[question,req.body.test_id],(err,result,fields)=>{
            if (err) reject(err)
            if(index == req.body.removedQuestions.length-1) 
              res.send(results)
          })
        })
      }else{
        res.send(results)
      }
    }).catch(err=>{
      return res.status(400).send(err);
    })
  })
  })


module.exports = router;
