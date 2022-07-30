import { capitalCase } from "change-case";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Tab, Box, Card, Tabs, Container } from "@mui/material";
import Iconify from "../../components/Iconify";
import useSettings from "../../hooks/useSettings";
import Page from "../../components/Page";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../redux/slices/userSlice";
import { Profile, ProfileCover, ProfileGallery } from "../../sections/user/profile";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

export default function MyProfile() {
  const [currentTab, setCurrentTab] = useState("profile");
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(1));
  }, [dispatch]);

  const _myData = {
    avatarUrl: "https://avatars.githubusercontent.com/u/27476079?v=4",
    company: "OREL IT",
    country: "Sri Lanka",
    cover: "https://www.leonardodavinci.net/images/davinci-genius.jpg",
    email: "kalanah1996@gmail.com",
    facebookLink: "https://www.facebook.com/hellocalculus/",
    follower: 0,
    following: 0,
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
    instagramLink: "https://www.instagram.com/le_artiste/",
    linkedinLink: "https://www.linkedin.com/in/kalanahe/",
    position: "Software Engineer",
    quote: "Hello World",
    role: "Software Engineer",
    school: "University college dublin, Ireland",
    twitterLink: "https://twitter.com/le_artiste96",
  };

  const _myFeed = [
    {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
      author: {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9",
        avatarUrl: "https://avatars.githubusercontent.com/u/27476079?v=4",
        name: "Kalana Hettiarachchi",
      },
      isLiked: true,
      createdAt: "2022-07-22T18:50:59.152Z",
      media: "https://miro.medium.com/max/1400/0*Nct9kEIKF_-_kAgg",
      message: "Decoding reality.",
      personLikes: [
        {
          name: "Ramesh Chathuranga",
          avatarUrl:
            "https://media-exp1.licdn.com/dms/image/C5603AQGxofAaNNe93w/profile-displayphoto-shrink_200_200/0/1648406448560?e=1659571200&v=beta&t=OqM7dvNzub52pmQ0TtbS_JwHWv2oOdVSrTzAxMZF9VM",
        },
        {
          name: "Kalana Hettiarachchi",
          avatarUrl: "https://avatars.githubusercontent.com/u/27476079?v=4",
        },
      ],
    },
  ];

  const _myGallery = [
    {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
      title: "Backstage - NSBM Open Day 2019",
      postAt: "2019-08-11T19:20:49.368Z",
      imageUrl:
        "https://scontent.fcmb1-2.fna.fbcdn.net/v/t1.6435-9/67793659_647209542426587_4083148279284498432_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=BOzsjQ-pS9sAX89JGmy&_nc_ht=scontent.fcmb1-2.fna&oh=00_AT8ib6SiNRXTZUzBL_81FIR7X5MMnsD_Rv_W6f-Qaw0x2w&oe=6301E426",
    },
    {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
      title: "Friends",
      postAt: "2018-05-11T18:18:49.369Z",
      imageUrl:
        "https://scontent.fcmb1-2.fna.fbcdn.net/v/t1.6435-9/83709758_776271986187008_3259005975725604864_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=d-0Q1Uaji5wAX-SMceU&_nc_ht=scontent.fcmb1-2.fna&oh=00_AT8sBelw8_CzL2X2wZUh8ArLTpvM2XoJQZ2so57OXxY_EQ&oe=62FF0098",
    },
    {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
      title: "Protest against the corrupt politicians - Colombo, Sri Lanka",
      postAt: "2022-04-04T17:18:49.369Z",
      imageUrl:
        "https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-6/277725051_1297165007431034_5846739917574260165_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Z5oaEvpyBkwAX_weHSI&_nc_ht=scontent.fcmb1-2.fna&oh=00_AT8-AhKtnVkoQMl7OEji_t-OB9yqLru0qySb5WetaLlKpg&oe=62DF6A97",
    },
    {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
      title: "Friends",
      postAt: "2018-02-05T16:18:49.369Z",
      imageUrl:
        "https://scontent.fcmb1-2.fna.fbcdn.net/v/t1.6435-9/83973158_779036639243876_87591782077956096_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=cgRS-5pxFUsAX_wdbtm&_nc_ht=scontent.fcmb1-2.fna&oh=00_AT-jdCrzddxJcO1AS7hKFqpnyvzwvIW_wFsx_TstqhD0jg&oe=630095D5",
    },
    {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",
      title: "First job",
      postAt: "2018-10-11T16:18:49.369Z",
      imageUrl:
        "https://scontent.fcmb1-2.fna.fbcdn.net/v/t1.6435-9/43724204_485024991978377_6766209190839975936_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=usyBdhY0eIMAX_MEUJT&_nc_ht=scontent.fcmb1-2.fna&oh=00_AT_rKjBr8ReP7mwIkBgBsemt4i7A2YZCWII_qPTts-hrHQ&oe=6300E3E0",
    },
  ];

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <Profile myProfile={_myData} posts={_myFeed} />,
    },
    {
      value: "gallery",
      icon: <Iconify icon={"ic:round-perm-media"} width={20} height={20} />,
      component: <ProfileGallery gallery={_myGallery} />,
    },
  ];

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover myProfile={_myData} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => setCurrentTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
