import PropTypes from "prop-types";
import { Grid, Stack } from "@mui/material";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowInfo from "./ProfileFollowInfo";
import ProfileSocialInfo from "./ProfileSocialInfo";
import ProfilePostCard from "./ProfilePostCard";

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile({ myProfile, posts }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
