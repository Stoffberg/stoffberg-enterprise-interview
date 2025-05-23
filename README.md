# Stoffberg Enterprise Interview Project

Welcome! This is a technical interview project based on the [T3 Stack](https://create.t3.gg/), designed to assess your skills in modern full-stack development. The project is scaffolded for you to focus on real-world tasks, bug fixes, and feature implementations.

---

## 🚀 Project Overview

This project simulates a real enterprise dashboard, including user management, project tracking, metrics, and activity logs. You’ll encounter realistic bugs, performance issues, and feature requests—just like in a real engineering team.

**Tech Stack:**

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

---

## 📝 How to Use This Repo

- **Clone the repository** and install dependencies:
  ```bash
  pnpm install
  # or
  npm install
  ```
- **Start the development server:**

  ```bash
  pnpm dev
  # or
  npm run dev
  ```

- **Environment Variables:**  
  Copy `.env.example` to `.env` and fill in any required secrets.

---

## 🎯 Your Mission

You’ll find your tasks in [`tasks.md`](./tasks.md). Each ticket simulates a real feature, bug, or performance issue. Please:

- Commit regularly and open a PR for each ticket using the format:  
  `<conventional_type>/ticket_id/friendly_name`  
  _Example:_ `feat/TECH-002/dashboard-stability`
- Reference the ticket in your PR description.
- Focus on code quality, maintainability, and clear commit messages.

---

## 🛠️ Task Types

- **Networking:** Optimize data fetching, pagination, and error handling.
- **Performance:** Improve load times and rendering efficiency.
- **Layout & UI:** Enhance navigation, responsiveness, and user experience.
- **Error Handling:** Standardize and improve error management across the app.

See [`tasks.md`](./tasks.md) for full details and acceptance criteria.

---

## 🐞 Debugging & Bug Fixes

Check [`thought.md`](./thought.md) for a list of known bugs and hints.  
You’re encouraged to:

- Investigate and fix bugs as you encounter them.
- Use the provided hints to understand backend/frontend data shape mismatches and effect dependencies.
- Bonus points for identifying and fixing issues not explicitly listed!

---

## 💡 Tips for Success

- **Keep it simple:** Start with the provided scaffolding and add only what’s necessary.
- **Be thorough:** Handle loading, error, and empty states gracefully.
- **Be efficient:** Avoid unnecessary network requests and excessive renders.
- **Be user-friendly:** Ensure the UI is intuitive and responsive.

---

## 📚 Resources

- [T3 Stack Documentation](https://create.t3.gg/)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [tRPC Docs](https://trpc.io/docs)

---

## 🏁 Submitting Your Work

- Open a PR for each completed ticket.
- Ensure your code is clean, well-documented, and tested.
- If you have questions, document your thought process in your PR or in a `thought.md` update.

---

Good luck, and have fun building!
