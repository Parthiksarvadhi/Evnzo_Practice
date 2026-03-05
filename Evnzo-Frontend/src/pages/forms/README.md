# Dynamic Form System

> A complete, production-ready form builder and renderer system for the Evenzo event management platform.

## 🎯 Overview

The Dynamic Form System enables event organizers to create custom registration forms for visitors and exhibitors without writing any code. The system consists of two main interfaces:

1. **Form Builder** - For organizers to create and manage forms
2. **Form Renderer** - For users to fill and submit forms

## 🚀 Quick Start

### For Organizers

1. Navigate to `/dashboard/forms`
2. Click "Create Form"
3. Fill in form details and add fields
4. Share the form URL with attendees

### For Developers

```typescript
import { useGetActiveEventForm, useSubmitForm } from '@/services/forms/forms.query';

// Fetch and render a form
function MyForm() {
  const { data: form } = useGetActiveEventForm('event-id', 'VISITOR');
  const { mutate: submit } = useSubmitForm();
  
  // Render form...
}
```

## 📁 Structure

```
src/pages/forms/
├── forms-list/              # Forms management page
│   ├── page.tsx
│   └── index.ts
├── form-builder/            # Form creation/editing
│   ├── page.tsx
│   └── index.ts
├── form-renderer/           # Public form rendering
│   ├── page.tsx
│   └── index.ts
├── README.md               # This file
├── QUICKSTART.md           # 5-minute guide
├── EXAMPLES.md             # Code examples
└── ...
```

## 🎨 Features

### Form Builder
- ✅ Create forms with title, description, and target
- ✅ 8 field types (TEXT, TEXTAREA, EMAIL, NUMBER, DROPDOWN, CHECKBOX, RADIO, FILE)
- ✅ Required field marking
- ✅ Options management for select fields
- ✅ Field ordering
- ✅ Field deletion
- ✅ Real-time updates

### Form Renderer
- ✅ Dynamic form fetching
- ✅ Dynamic field rendering
- ✅ Client-side validation
- ✅ Loading states
- ✅ Error handling
- ✅ Success confirmation
- ✅ Responsive design

## 🔧 Components

### DynamicField
Renders a form field based on its type.

```typescript
<DynamicField field={formField} disabled={false} />
```

### FieldBuilder
Component for adding new fields.

```typescript
<FieldBuilder 
  onAddField={(field) => handleAdd(field)}
  disabled={false}
/>
```

### FieldList
Displays list of form fields.

```typescript
<FieldList 
  fields={formFields}
  onDelete={(id) => handleDelete(id)}
/>
```

## 📡 API Integration

### Hooks

```typescript
// Forms
useCreateEventForm()
useGetActiveEventForm(eventId, target)
useGetEventFormById(formId)
useUpdateEventForm()
useDeleteEventForm()

// Fields
useAddFormField()
useListFormFields(formId)
useUpdateFormField()
useDeleteFormField()

// Submissions
useSubmitForm()
useGetFormSubmissions(formId)
```

### Endpoints

```
POST   /event-forms
GET    /event-forms/:eventId/active?target=VISITOR|EXHIBITOR
GET    /event-forms/:id
PUT    /event-forms/:id
DELETE /event-forms/:id

POST   /form-fields
GET    /form-fields/:formId
PUT    /form-fields/:id
DELETE /form-fields/:id

POST   /form-submissions
GET    /form-submissions/:id
GET    /form-submissions/form/:formId
```

## 🎓 Usage Examples

### Create a Form

```typescript
const { mutate: createForm } = useCreateEventForm();

createForm({
  eventId: 'event-123',
  target: 'VISITOR',
  title: 'Visitor Registration',
  description: 'Please register for the event',
  isActive: true,
});
```

### Add a Field

```typescript
const { mutate: addField } = useAddFormField();

addField({
  formId: 'form-abc',
  name: 'full_name',
  label: 'Full Name',
  type: 'TEXT',
  isRequired: true,
  order: 0,
});
```

### Render a Form

```typescript
function FormPage() {
  const { data: form } = useGetActiveEventForm('event-123', 'VISITOR');
  const methods = useForm();
  
  return (
    <FormProvider {...methods}>
      <form>
        {form?.fields?.map(field => (
          <DynamicField key={field.id} field={field} />
        ))}
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

### Submit a Form

```typescript
const { mutate: submitForm } = useSubmitForm();

const onSubmit = (data: Record<string, any>) => {
  const answers = Object.entries(data).map(([key, value]) => ({
    fieldId: fieldMap[key],
    value: String(value),
  }));

  submitForm({
    formId: 'form-123',
    answers,
  });
};
```

## 🎯 Field Types

| Type | Description | Options Required |
|------|-------------|------------------|
| TEXT | Single-line text input | No |
| TEXTAREA | Multi-line text input | No |
| EMAIL | Email input with validation | No |
| NUMBER | Numeric input | No |
| DROPDOWN | Select dropdown | Yes |
| CHECKBOX | Multiple selection | Yes |
| RADIO | Single selection | Yes |
| FILE | File upload | No |

## ✅ Validation

### Client-Side
- Required field validation
- Email format validation
- Field type validation
- Custom validation rules (via React Hook Form)

### Server-Side
- Field name format validation
- UUID validation
- Options requirement validation
- Business logic validation

## 🎨 Styling

The system uses Tailwind CSS for styling. Key classes:

```css
/* Form container */
.form-container { @apply max-w-2xl mx-auto p-6; }

/* Field wrapper */
.field-wrapper { @apply space-y-1.5; }

/* Input base */
.input-base { @apply w-full px-3 py-2 border rounded-lg; }

/* Button primary */
.btn-primary { @apply px-4 py-2 bg-blue-600 text-white rounded-lg; }
```

## 🔒 Security

- Input sanitization
- XSS prevention
- CSRF protection
- File upload validation
- Authentication required for protected routes

## 📊 Performance

- Lazy loading of pages
- React Query caching
- Optimistic updates
- Code splitting
- Efficient re-renders

## 🐛 Troubleshooting

### Form not loading
- Check eventId and target parameters
- Verify form is active
- Check network requests

### Fields not saving
- Verify formId is set
- Check field name format
- Ensure options are provided for select fields

### Submission failing
- Validate all required fields
- Check network connectivity
- Verify form is active

## 🔮 Future Enhancements

- [ ] Conditional logic
- [ ] Draft saving
- [ ] Advanced validation rules
- [ ] More field types
- [ ] Form templates
- [ ] Analytics dashboard
- [ ] Multi-page forms
- [ ] Enhanced accessibility

## 📚 Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Get started in 5 minutes
- [EXAMPLES.md](./EXAMPLES.md) - Code examples and patterns
- [FORMS_SYSTEM.md](../../FORMS_SYSTEM.md) - Complete documentation
- [FORMS_ARCHITECTURE.md](../../FORMS_ARCHITECTURE.md) - Architecture diagrams
- [FORMS_DEPLOYMENT_CHECKLIST.md](../../FORMS_DEPLOYMENT_CHECKLIST.md) - Deployment guide

## 🤝 Contributing

To extend the form system:

1. Add new field types in `src/types/form.ts`
2. Update `DynamicField.tsx` to render new types
3. Update `FieldBuilder.tsx` to support new types
4. Update backend validation
5. Add tests

## 📞 Support

- Check documentation files
- Review examples
- Check browser console
- Contact development team

## 📝 License

Copyright © 2026 Evenzo. All rights reserved.

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** March 3, 2026
