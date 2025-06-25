import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
                avatar={<Avatar src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/avatar/${comment.user.avatar}`} />}
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
