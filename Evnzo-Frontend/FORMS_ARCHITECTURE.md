# Dynamic Form System - Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         EVENZO FORM SYSTEM                          │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐                    ┌──────────────────────┐
│   ORGANIZER SIDE     │                    │    USER SIDE         │
│   (Form Builder)     │                    │  (Form Renderer)     │
└──────────────────────┘                    └──────────────────────┘
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           FRONTEND LAYER                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐         ┌──────────────────┐                │
│  │  Form Builder    │         │  Form Renderer   │                │
│  │  Page            │         │  Page            │                │
│  └────────┬─────────┘         └────────┬─────────┘                │
│           │                            │                           │
│           ├─────────────┬──────────────┤                           │
│           │             │              │                           │
│  ┌────────▼─────┐  ┌───▼────┐  ┌──────▼──────┐                   │
│  │ FieldBuilder │  │ Field  │  │ DynamicField│                   │
│  │ Component    │  │ List   │  │ Component   │                   │
│  └──────────────┘  └────────┘  └─────────────┘                   │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                        REACT QUERY LAYER                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  forms.query.ts - React Query Hooks                          │ │
│  │  • useCreateEventForm()                                      │ │
│  │  • useGetActiveEventForm()                                   │ │
│  │  • useAddFormField()                                         │ │
│  │  • useSubmitForm()                                           │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                          API LAYER                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  forms.api.ts - API Integration                              │ │
│  │  • createEventForm()                                         │ │
│  │  • getActiveEventForm()                                      │ │
│  │  • addFormField()                                            │ │
│  │  • submitForm()                                              │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 │ HTTP/HTTPS
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          BACKEND LAYER                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │ Event Form       │  │ Form Field       │  │ Form Submission │ │
│  │ Controller       │  │ Controller       │  │ Controller      │ │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬────────┘ │
│           │                     │                      │           │
│  ┌────────▼─────────┐  ┌───────▼──────────┐  ┌───────▼────────┐ │
│  │ Event Form       │  │ Form Field       │  │ Form Submission│ │
│  │ Service          │  │ Service          │  │ Service        │ │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬───────┘ │
│           │                      │                      │          │
│  ┌────────▼──────────┐  ┌───────▼──────────┐  ┌───────▼────────┐│
│  │ Event Form        │  │ Form Field       │  │ Form Submission││
│  │ Repository        │  │ Repository       │  │ Repository     ││
│  └───────────────────┘  └──────────────────┘  └────────────────┘│
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                        DATABASE LAYER                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  PostgreSQL Database (Prisma ORM)                            │ │
│  │                                                              │ │
│  │  Tables:                                                     │ │
│  │  • EventForm                                                 │ │
│  │  • FormField                                                 │ │
│  │  • FormSubmission                                            │ │
│  │  • FormAnswer                                                │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
└── Routes
    ├── Public Routes
    │   └── /forms/render
    │       └── FormRendererPage
    │           ├── Form Header
    │           ├── FormProvider (React Hook Form)
    │           │   └── DynamicField (for each field)
    │           │       ├── Text Input
    │           │       ├── Textarea
    │           │       ├── Email Input
    │           │       ├── Number Input
    │           │       ├── Dropdown
    │           │       ├── Checkbox Group
    │           │       ├── Radio Group
    │           │       └── File Input
    │           └── Submit Button
    │
    └── Protected Routes (Dashboard)
        ├── /dashboard/forms
        │   └── FormsListPage
        │       ├── Header with Create Button
        │       └── Form Cards Grid
        │           └── Form Card
        │               ├── Form Info
        │               ├── Statistics
        │               └── Action Buttons
        │
        └── /dashboard/forms/builder
            └── FormBuilderPage
                ├── Form Details Section
                │   ├── Title Input
                │   ├── Description Textarea
                │   ├── Target Select
                │   └── Create Button
                ├── FieldBuilder Component
                │   ├── Field Name Input
                │   ├── Display Label Input
                │   ├── Field Type Select
                │   ├── Required Checkbox
                │   ├── Options Manager
                │   │   ├── Option Input
                │   │   ├── Add Option Button
                │   │   └── Option Tags
                │   └── Add Field Button
                └── FieldList Component
                    └── Field Cards
                        ├── Drag Handle
                        ├── Field Info
                        └── Delete Button
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        STATE MANAGEMENT                             │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│   Local State        │
│   (React useState)   │
├──────────────────────┤
│ • Form title         │
│ • Form description   │
│ • Form target        │
│ • Field builder data │
│ • Option input       │
└──────────────────────┘
          │
          ▼
┌──────────────────────┐
│   Form State         │
│   (React Hook Form)  │
├──────────────────────┤
│ • Field values       │
│ • Validation errors  │
│ • Dirty state        │
│ • Submit state       │
└──────────────────────┘
          │
          ▼
┌──────────────────────┐
│   Server State       │
│   (React Query)      │
├──────────────────────┤
│ • Forms data         │
│ • Fields data        │
│ • Submissions data   │
│ • Loading states     │
│ • Error states       │
│ • Cache management   │
└──────────────────────┘
```

## User Journey - Organizer

```
1. Login to Dashboard
   │
   ▼
2. Navigate to Forms Management
   │
   ▼
3. Click "Create Form"
   │
   ▼
4. Fill Form Details
   ├─ Title
   ├─ Description
   └─ Target (Visitor/Exhibitor)
   │
   ▼
5. Click "Create Form"
   │
   ▼
6. Add Fields
   ├─ Enter field name
   ├─ Enter display label
   ├─ Select field type
   ├─ Mark as required (optional)
   └─ Add options (if applicable)
   │
   ▼
7. Click "Add Field" (repeat for each field)
   │
   ▼
8. Review Field List
   ├─ Reorder fields (drag & drop)
   └─ Delete unwanted fields
   │
   ▼
9. Click "Done"
   │
   ▼
10. Share Form URL with Users
```

## User Journey - Visitor/Exhibitor

```
1. Receive Form URL
   │
   ▼
2. Open Form in Browser
   │
   ▼
3. View Form Details
   ├─ Title
   ├─ Description
   └─ Target badge
   │
   ▼
4. Fill Form Fields
   ├─ Text inputs
   ├─ Dropdowns
   ├─ Checkboxes
   ├─ Radio buttons
   └─ File uploads
   │
   ▼
5. Validate Required Fields
   │
   ▼
6. Click "Submit Form"
   │
   ▼
7. See Success Confirmation
```

## API Request Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                      CREATE FORM FLOW                               │
└─────────────────────────────────────────────────────────────────────┘

User Action: Click "Create Form"
   │
   ▼
Component: FormBuilderPage
   │
   ▼
Hook: useCreateEventForm()
   │
   ▼
API: formsApi.createEventForm(data)
   │
   ▼
HTTP: POST /event-forms
   │
   ▼
Backend: createEventFormController
   │
   ▼
Service: createEventFormService
   │
   ▼
Database: INSERT INTO EventForm
   │
   ▼
Response: { id, title, target, ... }
   │
   ▼
React Query: Cache update & invalidation
   │
   ▼
UI: Show success toast & update form ID
```

```
┌─────────────────────────────────────────────────────────────────────┐
│                      SUBMIT FORM FLOW                               │
└─────────────────────────────────────────────────────────────────────┘

User Action: Click "Submit Form"
   │
   ▼
Component: FormRendererPage
   │
   ▼
React Hook Form: Validate fields
   │
   ▼
Hook: useSubmitForm()
   │
   ▼
API: formsApi.submitForm(data)
   │
   ▼
HTTP: POST /form-submissions
   │
   ▼
Backend: submitFormController
   │
   ▼
Service: submitFormService
   │
   ▼
Database: INSERT INTO FormSubmission & FormAnswer
   │
   ▼
Response: { id, status, ... }
   │
   ▼
UI: Show success confirmation
```

## Field Type Rendering Logic

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DYNAMIC FIELD RENDERING                          │
└─────────────────────────────────────────────────────────────────────┘

DynamicField Component receives field prop
   │
   ▼
Switch on field.type
   │
   ├─ TEXT ──────────► <input type="text" />
   │
   ├─ TEXTAREA ──────► <textarea />
   │
   ├─ EMAIL ─────────► <input type="email" /> + email validation
   │
   ├─ NUMBER ────────► <input type="number" />
   │
   ├─ DROPDOWN ──────► <select>
   │                      {field.options.map(opt => <option>)}
   │                   </select>
   │
   ├─ CHECKBOX ──────► <div>
   │                      {field.options.map(opt => 
   │                        <input type="checkbox" />
   │                      )}
   │                   </div>
   │
   ├─ RADIO ─────────► <div>
   │                      {field.options.map(opt => 
   │                        <input type="radio" />
   │                      )}
   │                   </div>
   │
   └─ FILE ──────────► <input type="file" />
```

## Validation Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                      VALIDATION PIPELINE                            │
└─────────────────────────────────────────────────────────────────────┘

User Input
   │
   ▼
Client-Side Validation (React Hook Form)
   ├─ Required field check
   ├─ Email format validation
   ├─ Field type validation
   └─ Custom validation rules
   │
   ├─ VALID ──────────► Allow submission
   │                        │
   │                        ▼
   └─ INVALID ────────► Show error message
                            │
                            ▼
                       Block submission

If submission allowed:
   │
   ▼
Server-Side Validation (Backend)
   ├─ Zod schema validation
   ├─ Field name format check
   ├─ UUID validation
   ├─ Options requirement check
   └─ Business logic validation
   │
   ├─ VALID ──────────► Process & save to database
   │                        │
   │                        ▼
   │                   Return success response
   │
   └─ INVALID ────────► Return error response
                            │
                            ▼
                       Show error toast
```

## Caching Strategy

```
┌─────────────────────────────────────────────────────────────────────┐
│                    REACT QUERY CACHING                              │
└─────────────────────────────────────────────────────────────────────┘

Query Keys Structure:
   │
   ├─ ['forms'] ──────────────────────► All forms queries
   │
   ├─ ['forms', 'active', eventId, target] ──► Active form query
   │
   ├─ ['forms', 'detail', formId] ────────────► Form by ID query
   │
   ├─ ['forms', 'fields', formId] ────────────► Form fields query
   │
   └─ ['forms', 'submissions', formId] ───────► Submissions query

Cache Invalidation:
   │
   ├─ On form create ──────► Invalidate ['forms']
   │
   ├─ On form update ──────► Invalidate ['forms', 'detail', formId]
   │                          Invalidate ['forms']
   │
   ├─ On field add ────────► Invalidate ['forms', 'fields', formId]
   │                          Invalidate ['forms', 'detail', formId]
   │
   └─ On field delete ─────► Invalidate ['forms', 'fields', formId]
                              Invalidate ['forms', 'detail', formId]
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ERROR HANDLING                                 │
└─────────────────────────────────────────────────────────────────────┘

Error Occurs
   │
   ├─ Network Error
   │   └─► Show "Connection failed" toast
   │
   ├─ Validation Error
   │   └─► Show field-specific error messages
   │
   ├─ API Error (4xx)
   │   └─► Extract error message from response
   │       └─► Show error toast
   │
   ├─ Server Error (5xx)
   │   └─► Show "Server error" toast
   │
   └─ Unknown Error
       └─► Show generic error message
           └─► Log to console for debugging
```

---

This architecture provides a scalable, maintainable foundation for the Dynamic Form System with clear separation of concerns and well-defined data flows.
