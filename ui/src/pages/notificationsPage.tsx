import React from "react";
import Layout from "../components/Common/Layout/Layout";
import Notifications from "../components/Notifications/Notifications";
import { useAuthContext } from "../customHooks/useAuthContext";

const NotificationsPage = () => {
  const {
    user: { notifications },
  } = useAuthContext();
  return (
    <Layout>
      {notifications.length > 0 && (
        <Notifications notifications={notifications} />
      )}
    </Layout>
  );
};

export default NotificationsPage;
