import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const NewProfiles = ({ mobile }) => {
  const { newProfiles } = useProfileData();

  const profilesToShow = mobile ? newProfiles.results.slice(0, 4) : newProfiles.results.slice(0, 5);


  return (
    <Container
      className={`${appStyles.NewUsers} ${
        mobile ? "d-lg-none text-center mb-3" : "d-none d-lg-block mb-3"
      }`}
    >
      {newProfiles.results.length ? (
        <>
          <p><strong>New Users</strong></p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {profilesToShow.map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            <div>
            {profilesToShow.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))}
            </div>
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default NewProfiles;
