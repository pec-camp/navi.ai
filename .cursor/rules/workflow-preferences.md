## 🔄 Workflow Preferences – "Work This Way"

### Default Flow

1. **Planning First** – For major work, create a `plan.md` and await approval.
2. **Iterate in Steps** – Break down tasks and log them in `progress.md`.
3. **Approval Required** – For major changes, pause and wait for confirmation.
4. **Logs**
   - Progress: `progress.md`
   - Next tasks: `TODO.txt`

### Slice Structure (e.g., `features/auth`)

```
auth/
├── api/        # Supabase integration
├── model/      # State & business logic
├── ui/         # Visual components
└── index.ts    # Public API
```

### File Tracking Convention

| File                  | Purpose                     |
| --------------------- | --------------------------- |
| `plan.md`             | Pre-work planning           |
| `progress.md`         | Work logs                   |
| `TODO.txt`            | Next task list              |
| `context-summary.md`  | Context reset backup        |
| `docs/[component].md` | Feature-level documentation |
