import { Avatar, Card, CardHeader, CardContent, Typography } from '@mui/material';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const CommentCard = ({ comment,handleJump }:
                     { comment: ITrackComment;handleJump: (moment:number) => void }) => {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    return (
        <Card sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3, width: '100%' }}>
            <CardHeader
                avatar={<Avatar src={'/avatar/user.png'} />}
                title={comment.user?.name || 'Unknown user'}
                subheader={`${dayjs(comment.createdAt).fromNow()}`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                     At <b onClick={() => handleJump(comment.moment)}>{formatTime(comment.moment)}</b>
                </Typography>
                <Typography variant="body1">{comment.content}</Typography>
            </CardContent>
        </Card>
    );
};

export default CommentCard;
