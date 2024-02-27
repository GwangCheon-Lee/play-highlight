import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import {fetchFindVideo} from "../../common/services/videos/videosService";
import {videoDetails} from "../../common/types/api/videos/videoTypes";
import styled from "styled-components";
import Header from "../../common/components/Header";
import {Helmet} from "react-helmet-async";


const Main = styled.main`
    padding: 0 15%;
    height: calc(100vh - 69px);
    overflow: auto;

    @media (max-width: 640px) {
        padding: 0;
    }
`;

const Section = styled.section`
    padding: 20px 0;
`;

const VideoDetail: React.FC = () => {
    const {uuid} = useParams<{ uuid: string }>();
    const [videoData, setVideoData] = useState<videoDetails | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                if (uuid === undefined) return
                const {video: videoDetail} = await fetchFindVideo(uuid)
                setVideoData(videoDetail);
            } catch (error) {
                console.error('Failed to fetch video data', error);
            }
        };

        if (uuid) {
            fetchVideoData();
        }
    }, [uuid]);

    if (!videoData) return <div>Loading...</div>;


    return (
        <>
            <Helmet>
                {/* Open Graph / Facebook 메타데이터 */}

                <meta property="og:type" content="video.other"/>
                <meta property="og:url"
                      content={`${window.location.origin}/static/videos/${videoData.hlsFilePath.replace('output.m3u8', 'video.mp4')}`}/>
                <meta property="og:title" content={"video title test"}/>
                <meta property="og:description" content={"video description test"}/>
                <meta property="og:image"
                      content={`${window.location.origin}/static/videos/${videoData.thumbnailPath}`}/>
                <meta property="og:video"
                      content={`${window.location.origin}/static/videos/${videoData.hlsFilePath.replace('output.m3u8', 'video.mp4')}`}/>
                <meta property="og:video:width" content="640"/>
                <meta property="og:video:height" content="360"/>
                <meta property="og:video:type" content="video/mp4"/>


                {/* Twitter Card 메타데이터 */}
                <meta name="twitter:card" content="player"/>
                <meta name="twitter:title" content={'video title test'}/>
                <meta name="twitter:description" content={"video description test"}/>
                <meta name="twitter:image"
                      content={`${window.location.origin}/static/videos/${videoData.thumbnailPath}`}/>
                <meta name="twitter:player"
                      content={`${window.location.origin}/static/videos/${videoData.hlsFilePath.replace('output.m3u8', 'video.mp4')}`}/>
                <meta name="twitter:player:width" content="640"/>
                <meta name="twitter:player:height" content="360"/>
                <meta name="twitter:player:stream"
                      content={`${window.location.origin}/static/videos/${videoData.hlsFilePath.replace('output.m3u8', 'video.mp4')}`}/>
                <meta name="twitter:player:stream:content_type" content="video/mp4"/>


            </Helmet>
            <Header/>
            <Main>
                <Section>
                    <VideoPlayer url={`${window.location.origin}/static/videos/${videoData.hlsFilePath}`}
                                 poster={`${window.location.origin}/static/videos/${videoData.thumbnailPath}`}/>
                </Section>
            </Main>
        </>

    );
};

export default VideoDetail;
