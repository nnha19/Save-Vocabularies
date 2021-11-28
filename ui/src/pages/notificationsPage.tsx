import React from "react";
import { useHistory } from "react-router";
import Layout from "../components/Common/Layout/Layout";
import Notifications from "../components/Notifications/Notifications";
import { useAuthContext } from "../customHooks/useAuthContext";

const NotificationsPage = () => {
  const {
    user: { notifications },
  } = useAuthContext();
  const history = useHistory();
  return (
    <Layout>
      {notifications.length > 0 ? (
        <Notifications notifications={notifications} />
      ) : (
        <div className="h-full flex-col w-full flex items-center justify-center">
          <p className="text-xl">Your notifications will appear here.</p>
          <p>Go turn on noti bell to start receiving notifications</p>
          <button
            onClick={() => history.push(`/users`)}
            className="px-4 py-2 bg-primaryColor text-white mt-4 rounded-md"
          >
            Go
          </button>
        </div>
      )}
    </Layout>
  );
};

export default NotificationsPage;
