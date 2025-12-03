import { createBrowserRouter, } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Jobs from "../pages/Home/Job/Jobs";
import JobDetails from "../pages/Home/Job/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/Home/Job/JobApply";
import MyApplication from "../pages/Home/Job/MyApplication";
import AddJob from "../pages/Home/Job/AddJob";
import MyPostedJob from "../pages/Home/Job/MyPostedJob";
import ViewApplication from "../pages/Home/Job/ViewApplication";
import ImgCv from "../pages/Input/ImgCv";
import PdfCv from "../pages/Input/PdfCv";
import AboutUs from "../pages/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'about',
            element: <AboutUs></AboutUs>
        },
        {
            path: 'register',
            element: <Register></Register>
        },
        {
            path: 'cvImg',
            element: <ImgCv></ImgCv>
        },
        {
            path: 'cvPdf',
            element: <PdfCv></PdfCv>
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
          path: 'job',
          element: <Jobs></Jobs>
        },
        {
          path: 'job/:id',
          element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
          loader: ({params})=> fetch(`https://job-box-server-lilac.vercel.app/job/${params.id}`)
        },
        {
          path: 'apply/:id',
          element: <PrivateRoute><JobApply></JobApply></PrivateRoute>
        },
        {
          path: 'myApplication',
          element: <PrivateRoute><MyApplication></MyApplication></PrivateRoute>
        },
        {
          path: 'addJob',
          element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
        },
        {
          path: 'myPostedJob',
          element: <PrivateRoute><MyPostedJob></MyPostedJob></PrivateRoute>
        },
        {
          path: 'viewApplication/:job_id',
          element: <PrivateRoute><ViewApplication></ViewApplication></PrivateRoute>,
          loader: ({params})=> fetch(`https://job-box-server-lilac.vercel.app/job-application/jobs/${params.job_id}`)
        }
    ]
  },
]);