# Form System Examples

## Complete Working Examples

### Example 1: Simple Contact Form

```typescript
// Step 1: Create the form
const { mutate: createForm } = useCreateEventForm();

createForm({
  eventId: 'event-123',
  target: 'VISITOR',
  title: 'Contact Us',
  description: 'Get in touch with our team',
  isActive: true,
});

// Step 2: Add fields
const { mutate: addField } = useAddFormField();

// Name field
addField({
  formId: 'form-abc',
  name: 'full_name',
  label: 'Full Name',
  type: 'TEXT',
  isRequired: true,
  order: 0,
});

// Email field
addField({
  formId: 'form-abc',
  name: 'email',
  label: 'Email Address',
  type: 'EMAIL',
  isRequired: true,
  order: 1,
});

// Message field
addField({
  formId: 'form-abc',
  name: 'message',
  label: 'Your Message',
  type: 'TEXTAREA',
  isRequired: true,
  order: 2,
});
```

### Example 2: Event Registration Form

```typescript
// Create form with multiple field types
const registrationFields = [
  {
    name: 'attendee_name',
    label: 'Attendee Name',
    type: 'TEXT',
    isRequired: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'EMAIL',
    isRequired: true,
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'TEXT',
    isRequired: false,
  },
  {
    name: 'ticket_type',
    label: 'Ticket Type',
    type: 'DROPDOWN',
    isRequired: true,
    options: ['Early Bird', 'Regular', 'VIP'],
  },
  {
    name: 'dietary_restrictions',
    label: 'Dietary Restrictions',
    type: 'CHECKBOX',
    isRequired: false,
    options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'None'],
  },
  {
    name: 'session_preference',
    label: 'Preferred Session Time',
    type: 'RADIO',
    isRequired: true,
    options: ['Morning (9AM-12PM)', 'Afternoon (1PM-5PM)', 'Evening (6PM-9PM)'],
  },
];

// Add all fields
registrationFields.forEach((field, index) => {
  addField({
    formId: 'form-xyz',
    ...field,
    order: index,
  });
});
```

### Example 3: Custom Form Renderer Component

```typescript
import { useGetActiveEventForm } from '@/services/forms/forms.query';
import { DynamicField } from '@/components/forms/DynamicField';
import { useForm, FormProvider } from 'react-hook-form';

interface CustomFormProps {
  eventId: string;
  target: 'VISITOR' | 'EXHIBITOR';
  onSuccess?: () => void;
}

export function CustomFormRenderer({ eventId, target, onSuccess }: CustomFormProps) {
  const { data: form, isLoading } = useGetActiveEventForm(eventId, target);
  const { mutate: submitForm } = useSubmitForm();
  const methods = useForm();

  const onSubmit = (data: Record<string, any>) => {
    if (!form) return;

    const answers = form.fields!.map((field) => ({
      fieldId: field.id,
      value: data[field.name] || null,
    }));

    submitForm(
      { formId: form.id, answers },
      { onSuccess }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (!form) return <div>Form not found</div>;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold">{form.title}</h2>
        {form.description && <p className="text-gray-600">{form.description}</p>}
        
        {form.fields?.sort((a, b) => a.order - b.order).map((field) => (
          <DynamicField key={field.id} field={field} />
        ))}
        
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
```

### Example 4: Form with Custom Validation

```typescript
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define custom validation schema
const formSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  age: z.number().min(18, 'Must be 18 or older').max(100),
});

export function ValidatedForm() {
  const methods = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Valid data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Your fields here */}
      </form>
    </FormProvider>
  );
}
```

### Example 5: Multi-Step Form (Future Enhancement)

```typescript
import { useState } from 'react';

export function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const steps = [
    { title: 'Personal Info', fields: ['name', 'email', 'phone'] },
    { title: 'Company Info', fields: ['company', 'position', 'size'] },
    { title: 'Preferences', fields: ['interests', 'newsletter'] },
  ];

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (data: any) => {
    const finalData = { ...formData, ...data };
    // Submit to API
  };

  return (
    <div>
      <div className="progress-bar">
        Step {step} of {steps.length}
      </div>
      
      {/* Render current step fields */}
      {step < steps.length ? (
        <StepForm
          fields={steps[step - 1].fields}
          onNext={handleNext}
          onBack={step > 1 ? handleBack : undefined}
        />
      ) : (
        <FinalStep onSubmit={handleSubmit} onBack={handleBack} />
      )}
    </div>
  );
}
```

### Example 6: Form with File Upload

```typescript
export function FileUploadForm() {
  const { mutate: submitForm } = useSubmitForm();
  const methods = useForm();

  const onSubmit = async (data: Record<string, any>) => {
    // Handle file upload
    const fileField = data.company_logo;
    
    if (fileField && fileField[0]) {
      const file = fileField[0];
      
      // Upload file to storage (e.g., S3, Cloudinary)
      const fileUrl = await uploadFile(file);
      
      // Submit form with file URL
      const answers = [
        { fieldId: 'field-1', value: data.company_name },
        { fieldId: 'field-2', value: fileUrl },
      ];
      
      submitForm({ formId: 'form-123', answers });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Fields */}
      </form>
    </FormProvider>
  );
}
```

### Example 7: Conditional Fields (Future Enhancement)

```typescript
export function ConditionalForm() {
  const methods = useForm();
  const watchCompanySize = methods.watch('company_size');

  return (
    <FormProvider {...methods}>
      <form>
        <DynamicField field={companySizeField} />
        
        {/* Show additional field only for large companies */}
        {watchCompanySize === '200+ employees' && (
          <DynamicField field={numberOfOfficesField} />
        )}
        
        {/* Show different fields based on selection */}
        {watchCompanySize === '1-10 employees' ? (
          <DynamicField field={startupQuestionsField} />
        ) : (
          <DynamicField field={enterpriseQuestionsField} />
        )}
      </form>
    </FormProvider>
  );
}
```

### Example 8: Form with Real-time Validation

```typescript
export function RealtimeValidationForm() {
  const methods = useForm({ mode: 'onChange' }); // Validate on change
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);

  const checkEmailAvailability = async (email: string) => {
    // Check if email is already registered
    const response = await fetch(`/api/check-email?email=${email}`);
    const data = await response.json();
    setIsEmailAvailable(data.available);
  };

  return (
    <FormProvider {...methods}>
      <form>
        <input
          {...methods.register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email',
            },
            onChange: (e) => checkEmailAvailability(e.target.value),
          })}
        />
        {isEmailAvailable === false && (
          <p className="text-red-500">Email already registered</p>
        )}
        {isEmailAvailable === true && (
          <p className="text-green-500">Email available</p>
        )}
      </form>
    </FormProvider>
  );
}
```

### Example 9: Form Analytics Integration

```typescript
export function AnalyticsForm() {
  const { mutate: submitForm } = useSubmitForm();
  const [startTime] = useState(Date.now());

  const onSubmit = (data: any) => {
    const completionTime = Date.now() - startTime;
    
    // Track form completion
    analytics.track('Form Submitted', {
      formId: 'form-123',
      completionTime,
      fieldCount: Object.keys(data).length,
      timestamp: new Date().toISOString(),
    });

    submitForm({ formId: 'form-123', answers: [] });
  };

  const trackFieldInteraction = (fieldName: string) => {
    analytics.track('Field Focused', {
      formId: 'form-123',
      fieldName,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Track field interactions */}
      <input
        onFocus={() => trackFieldInteraction('email')}
        {...methods.register('email')}
      />
    </form>
  );
}
```

### Example 10: Accessible Form

```typescript
export function AccessibleForm() {
  return (
    <form aria-label="Registration Form">
      <fieldset>
        <legend>Personal Information</legend>
        
        <div className="form-group">
          <label htmlFor="name" className="required">
            Full Name
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="name"
            type="text"
            aria-required="true"
            aria-describedby="name-error"
            {...methods.register('name')}
          />
          {errors.name && (
            <span id="name-error" role="alert" className="error">
              {errors.name.message}
            </span>
          )}
        </div>
      </fieldset>
      
      <button type="submit" aria-label="Submit registration form">
        Submit
      </button>
    </form>
  );
}
```

## Testing Examples

### Unit Test Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { DynamicField } from '@/components/forms/DynamicField';
import { FormProvider, useForm } from 'react-hook-form';

describe('DynamicField', () => {
  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('renders text field correctly', () => {
    const field = {
      id: '1',
      name: 'test_field',
      label: 'Test Field',
      type: 'TEXT' as const,
      isRequired: true,
      options: [],
      order: 0,
    };

    render(
      <TestWrapper>
        <DynamicField field={field} />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/Test Field/i)).toBeInTheDocument();
  });

  it('shows validation error for required field', async () => {
    // Test validation logic
  });
});
```

### Integration Test Example

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetActiveEventForm } from '@/services/forms/forms.query';

describe('Form API Integration', () => {
  it('fetches active form successfully', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(
      () => useGetActiveEventForm('event-123', 'VISITOR'),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
});
```

## Common Patterns

### Pattern 1: Form State Management

```typescript
// Use React Hook Form for form state
const methods = useForm({
  defaultValues: {},
  mode: 'onBlur', // Validate on blur
});

// Access form state
const { formState: { errors, isDirty, isValid } } = methods;
```

### Pattern 2: Error Handling

```typescript
const { mutate: submitForm, error, isError } = useSubmitForm();

if (isError) {
  return <ErrorMessage error={error} />;
}
```

### Pattern 3: Loading States

```typescript
const { data, isLoading, isFetching } = useGetActiveEventForm(eventId, target);

if (isLoading) return <Skeleton />;
if (isFetching) return <LoadingOverlay />;
```

---

These examples demonstrate the flexibility and power of the Dynamic Form System. Mix and match patterns to build the perfect form for your use case!
