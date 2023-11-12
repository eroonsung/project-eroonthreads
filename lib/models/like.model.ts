import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
  likeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isLiked: {
    type: Boolean,
  },
});

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default Like;
