# CareerRise - MERN Stack Job Portal

CareerRise is a full-stack job portal application built using the MERN stack (MongoDB, Express, React, Node.js). The platform allows users to post jobs, apply for jobs, and manage user profiles. With robust authentication, advanced search features, and a sleek UI, CareerRise offers an efficient job-hunting and recruitment experience.

#### Video Demo - [Watch the Demo video on Google Drive](https://drive.google.com/file/d/11PNUdOQV5As3FYFyPpPaDFFdcUKipwl2/view?usp=drive_link) 

## Features

- **User Authentication**: Secure authentication with login and sign-up functionality for both job seekers and recruiters.
- **Job Posting & Application**: Recruiters can create and manage job postings, while job seekers can search, filter, and apply for relevant job opportunities.
- **Search and Filters**: Filter jobs by location or job role for easy job discovery.
- **Profile Management**: Both recruiters and candidates can manage their profiles.
- **Job Application Tracking**: Users can track job applications and recruiters can monitor applicants for posted jobs.
- **Responsive Design**: The platform is fully responsive and adapts seamlessly across mobile, tablet, and desktop devices.
- **UI Enhancements**: Styled with Tailwind CSS and enhanced with Framer Motion animations for a modern and intuitive interface.

## Tech Stack

### Frontend:
- **ReactJS** with **Tailwind CSS** for styling.
- **Axios** for API requests.
- **Redux** for state management.
- **React Hook Form** for handling form validation.
- **shadcn/ui** for consistent and reusable components.
- **Framer Motion** for fluid animations and interactions.

### Backend:
- **Node.js** and **Express.js** for the API.
- **MongoDB** for the database.
- **JWT** for user authentication.
- Cookie-based session management.
- **Cloudinary** for secure image uploads and optimization.

## Getting Started

1.  Clone the repository:
    ```bash
         git clone https://github.com/ShubhamSharmax/careerRise
    ```
2.  Navigate into the project directory:
    ```bash
         cd careerRise
    ```
3.  Install dependencies:
    ```bash
         # for FrontEnd
         npm install
    ```
    ```bash
         # for Backend
         cd BacKEnd
         npm install
    ```
4.  Setup Environment variables. create a `.env` file and add following:
    ```bash 
        # for FrontEnd
        VITE_API_USER= #Add Your User Api endpoint
        VITE_API_COMPANY= #Add Your Company Api endpoint
        VITE_API_JOB= #Add Your Job Api endpoint
        VITE_API_APPLICATION= #Add Your Application Api endpoint
           
        # for BackEnd
        PORT= #Add your port
        MONGO_URI= #Add your database URI
        SECRET_KEY= #Add your secret key
        FRONTEND_URL= #Add your frontend URL
        CLOUD_NAME= #Add your Cloud Name 
        API_KEY= #Add your API key    
        API_SECRET= #Add your API secret
    ```
5.  Run the Project:
    ```bash
        # for FrontEnd
        npm run dev
        # for BackEnd
        npm start
    ```
6.  Open the Project in your browser at `http://localhost:5173`.

7.  Verify the backend API by visiting `http://localhost:<PORT>` in your browser.
