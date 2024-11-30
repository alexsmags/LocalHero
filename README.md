# LocalHero
This repository contains the code for our LocalHero website, created for the SOEN-357 course.
## Description of the Project:
This platform connects local businesses and artisans with users, allowing them to discover and interact with each other. Users can browse business and artisan profiles, while business owners and artisans can create and manage their own profiles. The platform includes features like location-based search, filtering by category or skills, and profile management for both users and business owners/artisans.

## Core Features of the Project:
### For Users:

Create an account/register: Users can sign up and log in securely.<br/>
Browse profiles: Users can search for and explore local businesses and artisans.<br/>
Advanced Search and Filters: Users can filter profiles based on categories, skills, or location.<br/>
Contact businesses/artisans: Users can reach out to businesses or artisans directly.<br/>

### For Business Owners and Artisans:
Create an account/register: Business owners and artisans can sign up and log in securely. <br/>
Create and manage profiles: Business owners and artisans can upload images, provide descriptions, and list services/products.<br/>

## How to Run the Project
Follow the steps below to run the project on your local machine:<br/>

### 1. Create a .env File
At the root level of the project (inside the LocalHero folder), create a .env file and add the following code inside it:<br/>

NEXTAUTH_URL=http://localhost:3000<br/>
NEXTAUTH_SECRET=mytestApp<br/>
This configuration is necessary for the authentication system to work properly.

### 2. (Optional) Configure MongoDB URI
If you'd like to use your own MongoDB database, open the conn.js file located at:<br/>

LocalHero/backend/database/conn.js<br/>
Change the value of MONGO_URI to your MongoDB URI. By default, it connects to our online database, but you can replace it with your own database connection string if needed.

### 3. Install Dependencies
Open your terminal and navigate to the project directory. Run the following command to install all necessary dependencies:<br/>

__npm install__<br/>

This will download all the required libraries and packages for both the frontend and backend.<br/>

### 4. Start the Development Server
After installing the dependencies, run the following command to start the development server:<br/>

__npm run dev__<br/>

This will start the application on your local machine, and you can access it at:

http://localhost:3000/<br/>
The development server will automatically reload as you make changes to the code.<br/>

### 5. Access the Platform
Open your web browser and go to http://localhost:3000/ to view and interact with the platform.<br/>


## Technologies Used & Approach

- [Next.js 13](https://nextjs.org/docs/getting-started): Web development framework used with React that provides Server Side Rendering
- [NextUI v2](https://nextui.org/): CSS library built on top of tailwind to add extra stylings to website
- [Tailwind CSS](https://tailwindcss.com/): CSS library that helps styling the website
- [Tailwind Variants](https://tailwind-variants.org): CSS library extension for tailwind
- [ReactJS](https://www.typescriptlang.org/): Frontend library to facilitate creation of website
- [NodeJS](https://nodejs.org/en/): Backend
- [Mongoose](https://mongoosejs.com/docs/): Backend database used to store different values for users, properties, etc.
