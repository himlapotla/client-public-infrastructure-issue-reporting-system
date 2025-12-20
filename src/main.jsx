import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePageLayout from './Componantes/Layout/HomePageLayout.jsx';
import AuthProider from './Componantes/Provider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import Login from './Componantes/MainComponents/Login.jsx';
import Register from './Componantes/MainComponents/Register.jsx';
import DashboardLayout from './Componantes/Layout/DashboardLayout.jsx';
import ManageStaff from './Componantes/AdminPages/ManageStaff.jsx';
import ReportIssue from './Componantes/UserPages/ReportIssue.jsx';
import MyIssue from './Componantes/UserPages/MyIssue.jsx';
import Issue from './Componantes/MainComponents/Issue.jsx';
import PrivateRoute from './Componantes/Provider/PrivateRoute.jsx';
import IssueDetails from './Componantes/MainComponents/IssueDetails.jsx';
import Edit from './Componantes/MainComponents/Edit.jsx';
import AllIssue from './Componantes/AdminPages/AllIssue.jsx';
import AllAssignedIssues from './Componantes/StaffPages.jsx/AllAssignedIssues.jsx';
import Home from './Componantes/MainComponents/Home.jsx';
import UserProfile from './Componantes/UserPages/UserProfile.jsx';
import ManageUser from './Componantes/AdminPages/ManageUser.jsx';
import Payments from './Componantes/AdminPages/Payments.jsx';
import AdminStatics from './Componantes/AdminPages/AdminStatics.jsx';
import AdminWarp from './Componantes/MainComponents/AdminWarp.jsx';
import NotFound from './Componantes/MainComponents/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout> </HomePageLayout>,
    children: [
      {
        index: true,
        element: <Home> </Home>
      },
      {
        path: '/login',
        element: <Login> </Login>
      },
      {
        path: '/register',
        element: <Register> </Register>
      },
      {
        path: '/allIssues',
        element: <Issue> </Issue>
      },
      {
        path: '/issueDetails/:id',
        element: <PrivateRoute> <IssueDetails> </IssueDetails> </PrivateRoute>,
      },
      {
        path: '/edit/:id',
        element: <PrivateRoute> <Edit> </Edit> </PrivateRoute>
      },


      {
        path: '*',
        element: <NotFound> </NotFound>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute> <DashboardLayout> </DashboardLayout> </PrivateRoute>,
    children: [

      // admin's routes.............................
      {
        path: 'Manage-staff',
        element: <PrivateRoute> <ManageStaff> </ManageStaff> </PrivateRoute>
      },
      {
        path: 'All-issues',
        element: <PrivateRoute> <AllIssue> </AllIssue> </PrivateRoute>
      },
      {
        path: 'Manage-user',
        element: <PrivateRoute> <ManageUser> </ManageUser> </PrivateRoute>
      },
      {
        path: 'All-payments',
        element: <PrivateRoute> <Payments> </Payments> </PrivateRoute>
      },

      {
        // path: 'admin-statics',
        index: true,
        element: <AdminWarp> </AdminWarp>
      },



      //user's routs.......................................
      {
        path: 'Report-issue',
        element: <PrivateRoute> <ReportIssue> </ReportIssue> </PrivateRoute>
      },
      {
        path: 'All-my-issues',
        element: <PrivateRoute> <MyIssue> </MyIssue> </PrivateRoute>
      },
      {
        path: 'user-profile',
        element: <PrivateRoute> <UserProfile> </UserProfile> </PrivateRoute>
      },

      //staff's from here.............................................
      {
        path: 'All-assigned-issues',
        element: <PrivateRoute> <AllAssignedIssues> </AllAssignedIssues> </PrivateRoute>
      },
      {
        path: 'user-profile',
        element: <PrivateRoute> <UserProfile> </UserProfile> </PrivateRoute>
      },



      {
        path: '*',
        element: <NotFound> </NotFound>
      }

    ]

  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProider>
      <ToastContainer> </ToastContainer>
      <RouterProvider router={router} />,
    </AuthProider>
  </StrictMode>,
)
