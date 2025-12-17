import { StrictMode } from 'react'
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
import Profile from './Componantes/DashboardLinks/Profile.jsx';
import ManageStaff from './Componantes/AdminPages/ManageStaff.jsx';
import ReportIssue from './Componantes/UserPages/ReportIssue.jsx';
import MyIssue from './Componantes/UserPages/MyIssue.jsx';
import Issue from './Componantes/MainComponents/Issue.jsx';
import PrivateRoute from './Componantes/Provider/PrivateRoute.jsx';
import IssueDetails from './Componantes/MainComponents/IssueDetails.jsx';
import Edit from './Componantes/MainComponents/Edit.jsx';
import AllIssue from './Componantes/AdminPages/AllIssue.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout> </HomePageLayout>,
    children: [
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
        element: <Edit> </Edit>,
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout> </DashboardLayout>,
    children: [
      {
        path: 'profile',
        element: <Profile> </Profile>
      },

      // admin's routes.............................
      {
        path: 'Manage-staff',
        element: <ManageStaff> </ManageStaff>
      },
      {
        path:'All-issues',
        element: <AllIssue> </AllIssue>
      },


      //user;s routs.......................................
      {
        path: 'Report-issue',
        element: <ReportIssue> </ReportIssue>
      },
      {
        path: 'All-my-issues',
        element: <MyIssue> </MyIssue>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProider>
      <ToastContainer> </ToastContainer>
      <RouterProvider router={router} />,
    </AuthProider>
  </StrictMode>,
)
