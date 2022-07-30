import PropTypes from "prop-types";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Card,
  Stack,
  Avatar,
  AvatarGroup,
  Checkbox,
  Typography,
  CardHeader,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
import Image from "../../../components/Image";
import Iconify from "../../../components/Iconify";
import MyAvatar from "../../../components/MyAvatar";

ProfilePostCard.propTypes = {
  post: PropTypes.object,
};

export default function ProfilePostCard({ post }) {
  const { user } = useAuth();
  const [isLiked, setLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.personLikes.length);

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar src={post?.author.avatarUrl} />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
            {user?.firstName} {user?.lastName}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography>{post.message}</Typography>

        <Image alt="post media" src={post.media} ratio="16/9" sx={{ borderRadius: 1 }} />

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Iconify icon={"eva:heart-fill"} />}
                checkedIcon={<Iconify icon={"eva:heart-fill"} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />
          <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 32, height: 32 } }}>
            {post.personLikes.map((person) => (
              <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
            ))}
          </AvatarGroup>
        </Stack>
      </Stack>
    </Card>
  );
}
