# Quick Start Guide - Dynamic Forms

## 🚀 Getting Started in 5 Minutes

### Step 1: Access Forms Management

Navigate to the forms management page:
```
/dashboard/forms
```

### Step 2: Create Your First Form

1. Click **"Create Form"** button
2. Fill in the form details:
   ```
   Title: "Visitor Registration Form"
   Description: "Please fill in your details to register"
   Target: "Visitor"
   ```
3. Click **"Create Form"**

### Step 3: Add Fields

Use the Field Builder to add fields:

**Example 1: Text Field**
```
Field Name: full_name
Display Label: Full Name
Type: Text
Required: ✓
```

**Example 2: Email Field**
```
Field Name: email
Display Label: Email Address
Type: Email
Required: ✓
```

**Example 3: Dropdown Field**
```
Field Name: company_size
Display Label: Company Size
Type: Dropdown
Required: ✓
Options:
  - 1-10 employees
  - 11-50 employees
  - 51-200 employees
  - 200+ employees
```

**Example 4: Checkbox Field**
```
Field Name: interests
Display Label: Areas of Interest
Type: Checkbox
Required: ✗
Options:
  - Technology
  - Marketing
  - Sales
  - Operations
```

### Step 4: Test Your Form

Access the public form URL:
```
/forms/render?eventId=YOUR_EVENT_ID&target=VISITOR
```

Fill out the form and submit!

## 📋 Common Form Templates

### Visitor Registration Form

```
Fields:
1. Full Name (TEXT, required)
2. Email (EMAIL, required)
3. Phone Number (TEXT, required)
4. Company Name (TEXT, required)
5. Job Title (TEXT, required)
6. Company Size (DROPDOWN, required)
7. Areas of Interest (CHECKBOX, optional)
8. How did you hear about us? (RADIO, optional)
```

### Exhibitor Application Form

```
Fields:
1. Company Name (TEXT, required)
2. Contact Person (TEXT, required)
3. Email (EMAIL, required)
4. Phone (TEXT, required)
5. Company Description (TEXTAREA, required)
6. Booth Size Preference (DROPDOWN, required)
7. Products/Services (TEXTAREA, required)
8. Special Requirements (TEXTAREA, optional)
9. Company Logo (FILE, optional)
```

## 🎯 Pro Tips

### Field Naming Convention
- Use lowercase with underscores: `company_name`
- Be descriptive: `preferred_contact_method`
- Avoid spaces and special characters

### Required Fields
- Mark essential fields as required
- Don't overuse - only require what you truly need
- Consider user experience

### Options for Select Fields
- Keep options concise
- Order logically (alphabetical or by frequency)
- Include "Other" option when appropriate

### Form Organization
- Group related fields together
- Use logical field order
- Start with basic info, end with optional details

## 🔧 API Integration Example

### Fetching Active Form

```typescript
import { useGetActiveEventForm } from '@/services/forms/forms.query';

function MyComponent() {
  const { data: form, isLoading } = useGetActiveEventForm(
    'event-123',
    'VISITOR'
  );

  if (isLoading) return <div>Loading...</div>;
  
  return <div>{form?.title}</div>;
}
```

### Submitting Form

```typescript
import { useSubmitForm } from '@/services/forms/forms.query';

function MyForm() {
  const { mutate: submitForm } = useSubmitForm();

  const handleSubmit = (data: Record<string, any>) => {
    const answers = Object.entries(data).map(([key, value]) => ({
      fieldId: fieldMap[key],
      value: String(value),
    }));

    submitForm({
      formId: 'form-123',
      answers,
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 🐛 Troubleshooting

### Form Not Showing
- Verify eventId is correct
- Check target type matches (VISITOR vs EXHIBITOR)
- Ensure form is marked as active

### Fields Not Saving
- Check field name format (no spaces, special chars)
- Verify options are added for dropdown/radio/checkbox
- Ensure you're connected to the backend

### Submission Failing
- Fill all required fields
- Check email format is valid
- Verify network connection

## 📚 Next Steps

1. Read the full [FORMS_SYSTEM.md](./FORMS_SYSTEM.md) documentation
2. Explore advanced features like field reordering
3. Check out the component API reference
4. Review backend validation rules

## 🆘 Need Help?

- Check browser console for errors
- Review network tab in DevTools
- Verify backend API is running
- Contact development team

---

Happy form building! 🎉
