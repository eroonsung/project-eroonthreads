"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Thread from "../models/thread.model";
import Like from "../models/like.model";
import { Children } from "react";

interface Params {
  threadId: string;
  likeId: string;
  isLiked: boolean;
  path: string;
}

export async function updateLike({ threadId, likeId, isLiked, path }: Params) {
  connectToDB();
  try {
    const user = await User.findOne({ id: likeId });
    const thread = await Thread.findOne({ _id: threadId });
    const like = await Like.findOne({ threadId: threadId, likeId: user._id });

    // 만약에 threadId에 해당 currentId가 likeId에 존재하지 않으면 새로 Likes create
    if (like === null) {
      // Create the new like info
      const newLike = new Like({
        threadId,
        likeId: user._id,
        isLiked,
      });
      const createdLikes = await newLike.save();
      thread.likes.push(createdLikes._id);
      await thread.save();

      return createdLikes;
    }
    // 만약에 threadId에 해당 currentId가 likeId에 존재하면 isLike update
    else {
      //Update Like model
      await Like.updateOne({ _id: like._id }, { isLiked });
      revalidatePath(path);
    }
  } catch (error) {
    console.error("Error while update like:", error);
    throw new Error("Unable to update Like");
  }
}

export async function fetchLikes(threadId: string, curretnId: string) {
  const user = await User.findOne({ id: curretnId });
  const like = await Like.findOne({ threadId: threadId, likeId: user._id });

  let isLiked = true;

  if (like === null || like.isLiked === false) {
    isLiked;
  } else {
    isLiked = false;
  }

  return isLiked;
}

