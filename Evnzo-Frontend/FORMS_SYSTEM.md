# Dynamic Form System - Evenzo MVP

## Overview

A fully dynamic, scalable form builder and renderer system for the Evenzo event management platform. The system supports two main interfaces:

1. **Organizer Form Builder** - Create and manage dynamic forms
2. **Visitor/Exhibitor Form Renderer** - Fill and submit forms

## Features

### Form Builder (Organizer Interface)
- ✅ Create forms with title, description, and target audience (Visitor/Exhibitor)
- ✅ Add dynamic fields with 8 field types
- ✅ Mark fields as required
- ✅ Define options for dropdown, radio, and checkbox fields
- ✅ Reorder fields (visual order management)
- ✅ Delete fields
- ✅ Real-time field preview
- ✅ Auto-save functionality

### Form Renderer (User Interface)
- ✅ Fetch active forms dynamically by event ID and target type
- ✅ Render fields dynamically based on field type
- ✅ Client-side validation (required fields, email format, etc.)
- ✅ Loading states and error handling
- ✅ Success confirmation after submission
- ✅ Clean, professional UI

### Supported Field Types
1. **TEXT** - Single-line text input
2. **TEXTAREA** - Multi-line text input
3. **EMAIL** - Email input with validation
4. **NUMBER** - Numeric input
5. **DROPDOWN** - Select dropdown with options
6. **CHECKBOX** - Multiple selection checkboxes
7. **RADIO** - Single selection radio buttons
8. **FILE** - File upload

## Architecture

### Directory Structure

```
src/
├── types/
│   └── form.ts                    # TypeScript interfaces
├── services/
│   └── forms/
│       ├── forms.api.ts           # API integration
│       └── forms.query.ts         # React Query hooks
├── components/
│   └── forms/
│       ├── DynamicField.tsx       # Dynamic field renderer
│       ├── FieldBuilder.tsx       # Field creation component
│       └── FieldList.tsx          # Field list with actions
└── pages/
    └── forms/
        ├── forms-list/            # Forms management page
        ├── form-builder/          # Form creation/editing
        └── form-renderer/         # Public form rendering
```

### Tech Stack

- **React 19** with TypeScript
- **React Hook Form** - Form state management and validation
- **React Query** - Server state management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Zod** - Schema validation (backend)

## API Integration

### Endpoints Used

#### Event Forms
- `POST /event-forms` - Create new form
- `GET /event-forms/:eventId/active?target=VISITOR|EXHIBITOR` - Get active form
- `GET /event-forms/:id` - Get form by ID
- `PUT /event-forms/:id` - Update form
- `DELETE /event-forms/:id` - Delete form

#### Form Fields
- `POST /form-fields` - Add field to form
- `GET /form-fields/:formId` - List all fields for a form
- `PUT /form-fields/:id` - Update field
- `DELETE /form-fields/:id` - Delete field

#### Form Submissions
- `POST /form-submissions` - Submit form answers
- `GET /form-submissions/:id` - Get submission by ID
- `GET /form-submissions/form/:formId` - List all submissions for a form

## Usage Guide

### For Organizers

#### Creating a New Form

1. Navigate to `/dashboard/forms`
2. Click "Create Form"
3. Fill in form details:
   - Form Title (required)
   - Description (optional)
   - Target Audience (Visitor or Exhibitor)
4. Click "Create Form"
5. Add fields using the Field Builder:
   - Enter field name (internal identifier, e.g., `company_name`)
   - Enter display label (e.g., "Company Name")
   - Select field type
   - Mark as required if needed
   - Add options for dropdown/radio/checkbox fields
6. Click "Add Field" to add each field
7. Fields appear in the list below
8. Delete fields using the trash icon
9. Click "Done" when finished

#### Editing an Existing Form

1. Navigate to `/dashboard/forms`
2. Click "Edit" on the form card
3. Add or remove fields as needed
4. Changes are saved automatically

### For Visitors/Exhibitors

#### Filling Out a Form

1. Access the form via the public URL:
   ```
   /forms/render?eventId={EVENT_ID}&target={VISITOR|EXHIBITOR}
   ```
2. Fill in all required fields (marked with *)
3. Click "Submit Form"
4. See success confirmation

## Component API

### DynamicField

Renders a form field dynamically based on field type.

```tsx
<DynamicField 
  field={formField} 
  disabled={false} 
/>
```

**Props:**
- `field: FormField` - Field configuration object
- `disabled?: boolean` - Disable field input

### FieldBuilder

Component for adding new fields to a form.

```tsx
<FieldBuilder 
  onAddField={(fieldData) => handleAddField(fieldData)}
  disabled={false}
/>
```

**Props:**
- `onAddField: (field: FieldData) => void` - Callback when field is added
- `disabled?: boolean` - Disable the builder

### FieldList

Displays list of form fields with actions.

```tsx
<FieldList 
  fields={formFields}
  onDelete={(fieldId) => handleDelete(fieldId)}
  disabled={false}
/>
```

**Props:**
- `fields: FormField[]` - Array of form fields
- `onDelete: (fieldId: string) => void` - Delete callback
- `disabled?: boolean` - Disable actions

## React Query Hooks

### Form Management

```tsx
// Create form
const { mutate: createForm } = useCreateEventForm();

// Get active form
const { data: form } = useGetActiveEventForm(eventId, target);

// Get form by ID
const { data: form } = useGetEventFormById(formId);

// Update form
const { mutate: updateForm } = useUpdateEventForm();

// Delete form
const { mutate: deleteForm } = useDeleteEventForm();
```

### Field Management

```tsx
// Add field
const { mutate: addField } = useAddFormField();

// List fields
const { data: fields } = useListFormFields(formId);

// Update field
const { mutate: updateField } = useUpdateFormField();

// Delete field
const { mutate: deleteField } = useDeleteFormField();
```

### Submissions

```tsx
// Submit form
const { mutate: submitForm } = useSubmitForm();

// Get submissions
const { data: submissions } = useGetFormSubmissions(formId);
```

## Validation

### Client-Side Validation

- Required fields validation
- Email format validation
- Field type validation (number, email, etc.)
- Options validation for select fields

### Server-Side Validation

Backend uses Zod schemas for validation:
- Field name format (alphanumeric + underscores)
- Required options for dropdown/radio/checkbox
- UUID validation for IDs
- Target type validation

## Future Enhancements

### Planned Features

1. **Conditional Logic**
   - Show/hide fields based on other field values
   - Dynamic field dependencies

2. **Draft Saving**
   - Save form progress
   - Resume later functionality

3. **Field Validation Rules**
   - Min/max length
   - Custom regex patterns
   - Custom error messages

4. **Advanced Field Types**
   - Date picker
   - Time picker
   - Multi-file upload
   - Rich text editor
   - Phone number with country code

5. **Form Templates**
   - Pre-built form templates
   - Clone existing forms
   - Import/export forms

6. **Analytics**
   - Submission statistics
   - Field completion rates
   - Drop-off analysis

7. **Multi-page Forms**
   - Step-by-step forms
   - Progress indicator
   - Section grouping

8. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

## Best Practices

### Performance
- Lazy loading of form pages
- React Query caching
- Optimistic updates
- Debounced field updates

### Security
- Input sanitization
- XSS prevention
- CSRF protection
- File upload validation

### UX
- Clear error messages
- Loading states
- Success feedback
- Responsive design
- Mobile-friendly

## Troubleshooting

### Common Issues

**Form not loading**
- Check eventId and target parameters
- Verify form is active in database
- Check network requests in DevTools

**Fields not saving**
- Verify formId is set
- Check field name format (alphanumeric + underscores)
- Ensure options are provided for dropdown/radio/checkbox

**Submission failing**
- Validate all required fields are filled
- Check network connectivity
- Verify form is still active

## Testing

### Manual Testing Checklist

- [ ] Create form with all field types
- [ ] Mark fields as required
- [ ] Add options to dropdown/radio/checkbox
- [ ] Delete fields
- [ ] Submit form with valid data
- [ ] Submit form with missing required fields
- [ ] Submit form with invalid email
- [ ] Test on mobile devices
- [ ] Test with slow network

## Support

For issues or questions:
1. Check this documentation
2. Review backend API documentation
3. Check browser console for errors
4. Contact development team

---

**Version:** 1.0.0  
**Last Updated:** March 2026  
**Maintainer:** Evenzo Development Team
