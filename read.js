const express = require("express");
const router = express.Router();
const connection = require("./config/database");
const date = require('date-and-time')
// Read Branches
router.get("/branches", (req, res) => {
  connection.query(
    "SELECT * FROM branches;",
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

// Read upcoming tests
router.get("/upcomingTests", (req, res) => {
  // "SELECT t.test_id,b.branch_id, b.branch_name, ts.test_name,f.name as faculty_name, ts.duration, ts.questions, ts.marks, ts.deadline,ts.status from `tests_branch` t INNER join `branches` b on t.branch_id = b.branch_id INNER join `tests` ts on t.test_id = ts.id INNER JOIN `faculty` f ON ts.faculty_id = f.id where b.branch_id=? AND ts.deadline > CURRENT_TIMESTAMP AND ts.status='enabled' AND t.test_id NOT IN(select test_id from `attended_test` WHERE user_id=?);",
  connection.query(
    "SELECT ts.id, ts.test_name,f.name as faculty_name, ts.duration, ts.questions, ts.marks, ts.deadline, ts.status from `tests` ts LEFT JOIN `faculty` f ON ts.faculty_id = f.id where ts.deadline > CURRENT_TIMESTAMP AND ts.status='enabled' AND ts.id NOT IN(select test_id from `attended_test` WHERE user_id=?);",
    [req.query.usn],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);      
      return res.send(results);
    }
  );
});

// Read test parts
router.get("/test_parts", (req, res) => {
  connection.query(
    "SELECT t.deadline,tp.part_name,tp.questions,tp.marks,tp.duration FROM `tests` t LEFT JOIN `tests_parts` tp ON tp.test_id = t.id WHERE t.id = ?;",
    [req.query.test_id],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      // var minutesLeft = date.subtract(,new Date()).toMinutes()
      // var timeRemaining = new Date(minutesLeft * 60 * 1000).toISOString().substr(11, 8)
      return res.send(results);
    }
  );
});

router.get("/attended_tests", (req, res) => {
  connection.query(
    "SELECT a.id,t.test_name, f.name,a.attended_date,t.marks,a.score FROM `attended_test` a INNER JOIN `tests` t ON a.test_id=t.id INNER JOIN `students` s ON s.usn=a.user_id INNER JOIN `faculty` f ON f.id=t.faculty_id WHERE a.user_id=?;",
    [req.query.usn],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

router.get("/user_stats", (req, res) => {
  connection.query(
    "select s1.tests_attended,s1.total_score,(SELECT count(*) FROM `tests` t INNER JOIN `tests_branch` tb ON t.id=tb.test_id WHERE t.deadline < CURRENT_TIMESTAMP AND t.id NOT IN(SELECT ats.test_id FROM `attended_test` ats WHERE ats.user_id = ?) AND branch_id = ?) AS tests_missed, (select count(distinct total_score) from `students` s2 WHERE s2.total_score >= s1.total_score) as 'overall_rank' from `students` s1 WHERE s1.usn=?;",
    [req.query.usn,req.query.branch_id,req.query.usn],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(...results);
    }
  );
});

router.get("/topic_score", (req, res) => {
  connection.query(
    "SELECT score,topic_name FROM `student_topic_score` sts INNER JOIN `topics` t ON sts.topic_id = t.topic_id WHERE user_id=?;",
    [req.query.usn],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

router.get("/leaderboard", (req, res) => {
  connection.query(
    "select s1.name,s1.usn, s1.tests_attended,s1.total_score, (select count(distinct total_score) from `students` s2 WHERE s2.total_score >= s1.total_score)as 'rank' from `students` s1 order by s1.total_score desc LIMIT 10;",
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

router.get("/noticeboard", (req, res) => {
  connection.query(
    "SELECT nb.id,notice_heading,notice,notice_date,name FROM `notice_board` nb INNER JOIN `faculty` f ON nb.faculty_id = f.id ORDER BY notice_date DESC;",
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});
router.get("/branches", (req, res) => {
  connection.query(
    "SELECT * FROM `branches`;",
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

router.get("/test", (req, res) => {
  connection.query(
    "SELECT qm.question_id,qm.question_title,qm.option_set,qm.points,qm.difficulty_level,qm.time_limit FROM `test_questions` tq INNER JOIN `questions_mcq` qm ON tq.question_id = qm.question_id WHERE test_id = ? ORDER BY RAND ();",
    [req.query.test_id],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

router.get("/testInfo", (req, res) => {
  connection.query(
    "SELECT * FROM `tests` where id = ?;",
    [parseInt(req.query.test_id)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(...results);
    }
  );
});

router.get('/all_tests',(req, res)=>{
  let query = `SELECT t.id,test_name,faculty_id,name,duration,questions,marks,status,deadline,(select count(*) from \`tests\`) as total_records FROM \`tests\` t INNER JOIN \`faculty\` f ON f.id = t.faculty_id WHERE 1`
  if(req.query.branch_id!=0){
    query = `SELECT t.id,test_name,faculty_id,name,duration,questions,marks,status,deadline,(select count(*) from \`tests_branch\` tb INNER JOIN \`tests\` t ON tb.test_id = t.id WHERE tb.branch_id = ${req.query.branch_id}) as total_records FROM \`tests_branch\` tb INNER JOIN \`tests\` t ON tb.test_id = t.id INNER JOIN \`faculty\` f ON f.id = t.faculty_id WHERE branch_id = ${req.query.branch_id} `
  }
  if(req.query.show=='enabled' || req.query.show == 'disabled'){
    query+= `AND status = '${req.query.show}'`
  }
  query += " AND (test_name LIKE ? OR deadline LIKE ? OR name LIKE ?) ORDER BY deadline LIMIT ? OFFSET ?;"
  connection.query(
    query,
    ['%'+req.query.query+'%','%'+req.query.query+'%','%'+req.query.query+'%',parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/faculty_tests',(req, res)=>{
  let query = "SELECT id,test_name,faculty_id,duration,questions,marks,status,deadline,(select count(*) from `tests` where faculty_id = ?) as total_records FROM `tests` WHERE faculty_id = ?"
  if(req.query.show=='enabled' || req.query.show == 'disabled'){
    query+= `AND status = '${req.query.show}'`
  }
  query += " AND (test_name LIKE ? OR deadline LIKE ?) ORDER BY deadline LIMIT ? OFFSET ?;"
  connection.query(
    query,
    [req.query.faculty_id,req.query.faculty_id,'%'+req.query.query+'%','%'+req.query.query+'%',parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/test_questions',(req, res)=>{
  connection.query(
    "SELECT f.name,tq.question_id,question_title,option_set,correct_answer,points,difficulty_level,time_limit FROM `test_questions` tq INNER JOIN `questions_mcq` qm on tq.question_id = qm.question_id INNER JOIN `faculty` f ON f.id = qm.created_by WHERE test_id = ?;",
    [parseInt(req.query.test_id)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

// router.get('/test_test',(req, res)=>{
//   connection.query(
//     "SELECT * FROM `questions_mcq` qm WHERE question_id NOT IN (?);",
//     [[1,2,3]],
//     (err, results, fields) => {
//       if (err) return res.status(400).send(err);
//       return res.send(results);
//     }
//   );
// })

router.get('/view_results',(req, res)=>{
  connection.query(
    "SELECT t.marks,user_id,test_id,name,attended_date,score,time_taken,(SELECT count(*) FROM `attended_test` where test_id=?) as total_records FROM `attended_test` a INNER JOIN `students` s ON a.user_id = s.usn INNER JOIN `tests` t ON t.id=a.test_id WHERE test_id = ? ORDER BY a.score DESC limit ? offset ?",
    [req.query.test_id,req.query.test_id,parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/students',(req, res)=>{
  let query;
  if(req.query.branch_id!=0){
    query = `SELECT usn,name,email,semester,tests_attended,(SELECT count(*) FROM \`tests\` tx INNER JOIN \`tests_branch\` tbx ON tx.id=tbx.test_id WHERE tx.deadline < CURRENT_TIMESTAMP AND tx.id NOT IN(SELECT atsx.test_id FROM \`attended_test\` atsx WHERE atsx.user_id = usn) AND tbx.branch_id = branch) AS tests_missed,total_score,verified,branch_name, (SELECT count(*) FROM \`students\` WHERE branch=${parseInt(req.query.branch_id)} ${req.query.semester!=0?`AND semester = ${parseInt(req.query.semester)} `:''} ${req.query.status!=-1?`AND verified = ${req.query.status}`:''} ) as total_records FROM \`students\` s INNER JOIN \`branches\` b ON b.branch_id = s.branch  WHERE branch= ${parseInt(req.query.branch_id)} ${req.query.status!=-1?` AND verified = ${req.query.status} `:' '}`
  }else{
    query = `SELECT usn,name,email,semester,tests_attended,(SELECT count(*) FROM \`tests\` tx INNER JOIN \`tests_branch\` tbx ON tx.id=tbx.test_id WHERE tx.deadline < CURRENT_TIMESTAMP AND tx.id NOT IN(SELECT atsx.test_id FROM \`attended_test\` atsx WHERE atsx.user_id = usn) AND tbx.branch_id = branch) AS tests_missed,total_score,verified,branch_name, (SELECT count(*) FROM \`students\` WHERE 1 ${req.query.semester!=0?`AND semester = ${parseInt(req.query.semester)} `:''} ${req.query.status!=-1?` AND verified = ${req.query.status} `:' '}) as total_records FROM \`students\` s INNER JOIN \`branches\` b ON b.branch_id = s.branch  WHERE 1 ${req.query.status!=-1?` AND verified = ${req.query.status} `:' '} `
  }
  if(req.query.semester!=0){
    query+=` AND semester = ${req.query.semester} `
  }
  query+='AND (usn LIKE ? OR name LIKE ? OR email LIKE ?) ORDER BY total_score DESC LIMIT ? OFFSET ?;'
  connection.query(
    query,
    ['%' + req.query.query + '%','%' + req.query.query + '%','%' + req.query.query + '%',parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/faculties',(req, res)=>{
  let query;
  if(req.query.branch_id!=0){
    query = `SELECT id,employee_id,name,email,branch_name,verified,(SELECT count(*) FROM \`faculty\` WHERE branch=${parseInt(req.query.branch_id)} ${req.query.status!=-1?`AND verified = ${req.query.status}`:''}) as total_records FROM \`faculty\` f INNER JOIN branches b ON f.branch = b.branch_id WHERE branch= ${parseInt(req.query.branch_id)} ${req.query.status!=-1?` AND verified = ${req.query.status} `:' '}`
  }else{
    query = `SELECT id,employee_id,name,email,branch_name,verified,(SELECT count(*) FROM \`faculty\` ${req.query.status!=-1?`WHERE verified = ${req.query.status}`:''}) as total_records FROM \`faculty\` f INNER JOIN branches b on f.branch = b.branch_id WHERE 1 ${req.query.status!=-1?`AND verified = ${req.query.status}`:''} `
  }

  query+='AND (name LIKE ? OR employee_id LIKE ? OR email LIKE ?) LIMIT ? OFFSET ?;'
  connection.query(
    query,
    ['%' + req.query.query + '%','%' + req.query.query + '%','%' + req.query.query + '%',parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/question_by_id',(req, res)=>{
  connection.query(
    "SELECT question_id,question_title,option_set,date_created,correct_answer,points,difficulty_level,time_limit FROM `questions_mcq` qm WHERE qm.created_by=? AND qm.question_id=?", [parseInt(req.query.faculty_id),parseInt(req.query.id)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      if (!results || results.length==0) return res.send('No data found')
      connection.query(
        "SELECT mt.topic_id,topic_name FROM `mcq_topic` mt INNER JOIN `topics` t ON mt.topic_id = t.topic_id WHERE mt.q_id = ?;",
        [results[0]['question_id']],
        (error, reslt, fields) => {
          if (error) return res.status(400).send(error);

          let body = {
            ...results,
            topics:reslt
          }
          return res.send(body)
        });
    });
})

router.get('/admin_question_by_id',(req, res)=>{
  connection.query(
    "SELECT question_id,question_title,option_set,date_created,correct_answer,points,difficulty_level,time_limit FROM `questions_mcq` qm INNER JOIN `faculty` f ON f.id = qm.created_by WHERE qm.question_id=?", [parseInt(req.query.id)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      if (!results || results.length==0) return res.send('No data found')
      connection.query(
        "SELECT mt.topic_id,topic_name FROM `mcq_topic` mt INNER JOIN `topics` t ON mt.topic_id = t.topic_id WHERE mt.q_id = ?;",
        [results[0]['question_id']],
        (error, reslt, fields) => {
          if (error) return res.status(400).send(error);
          let body = {
            ...results,
            topics:reslt
          }
          return res.send(body)
        });
    });
})

router.get('/questions',(req, res)=>{
  let query = `SELECT qm.question_id,qm.question_title,(SELECT count(DISTINCT q_id) FROM \`mcq_topic\` mtc LEFT JOIN \`questions_mcq\` qmq ON mtc.q_id = qmq.question_id WHERE qmq.created_by=${req.query.faculty_id} ${req.query.topic_id!=0?`AND topic_id = ${req.query.topic_id}`:''}) as total_records FROM \`mcq_topic\` mt LEFT JOIN \`questions_mcq\` qm ON mt.q_id = qm.question_id  WHERE question_title LIKE ? ${req.query.topic_id!=0?`AND topic_id = ${req.query.topic_id}`:''} AND created_by = ? GROUP BY qm.question_id ORDER BY date_created DESC LIMIT ? OFFSET ?;`
  connection.query(
    query, ['%'+req.query.query+'%',parseInt(req.query.faculty_id),parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/notices',(req, res)=>{
  let query = `SELECT nbx.id,notice_heading,notice,notice_date,(SELECT count(id) FROM \`notice_board\` nb WHERE nb.faculty_id=${req.query.faculty_id}) as total_records FROM \`notice_board\` nbx WHERE (nbx.notice_heading LIKE ? OR nbx.notice LIKE ?) AND faculty_id = ? ORDER BY notice_date DESC LIMIT ? OFFSET ?;`
  connection.query(
    query, ['%'+req.query.query+'%','%'+req.query.query+'%',parseInt(req.query.faculty_id),parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/all_notices',(req, res)=>{
  let query = `SELECT nbx.id,name,notice_heading,notice,notice_date,(SELECT count(nb.id) FROM \`notice_board\` nb INNER JOIN \`faculty\` fx ON fx.id = nb.faculty_id WHERE 1 ${req.query.branch_id!=0?` AND fx.branch = ${req.query.branch_id}`:''}) as total_records FROM \`notice_board\` nbx INNER JOIN \`faculty\` f ON f.id = nbx.faculty_id INNER JOIN \`branches\` b ON b.branch_id = f.branch WHERE (nbx.notice_heading LIKE ? OR nbx.notice LIKE ?) ${req.query.branch_id!=0?` AND f.branch = ${req.query.branch_id}`:''}  ORDER BY notice_date DESC LIMIT ? OFFSET ?;`
  connection.query(
    query, ['%'+req.query.query+'%','%'+req.query.query+'%',parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/admin_questions',(req, res)=>{
  let query = `SELECT qm.question_id,qm.question_title,qm.option_set,qm.correct_answer,qm.points,qm.difficulty_level,qm.time_limit,f.name,(SELECT count(DISTINCT q_id) FROM \`mcq_topic\` mtc LEFT JOIN \`questions_mcq\` qmq ON mtc.q_id = qmq.question_id WHERE 1 ${req.query.topic_id!=0?`AND topic_id = ${req.query.topic_id}`:''}) as total_records FROM \`mcq_topic\` mt LEFT JOIN \`questions_mcq\` qm ON mt.q_id = qm.question_id LEFT JOIN faculty f ON f.id = qm.created_by WHERE question_title LIKE ? ${req.query.topic_id!=0?`AND topic_id = ${req.query.topic_id}`:''} GROUP BY qm.question_id ORDER BY date_created DESC LIMIT ? OFFSET ?;`
  connection.query(
    query, ['%'+req.query.query+'%',parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/get_all_questions',(req, res)=>{
  let query = `SELECT qm.question_id,qm.question_title,f.name,qm.option_set,qm.correct_answer,qm.points,qm.difficulty_level,qm.time_limit,(SELECT count(DISTINCT q_id) FROM \`mcq_topic\` ${req.query.topic_id!=0?`WHERE topic_id = ${req.query.topic_id}`:''}) as total_records FROM \`mcq_topic\` mt LEFT JOIN \`questions_mcq\` qm ON mt.q_id = qm.question_id INNER JOIN \`faculty\` f ON f.id = qm.created_by WHERE question_title LIKE ? ${req.query.topic_id!=0?`AND topic_id = ${req.query.topic_id}`:''} GROUP BY qm.question_id ORDER BY date_created DESC LIMIT ? OFFSET ?;`
  connection.query(
    query, ['%'+req.query.query+'%',parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results)
    }
  );
})

router.get('/topics',(req, res)=>{
  connection.query(
    "SELECT * FROM `topics`;",
    [req.query.test_id,req.query.test_id,parseInt(req.query.rows),parseInt(req.query.first)],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/branches_info',(req, res)=>{
  connection.query(
    "select b.branch_id, b.branch_name,(SELECT count(*) FROM `faculty` f WHERE f.branch = b.branch_id) as faculty_count,(SELECT count(*) FROM `students` s WHERE s.branch = b.branch_id) as student_count from branches b;",
    [],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/topics_info',(req, res)=>{
  connection.query(
    "SELECT *, (SELECT count(*) FROM `mcq_topic`mt WHERE mt.topic_id = t.topic_id) as no_questions FROM `topics` t;",
    [],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
})

router.get('/student_info',(req, res)=>{
  connection.query(
    "SELECT usn,name,email,branch,semester FROM `students` WHERE usn = ?;",
    [req.query.usn],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(...results);
    }
  );
})

router.get('/faculty_info',(req, res)=>{
  connection.query(
    "SELECT employee_id,name,email,branch FROM `faculty` WHERE id = ?;",
    [req.query.id],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(...results);
    }
  );
})



module.exports = router;