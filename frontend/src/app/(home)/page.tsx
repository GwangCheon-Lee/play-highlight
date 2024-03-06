"use client";
import Header from "@/components/common/Header";
import styles from "./home.module.scss";
import VideoCard from "@/app/(home)/VideoCard";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/selectors";
import { fetchVideos } from "@/store/features/video/videoSlice";
import NoVideos from "@/app/(home)/NoVideos";

export default function Home() {
  const dispatch = useAppDispatch();
  const { videos, nextCursor, status } = useAppSelector((state) => state.video);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videos.length <= 0) {
      dispatch(fetchVideos({ cursor: null, limit: 25 }));
    }
  }, [videos, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextCursor !== null) {
        dispatch(fetchVideos({ cursor: nextCursor, limit: 25 }));
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [dispatch, nextCursor]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.section}>
          {videos.length > 0
            ? videos.map((video) => (
                <VideoCard
                  key={video.id}
                  videoId={video.uuid}
                  alt={`Video by ${video.user.nickname}`}
                  src={`/static/videos/${video.thumbnailPath}`}
                  nickname={video.user.nickname}
                  createdAt={new Date(video.createdAt)}
                  email={video.user.email}
                />
              ))
            : status !== "loading" && <NoVideos />}
          {status === "loading" && <p>Loading...</p>}
          <div ref={sentinelRef} />
        </section>
      </main>
    </>
  );
}
