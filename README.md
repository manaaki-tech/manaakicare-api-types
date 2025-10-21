# @manaakicare/api-types

TypeScript types and API client auto-generated from the ManaakiCare backend OpenAPI schema.

## 📖 Type Generation Workflow

**See:** [../manaakicare-backend/docs/TYPE_GENERATION_WORKFLOW.md](../manaakicare-backend/docs/TYPE_GENERATION_WORKFLOW.md)

**Normal workflow (from backend):**
```bash
cd ~/dev/manaakicare-backend
./scripts/generate-schema.sh  # Does everything automatically!
```

**Manual regeneration (from this package):**
```bash
npm run build:quick  # Uses existing schema
```

## 🏠 Local Development

This package is designed for local development alongside the backend and frontend repositories.

### Workspace Structure

```
/home/amj/dev/
├── manaakicare-backend/     # Django backend with OpenAPI generation
├── manaakicare-frontend/    # React frontend consuming the types
└── manaakicare-api-types/   # This package - TypeScript types & client
```

### Prerequisites

- Node.js 18+
- Backend server running at http://localhost:8000
- All three packages in your local workspace

## 📦 Local Installation

For local development with all packages side-by-side:

### macOS/Linux

```bash
# In api-types directory
npm install
npm link

# In frontend directory
npm link @manaakicare/api-types
```

**If you get permission errors** with `npm link`:
```bash
# Option 1: Use sudo (simplest)
sudo npm link

# Option 2: Set local npm prefix (avoids sudo)
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
# Then retry npm link
```

### Windows

```powershell
# In api-types directory
npm install
npm link  # May require Administrator privileges

# In frontend directory
npm link @manaakicare/api-types
```

**If you get permission errors** with `npm link`:
```powershell
# Option 1: Run as Administrator (simplest)
# Right-click PowerShell/CMD → "Run as Administrator"
npm link

# Option 2: Set user-level prefix (avoids Admin requirement)
npm config set prefix %USERPROFILE%\AppData\Roaming\npm
# Then retry npm link

# Option 3: Use WSL (Windows Subsystem for Linux)
# Follow the macOS/Linux instructions above
```

### Alternative: Direct Path Installation

If `npm link` has permission issues, use direct file path:

```bash
# In frontend directory
npm install ../manaakicare-api-types
```

This creates a symlink in `node_modules` without requiring global npm access.

## 🔄 Local Development Workflow

### Build Commands

```bash
# Complete build: fetch schema → generate types → compile
npm run build

# Quick build (if schema already exists)
npm run build:quick

# Clean all generated files
npm run clean

# Type-check without emitting
npm run test
```

### Individual Steps

```bash
# Step 1: Fetch OpenAPI schema from backend
npm run fetch-schema

# Step 2: Generate TypeScript from schema
npm run generate

# Step 3: Compile TypeScript (or use watch mode)
tsc
# or
npm run watch
```

### When to Rebuild

1. **Backend model changes** - Run `npm run build`
2. **Backend API endpoint changes** - Run `npm run build`
3. **Schema already up-to-date** - Run `npm run build:quick`
4. **Starting fresh** - Run `npm run clean && npm run build`

## 🚀 Quick Start

```typescript
import { Document, DocumentsService } from '@manaakicare/api-types';

// Use types
const document: Document = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  title: 'Medical Report',
  scope: 'SERVICE_USER',  // Note: enums are UPPER_CASE
  // ... other properties
};

// Use API client
const api = new DocumentsService({
  baseUrl: 'http://localhost:8000',  // Local backend
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const documents = await api.documentsList({
  scope: 'SERVICE_USER',
  page: 1,
  pageSize: 20,
});
```

## 📚 Available Types

### Document Management
- `Document` - Document entity
- `DocumentCategory` - Document categories with hierarchy
- `DocumentTag` - Document tags
- `DocumentVersion` - Document version history

### Service Users
- `ServiceUser` - Service user/client information
- `ServiceUserProfile` - Extended profile data
- `Caregiver` - Caregiver information

### Referrals
- `Referral` - Referral information
- `ReferralStatus` - Referral status enum

### Organizations
- `Organisation` - Organization entity
- `Program` - Healthcare programs

## 🛠️ API Services

Pre-configured service classes with full TypeScript support:

```typescript
import {
  DocumentsService,
  CategoriesService,
  ServiceUsersService,
  ReferralsService,
} from '@manaakicare/api-types';

// Initialize with config
const config = {
  baseUrl: process.env.API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const documentsApi = new DocumentsService(config);
const categoriesApi = new CategoriesService(config);
```

## 🔄 Enums

All enums are exported as TypeScript enums:

```typescript
import { DocumentScope, ApprovalStatus } from '@manaakicare/api-types';

if (document.scope === DocumentScope.SERVICE_USER) {
  // Type-safe enum comparison
}
```

## 📝 Type Guards

Utility type guards for runtime validation:

```typescript
import { isUUID } from '@manaakicare/api-types';

if (isUUID(value)) {
  // value is typed as UUID
}
```

## 🏗️ Development

### Generated Files Structure

```
src/
├── client/          # HTTP client internals
├── core/            # Core utilities
├── client.gen.ts    # API client configuration
├── sdk.gen.ts       # Service classes with methods
├── types.gen.ts     # TypeScript interfaces/types
└── index.ts         # Barrel exports
```

**Note:** All files in `src/` are auto-generated and gitignored. Never edit them directly.

### Backend Schema Generation

The backend auto-generates OpenAPI schemas using drf-spectacular:

```bash
# View schema in browser
http://localhost:8000/api/schema/swagger-ui/
http://localhost:8000/api/schema/redoc/

# Download raw schema
curl http://localhost:8000/api/schema/ -o schema.json
```

### Troubleshooting Local Development

#### Backend Not Running
```
Error: fetch-schema failed - connect ECONNREFUSED
```
**Solution:** Start the backend server:
```bash
cd ../manaakicare-backend
python manage.py runserver
```

#### Types Out of Sync
If frontend TypeScript errors appear after backend changes:
```bash
cd ../manaakicare-api-types
npm run clean && npm run build
```

#### Import Errors in Frontend
Ensure proper linking:
```bash
# In api-types
npm link

# In frontend
npm link @manaakicare/api-types
```

#### Permission Errors on npm link

**macOS/Linux:**
```bash
# Option 1: Use sudo
sudo npm link

# Option 2: Set user-level prefix
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# To reset npm prefix to default later:
npm config delete prefix
```

**Windows:**
```powershell
# Option 1: Run as Administrator
# Right-click terminal → "Run as Administrator"

# Option 2: Set user-level prefix
npm config set prefix %USERPROFILE%\AppData\Roaming\npm
# Add to PATH if needed:
setx PATH "%PATH%;%USERPROFILE%\AppData\Roaming\npm"

# Option 3: Direct path installation
npm install ../manaakicare-api-types

# To reset npm prefix to default later:
npm config delete prefix
```

#### Cross-Platform Path Issues

The package.json scripts use Unix-style paths. Windows users with Git Bash or WSL should work fine. For PowerShell/CMD:

```json
// If needed, create a package.json.windows with:
"scripts": {
  "clean": "rmdir /s /q dist src schemas\\complete.json",
  "fetch-schema": "curl -o .\\schemas\\complete.json http://localhost:8000/api/schema/"
}
```

## 🔗 Integration

### With React/Next.js

```typescript
// components/DocumentList.tsx
import React from 'react';
import { Document } from '@manaakicare/api-types';

interface Props {
  documents: Document[];
}

export const DocumentList: React.FC<Props> = ({ documents }) => {
  return (
    <ul>
      {documents.map((doc) => (
        <li key={doc.id}>{doc.title}</li>
      ))}
    </ul>
  );
};
```

### With API Calls

```typescript
// services/api.ts
import { DocumentsService } from '@manaakicare/api-types';

export const api = {
  documents: new DocumentsService({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
};

// Usage in components
const documents = await api.documents.getDocuments();
```

## 🔧 Configuration

### Custom Base URL

```typescript
import { DocumentsService } from '@manaakicare/api-types';

const api = new DocumentsService({
  baseUrl: 'https://staging.api.manaakicare.com',
});
```

### Authentication

```typescript
const api = new DocumentsService({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## 📖 API Documentation

Full API documentation is available at:
- Production: https://api.manaakicare.com/api/schema/swagger-ui/
- Staging: https://staging.api.manaakicare.com/api/schema/swagger-ui/

## 🐛 Troubleshooting

### Types out of sync?
The backend API may have changed. Package maintainers should release a new version.

### Import errors?
Ensure you're importing from the package root:
```typescript
// ✅ Correct
import { Document } from '@manaakicare/api-types';

// ❌ Wrong
import { Document } from '@manaakicare/api-types/dist/generated';
```

## 🤝 Contributing

This package is auto-generated. To contribute:

1. Make changes to the backend API (Django)
2. The package will be automatically updated via CI/CD

## 📄 License

MIT © ManaakiCare Team

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@manaakicare/api-types)
- [GitHub Repository](https://github.com/manaakicare/manaakicare-api-types)
- [Backend Repository](https://github.com/manaakicare/manaakicare-backend)
- [Frontend Repository](https://github.com/manaakicare/manaakicare-frontend)