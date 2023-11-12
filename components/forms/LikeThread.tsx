"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { updateLike, fetchLikes } from "@/lib/actions/like.actions";

interface Props {
  threadId: string;
  isLiked: boolean;
  currentUserId: string;
}

function LikeThread({ threadId, isLiked, currentUserId }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const clickHeart = async () => {
    const like = await fetchLikes(JSON.parse(threadId), currentUserId);

    if (currentUserId === "") {
      router.push("/onboarding");
    }

    await updateLike({
      threadId: JSON.parse(threadId),
      likeId: currentUserId,
      isLiked: like,
      path: pathname,
    });
  };

  return (
    <Image
      src={
        isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"
        // "/assets/heart-filled.svg"
      }
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={clickHeart}
    />
  );
}

export default LikeThread;
