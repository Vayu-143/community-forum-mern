import {
  useEffect,
  useState,
} from "react";

import {
  getProfile,
} from "../services/userService";

function Profile() {
  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const { data } =
        await getProfile(token);

      console.log(data);

      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow border-0 p-5 text-center">

        <div className="mb-3">
          <i className="bi bi-person-circle display-1"></i>
        </div>

        <h2>
          {profile.name}
        </h2>

        <p>
          {profile.email}
        </p>

        <hr />

        <div className="row">

          <div className="col-md-4">
            <h4>
              Discussions
            </h4>

            <h2>
              {profile.discussions}
            </h2>
          </div>

          <div className="col-md-4">
            <h4>
              Comments
            </h4>

            <h2>
              {profile.comments}
            </h2>
          </div>

          <div className="col-md-4">
            <h4>
              Joined
            </h4>

            <p>
              {profile.createdAt
                ? new Date(
                    profile.createdAt
                  ).toLocaleDateString(
                    "en-GB"
                  )
                : "N/A"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;