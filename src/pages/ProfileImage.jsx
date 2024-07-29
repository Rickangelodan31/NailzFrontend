import classes from "./ProfileImage.module.css";

const ProfileImage = ({ imgSrc }) => {
  return <img src={imgSrc} className={classes.profile} alt="profile" />;
};

export default ProfileImage;
