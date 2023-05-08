const express = require("express");
const router = express.Router();
const connection = require("./config/database");

router.delete("/delete_test", (req, res) => {
  connection.query(
    "DELETE FROM tests WHERE `tests`.`id` = ?",
    [req.query.test_id],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

router.delete("/delete_question", (req, res) => {
  connection.query(
    "DELETE FROM `questions_mcq` WHERE `question_id` = ?",
    [req.query.question_id],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

router.delete("/delete_student", (req, res) => {
  connection.query(
    "DELETE FROM `students` WHERE `usn` = ?",
    [req.query.usn],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

router.delete("/delete_faculty", (req, res) => {
  connection.query(
    "DELETE FROM `faculty` WHERE `id` = ?",
    [req.query.id],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

router.delete("/delete_branch", (req, res) => {
  connection.query(
    "DELETE FROM `branches` WHERE `branch_id` = ?",
    [req.query.branch_id],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});

router.delete("/delete_topic", (req, res) => {
  connection.query(
    "DELETE FROM `topics` WHERE `topic_id` = ?",
    [req.query.topic_id],
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      return res.send(results);
    }
  );
});




module.exports = router;
