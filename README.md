# URL Shortener App


This is a simple URL shortener app built with Next.js and MongoDB. It allows users to shorten long URLs into short, manageable links that are easier to share. The app is live and can be accessed at [next-shorten.vercel.app](https://next-shorten.vercel.app).

## Features

- Shorten long URLs into short, easy-to-remember links

## Coming soon
- Customizable link aliases for personalized URLs
- Track the number of times a shortened link has been clicked
- View a list of previously shortened URLs with their respective analytics
- Delete shortened URLs if they are no longer needed

## Technologies Used

- Next.js: A React framework for building server-side rendered and static websites
- MongoDB: A NoSQL database for storing and retrieving URL data
- Vercel: A platform for deploying Next.js applications

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/prodigytech/next_shortener.git
   ```

2. Navigate to the project directory:

   ```bash
   cd next_shortener
   ```

3. Install the dependencies:

   ```bash
   yarn install
   ```

4. Set up your MongoDB database and obtain the connection string.

5. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   MONGODB_URI=your-mongodb-connection-string
   ```

6. Start the development server:

   ```bash
   yarn dev
   ```

7. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the app.

## Deployment

The app is deployed on Vercel and can be accessed at [next-shorten.vercel.app](https://next-shorten.vercel.app). When deploying the app, make sure to set the `MONGODB_URI` environment variable in your deployment settings to connect to your MongoDB database.
