<div align="center">
  <br />
    <a href="https://www.jsmastery.pro/ultimate-next-course" target="_blank">
      <img src="https://github.com/lhlam2515/nextjs15-devflow/blob/main/public/images/thumbnail.png" alt="project banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Google_Gemini-black?style=for-the-badge&logoColor=298ffd&logo=googlegemini&color=412991" alt="googlegemini" />
  </div>
  <h3 align="center">DevOverflow - A Stack Overflow Inspired Q&A Platform</h3>  
   <p align="center">
     Special thanks to <a href="https://github.com/adrianhajdin" target="_blank"><b>Adrian Hajdin - JS Mastery</b></a> and his team for creating <a href="https://www.jsmastery.pro/ultimate-next-course" target="_blank"><b>the Ultimate Next.js Course</b></a> - the foundation of this project. Their guidance and resources have been invaluable in bringing this project to life.
  </p>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🔗 [Assets & Resources](#links)

## <a name="introduction">🤖 Introduction</a>

DevOverflow is a modern, full-stack Q&A platform inspired by Stack Overflow, designed to help developers connect, share knowledge, and solve coding problems. Built with the latest features of Next.js 15, this platform offers a seamless experience for asking questions, providing answers, and exploring developer resources in a robust and responsive environment.

The application leverages advanced rendering strategies including SSG, ISR, SSR, and PPR to ensure optimal performance and user experience. With MongoDB as the database backbone and NextAuth for secure authentication, DevOverflow provides a reliable foundation for community interaction and knowledge sharing.

What sets DevOverflow apart is its integration with Google Gemini AI for generating intelligent responses to questions, along with gamification elements like badges and rewards to encourage participation. The platform also features a job discovery section, personalized recommendations, and a comprehensive tagging system to organize content effectively.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js 15.3.0 - Latest version with advanced rendering strategies
- TypeScript - For type safety and better developer experience
- MongoDB - NoSQL database for flexible data storage
- Mongoose - ODM for MongoDB, simplifying data modeling
- NextAuth (Auth.js) - Authentication solution supporting multiple providers
- Google Gemini - AI integration for generating answers
- ShadCN UI - Component library for consistent UI elements
- TailwindCSS - Utility-first CSS framework for styling
- React Hook Form - Form validation and handling
- Zod - Schema validation library
- MDX Editor - Rich text editing for questions and answers

## <a name="features">🔋 Features</a>

👉 **Authentication**: Secure sign-in with NextAuth, supporting Email/Password, Google, and GitHub.

👉 **Home Page**: Displays questions with filters, search, and pagination for easy navigation.

👉 **Recommendations**: Personalized suggestions on the home page.

👉 **Complex Layout**: Organized layout with popular questions and tags in view.

👉 **Question Details**: View questions with rich content, including images and code blocks.

👉 **Voting**: Upvote/downvote on questions to highlight helpful content.

👉 **View Counter**: Tracks the number of views for each question.

👉 **Bookmarking**: Save questions for quick access later.

👉 **Answer Posting**: MDX editor with light/dark modes for submitting answers.

👉 **AI Answer Generation**: Get AI-generated responses to questions.

👉 **Answer Filtering**: Sort answers by newest or most-voted, with pagination.

👉 **Answer Voting**: Upvote/downvote answers to rank quality responses.

👉 **Collections**: Organized saved questions with filters, search, and pagination.

👉 **Community**: Browse all users with search, filters, and pagination.

👉 **Profile**: View user info, badges, and engagement history with pagination.

👉 **Job Finder**: Discover jobs with filters and search, tailored to the user’s location.

👉 **Tags Page**: List of all tags with question counts, filters, and pagination.

👉 **Tag Details**: View questions by tag with search and pagination.

👉 **Ask a Question**: Simple interface for posting new questions.

👉 **Edit & Delete**: Update or remove questions and answers with validation and authorization.

👉 **Global Search**: Find content across questions, users, tags, and more.

👉 **Responsive Design**: Fully optimized for a seamless experience on desktops, tablets, and mobile devices.

👉 **High Performance**: Fast loading and smooth interactions for an efficient user experience.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/lhlam2515/nextjs15-devflow.git
cd nextjs15-devflow
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
# Mongodb
MONGODB_URI=

# Google Generative AI
GOOGLE_GENERATIVE_AI_API_KEY=

# Rapid API
NEXT_PUBLIC_RAPID_API_KEY=

# Auth
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_SECRET=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on the respective websites

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="links">🔗 Assets & Resources</a>
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [NextAuth Documentation](https://next-auth.js.org/)
- [Google Gemini Documentation](https://developers.google.com/gemini)
- [ShadCN UI Documentation](https://ui.shadcn.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

Assets used in the project can be found [here](https://drive.google.com/file/d/1nBru53dqIY4__A_WsburhpdiWUbdbncY/view?usp=sharing)
