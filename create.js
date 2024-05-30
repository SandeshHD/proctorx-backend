const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const connection = require("./config/database");

// Create Branch
router.post("/branch", (req, res) => {
  connection.query(
    "INSERT INTO `branches` (`branch_name`) VALUES (?)",
    [req.body.branch_name],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

// Create Faculty
router.post("/faculty", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    connection.query(
      "INSERT INTO `faculty` (`name`,`employee_id`,`email`, `branch`, `password`) VALUES (?, ?, ?, ?, ?);",
      [req.body.name, req.body.employee_id, req.body.email, req.body.branch, password],
      (error, result, field) => {
        if (error) {
          return res.status(400).send(error);
        }
        return res.send(result);
      }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Create Super admin
router.post("/admin", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    connection.query(
      "INSERT INTO `admin_user` (`name`, `password`) VALUES (?, ?);",
      [req.body.name,password],
      (error, result, field) => {
        if (error) {
          return res.status(400).send(error);
        }
        return res.send(result);
      }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Create Student
router.post("/student", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    if (req.body.semester < 1 || req.body.semester > 8)
      return res.status(400).send("Invalid semester");
    connection.query(
      "INSERT INTO `students` (`usn`, `name`, `email`, `branch`, `semester`, `password`) VALUES (?, ?, ?, ?, ?, ?);",
      [
        req.body.usn,
        req.body.name,
        req.body.email,
        req.body.branch,
        req.body.semester,
        password,
      ],
      (error, result, field) => {
        if (error) {
          return res.status(400).send(error);
        }
        return res.send(result);
      }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Create Coding Question
// router.post('/coding-question',(req,res)=>{
//     connection.query("INSERT INTO `questions_coding` (`question_title`, `description`,`points`,`difficulty`,`created_by`) VALUES (?,?,?,?,?);",[req.body.question_title,req.body.description,req.body.points,req.body.difficulty,req.body.created_by],(err,result,fields)=>{
//         if (err) return res.status(400).send(err);
//         return res.send(result)
//     })
// })

// Create MCQ Question
router.post('/question',(req,res)=>{
    connection.query("INSERT INTO `questions_mcq` (`question_title`, `option_set`, `correct_answer`, `points`, `difficulty_level`, `time_limit`, `created_by`) VALUES (?,?,?,?,?,?,?);",[req.body.question_title,[...new Set(req.body.option_set)].toString(),req.body.correct_answer,req.body.points,req.body.difficulty_level,req.body.time_limit,req.body.created_by],(err,result,fields)=>{
        if (err) return res.status(400).send(err);
        [...new Set(req.body.topics)].forEach((topic,index)=>{
          connection.query("INSERT INTO `mcq_topic` (`q_id`, `topic_id`) VALUES (?,?);",[result['insertId'],topic],(err,result,fields)=>{
              if (err) return res.status(400).send(err);
              if(index==[...new Set(req.body.topics)].length-1){
                return res.send(result)
              }
            })
        })
        // return res.status(400).send()
    })
})

// Create Topics
router.post('/topic',(req,res)=>{
    connection.query("INSERT INTO `topics` (`topic_name`) VALUES (?);",[req.body.topic_name],(err,result,fields)=>{
        if (err) return res.status(400).send(err);
        return res.send(result)
    })
})

// Create MCQ Topics
router.post('/mcq-topic',(req,res)=>{
    connection.query("INSERT INTO `mcq_topic` (`q_id`, `topic_id`) VALUES (?, ?);",[req.body.q_id,req.body.topic_id],(err,result,fields)=>{
        if (err) return res.status(400).send(err);
        return res.send(result)
    })
})

  
// Create Test
router.post('/test',(req,res)=>{
    const test = new Promise((resolve,reject) =>{
      connection.query("INSERT INTO `tests` (`test_name`,`faculty_id`,`deadline`) VALUES (?, ?,?);",[req.body.test_name,req.body.faculty_id,new Date(req.body.deadline)],(err,result,fields)=>{
        if (err) reject(err);
        resolve(result)
      })
    })

    const questionsPromise  = new Promise((resolve, reject) =>{
      test.then((result)=>{
        req.body.questions.forEach((question,index) => {
          connection.query("INSERT INTO `test_questions` (`test_id`,`question_id`) VALUES (?, ?);",[result['insertId'],question],(err,reslt,fields)=>{
            if (err) reject(err);
            if(index===req.body.questions.length-1){
              resolve({
                tests:result,
                test_questions:reslt
              })
            }
          })
        });
      }).catch(err=>{
        return reject(err);
      })
    })

    questionsPromise.then(result=>{
      connection.query("INSERT INTO `tests_branch` (`test_id`,`branch_id`) VALUES (?,?);",[result.tests['insertId'],req.body.branch_id],(err,reslt,fields)=>{
        if (err) return res.status(400).send(err)
        res.send(result.tests)
      })
    }).catch(err=>{
      return res.status(400).send(err)
    })

})

// Start Test
router.post('/start_test',(req,res)=>{
    connection.query("INSERT INTO `attended_test` (`test_id`, `user_id`) VALUES (?, ?);",[req.body.test_id,req.body.user_id],(err,result,fields)=>{
        if (err) return res.status(400).send(err);
        return res.send(result)
    })
})

router.post('/notice',(req,res)=>{
    connection.query("INSERT INTO `notice_board` (`faculty_id`, `notice_heading`, `notice`) VALUES (?, ?, ?);",[req.body.faculty_id,req.body.notice_heading,req.body.notice],(err,result,fields)=>{
        if (err) return res.status(400).send(err);
        return res.send(result)
    })
})

//

router.post('/populate',(req,res)=>{
  req.body.data.forEach((data,index)=>{
    connection.query("INSERT INTO `questions_mcq` (`question_title`, `option_set`, `correct_answer`, `points`, `difficulty_level`, `time_limit`, `created_by`) VALUES (?, ?, ?, ?, ?, ?, ?);",[data.question_title,data.option_set,data.correct_answer,1,data.difficulty_level,data.time_limit,parseInt(data.created_by)],(err,result,fields)=>{
        if (err) return res.status(400).send(err);
        if(index == req.body.data.length-1)
          return res.send(result)
      })
    })
  })


// router.post('/populate_topic',(req,res)=>{
//   req.body.data.forEach((data,index)=>{
//     connection.query("INSERT INTO `mcq_topic` (`q_id`, `topic_id`) VALUES (?, ?);",[index+12,data['topics'][0]],(err,result,fields)=>{
//         if (err) return res.status(400).send(err);
//         if(index == req.body.data.length-1)
//           return res.send(result)
//       })
//     })
//   })



module.exports = router;
