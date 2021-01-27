const express = require("express");
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");
router.post("/getLikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  Like.find(variable).exec((err, like) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, like });
  });
});

router.post("/onLike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  const like = new Like(variable);

  like.save((err, l) => {
    if (err) return res.status(400).send(err);
    Dislike.findOneAndDelete(variable).exec((err, dis) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
    });
  });
});

router.post("/offLike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  Like.findOneAndDelete(variable).exec((err, l) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

module.exports = router;
