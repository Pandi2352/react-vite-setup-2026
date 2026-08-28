# Contributing Guidelines 🤝

Thank you for contributing to ForgeUI! Please review these guidelines before submitting code.

---

## 🛠️ Development Workflow

1. **Branch Naming**:
   - `feature/short-description` for new features.
   - `fix/short-description` for bug fixes.
   - `refactor/short-description` for code cleanup.

2. **Commit Messages**:
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat(ui): add new data table pagination control`
   - `fix(theme): prevent white flash during initial page load`

3. **Code Formatting & Verification**:
   Before submitting a Pull Request, verify:
   ```bash
   npm run format:check
   npm run typecheck
   npm run build
   npm test
   ```

4. **Pull Request Process**:
   Fill out the template in `.github/PULL_REQUEST_TEMPLATE.md` and ensure all build and lint checks pass cleanly.
