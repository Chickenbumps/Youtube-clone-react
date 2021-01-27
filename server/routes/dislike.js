const express = require("express");
const router = express.Router();

const { Dislike } = require("../models/Dislike");
const { Like } = require("../models/Like");
router.post("/getDislikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  Dislike.find(variable).exec((err, dislike) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislike });
  });
});

router.post("/onDislike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  const dislike = new Dislike(variable);
  dislike.save((err, dl) => {
    if (err) return res.status(400).send(err);
    Like.findOneAndDelete(variable).exec((err, result) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
    });
  });
});

router.post("/offDislike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  Dislike.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

module.exports = router;
