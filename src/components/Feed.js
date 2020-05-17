import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Feed = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return <Fragment>Feed</Fragment>;
};

export default Feed;
