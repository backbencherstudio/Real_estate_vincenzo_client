import CreateTenant from "../pages/Owner/createTenant/CreateTenant";
import OwnerDashboard from "../pages/Owner/Owner";


export const ownerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <OwnerDashboard />,
    },
    {
        name: "Tenant Managment",
        children: [
            {
                name: "Create Tenant",
                path: "create-tenant",
                element: <CreateTenant />,
            },

            //   {
            //     name: "Academin Semester",
            //     path: "academic-semester",
            //     element: <AcademinSemester />,
            //   },

            //   {
            //     name: "Create A. Faculty",
            //     path: "create-academic-faculty",
            //     element: <CreateAcademicFaculty />,
            //   },
            //   {
            //     name: "Academin Faculty",
            //     path: "academic-faculty",
            //     element: <AcademicFaculty />,
            //   },

            //   {
            //     name: "Create A. Department",
            //     path: "create-academic-department",
            //     element: <CreateAcademicDepartment />,
            //   },
            //   {
            //     name: "Academin Department",
            //     path: "academic-department",
            //     element: <AcademicDepartment />,
            //   },
        ],
    },


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

