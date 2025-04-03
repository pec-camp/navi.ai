# 🧑‍🏭 Coding Preferences – "Write Code Like This"

## Design Principles

- ✅ **Simplicity First** – Start with the simplest possible approach.
- ✅ **Respect FSD Structure** – Do not create folders outside `features`, `entities`, `shared`, `widgets`, `app`.
- ✅ **Separation of Concerns** – Place UI in `ui/`, logic in `model/`, and API calls in `api/`.
- ✅ **DRY** – Extract duplicate code into `shared` or `entities`.
- ✅ **Modular** – Keep files under 200–300 lines when possible.
- ✅ **Public API Only via `index.ts`** – All external access must go through `index.ts`.
- ✅ **Documentation** – Summarize major components in `/docs/[component].md`.

### FSD Structure

#### 1. Layer Structure Principles

- **Upward Dependencies**: Upper layers can only depend on lower layers (app → widgets → features → entities → shared)
- **Lower Layer Independence**: Lower layers don't know about upper layers
- **No Horizontal Dependencies**: Different slices within the same layer cannot depend on each other
- app: This layer integrates both the traditional app layer and pages layer into a single structure. When using the Next.js App Router, it helps avoid folder name conflicts by containing both the app and pages layers (as defined in F.S.D) within the app directory.
- widgets: A layer that composes reusable UI blocks by combining features, entities, and shared components, focusing on layout and presentation rather than logic.
- features: A layer that implements domain-specific actions and business logic, often tightly coupled to a specific use case and less reusable.(Create, Update, Delete)
- entities: This layer is responsible for Read operations. It includes data interfaces that must remain stable and unchanged despite external modifications. It typically contains logic for fetching data from APIs or databases, along with the UI components that display that data. It does not handle user interaction — it only presents the data. This layer is similar to Entities in Clean Architecture.(Read)

#### 2. Slice Structure

Each feature consists of the following segments:

```
feature/
├── api/ # External communication logic
│ ├── index.ts
│ └── [feature-name].ts
├── model/ # Business logic
│ ├── index.ts
│ └── types.ts
├── ui/ # Components
│ ├── index.ts
│ └── [ComponentName].tsx
└── index.ts # Public API
```

#### 3. Feature Implementation Guidelines

1. **Public API Design**

   - Each slice is exposed only through `index.ts`
   - Internal implementations remain private

2. **Business Logic Separation**

   - Concentrate business logic in models(model/)
   - UI components contain minimal logic

3. **Naming Conventions**
   - File names clearly express functionality
   - Components: PascalCase
   - Utilities/hooks: camelCase
   - Types/interfaces: PascalCase + `.types.ts`

#### 4. Adding New Features Procedure

1. **Layer Decision**

   - Choose appropriate layer based on feature characteristics
   - Consider reusability potential

2. **Slice Creation**

   - Follow domain structure based on planning framework

3. **Dependency Management**
   - Adhere to layer structure principles
   - Prevent circular dependencies

#### References

- For detailed information about FSD architecture, refer to the [official documentation](https://feature-sliced.design/)
- For Supabase configuration and usage, refer to [Supabase documentation](https://supabase.com/docs)

## Advanced Constraints

- ❌ Never use mock data outside of tests.
- ✅ Include test suggestions for major features.
- ✅ Apply SOLID principles selectively.
- 🔁 When token context exceeds 100k, generate `context-summary.md` and restart.
