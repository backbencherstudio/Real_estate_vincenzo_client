import AdminDashboard from "../pages/Admin/Admin";
import CreateOwner from "../pages/Admin/createOwner/CreateOwner";
import AdminProfile from "../pages/Admin/Settings/AdminProfile";

export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
    },

    {
        name: "Owner Managment",
        children: [

            {
                name: "Create Owner",
                path: "create-owner",
                element: <CreateOwner />,
            },
        ],
    },
    {
        name : "Settings",
        children : [
            {
                name : "Profile",
                path : "profile",
                element : <AdminProfile/>
            }
        ]
    }


    //   {
    //     name: "User Managment",
    //     children: [
    //       {
    //         name: "Create Admin",
    //         path: "create-admin",
    //         element: <CreateAdmin />,
    //       },
    //       {
    //         name: "Create Faculty",
    //         path: "create-faculty",
    //         element: <CreateFaculty />,
    //       },
    //       {
    //         name: "Create Student",
    //         path: "create-student",
    //         element: <CreateStudent />,
    //       },
    //       {
    //         name: "Students",
    //         path: "student-data",
    //         element: <StudentData />,
    //       },
    //       {
    //         path: "student-data/:studentId",
    //         element: <StudentDetails />,
    //       },
    //     ],
    //   },
    //   {
    //     name: "Course Managment",
    //     children: [
    //       {
    //         name: "Semester Registration",
    //         path: "semester-registration",
    //         element: <SemesterRegistration />,
    //       },
    //       {
    //         name: "Registered Semester",
    //         path: "registered-semester",
    //         element: <RegistardSemester />,
    //       },
    //       {
    //         name: "Create Course",
    //         path: "create-course",
    //         element: <CreateCourse />,
    //       },
    //       {
    //         name: "Course",
    //         path: "course",
    //         element: <Courses />,
    //       },
    //       {
    //         name: "Offer Course ",
    //         path: "offer-course",
    //         element: <OffereCourse />,
    //       },
    //       {
    //         name: "Offered Course",
    //         path: "offered-course",
    //         element: <OfferedCourse />,
    //       },
    //     ],
    //   },

];

