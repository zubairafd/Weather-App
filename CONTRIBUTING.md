# Contributing to SkyCast

Thank you for your interest in contributing to **SkyCast**! We welcome bug reports, feature requests, documentation improvements, and code contributions.

## 🚀 Quick Start for Development

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/your-username/skycast.git
   cd skycast
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Start local dev server:**
   ```bash
   npm run dev
   ```

5. **Run tests and typecheck:**
   ```bash
   npm run typecheck
   npm run test
   ```

## 📝 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `chore:` Tooling or maintenance changes

## 🔒 Security

Never commit API keys or secret credentials to `.env` or git. Always verify `git status` before committing.
