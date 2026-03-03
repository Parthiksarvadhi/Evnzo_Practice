# Dynamic Form System - User Guide

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [For Organizers](#for-organizers)
3. [For Visitors/Exhibitors](#for-visitorsexhibitors)
4. [Field Types Guide](#field-types-guide)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)
7. [FAQs](#faqs)

---

## Introduction

The Evenzo Dynamic Form System allows event organizers to create custom registration forms for their events. No coding required!

### What can you do?

**As an Organizer:**
- Create custom forms for visitors and exhibitors
- Add various types of fields (text, email, dropdowns, etc.)
- Mark fields as required or optional
- View form submissions

**As a Visitor/Exhibitor:**
- Fill out registration forms
- Upload documents if required
- Receive confirmation after submission

---

## For Organizers

### Creating Your First Form

#### Step 1: Access Forms Management

1. Log in to your Evenzo dashboard
2. Click on "Forms" in the navigation menu
3. You'll see a list of all your forms (empty if this is your first time)

#### Step 2: Create a New Form

1. Click the **"Create Form"** button
2. Fill in the form details:
   - **Form Title**: Give your form a clear, descriptive name
     - Example: "Visitor Registration Form"
   - **Description** (optional): Add instructions or context
     - Example: "Please fill in your details to register for the event"
   - **Target Audience**: Choose who this form is for
     - **Visitor**: For event attendees
     - **Exhibitor**: For companies showcasing at the event
3. Click **"Create Form"**

#### Step 3: Add Fields to Your Form

Now you can add fields to collect information. For each field:

1. **Field Name**: Internal identifier (lowercase, no spaces)
   - Example: `full_name`, `company_email`
   - Use underscores instead of spaces
   
2. **Display Label**: What users will see
   - Example: "Full Name", "Company Email"
   
3. **Field Type**: Choose from 8 types (see [Field Types Guide](#field-types-guide))
   
4. **Required**: Check if this field must be filled
   
5. **Options** (for dropdown, radio, checkbox only):
   - Type an option and press Enter
   - Add multiple options
   - Remove options by clicking the X

6. Click **"Add Field"**

#### Step 4: Manage Your Fields

After adding fields, you can:

- **View all fields** in the list below
- **Delete fields** by clicking the trash icon
- **See field details** including type and requirements

#### Step 5: Share Your Form

1. Click **"Done"** when finished
2. Copy the form URL to share with attendees:
   ```
   https://your-domain.com/forms/render?eventId=YOUR_EVENT_ID&target=VISITOR
   ```
3. Share via email, website, or social media

### Example: Creating a Visitor Registration Form

Let's create a complete visitor registration form:

**Form Details:**
- Title: "Tech Conference 2026 - Visitor Registration"
- Description: "Register to attend our annual tech conference"
- Target: Visitor

**Fields to Add:**

1. **Full Name**
   - Field Name: `full_name`
   - Label: "Full Name"
   - Type: Text
   - Required: ✓

2. **Email Address**
   - Field Name: `email`
   - Label: "Email Address"
   - Type: Email
   - Required: ✓

3. **Phone Number**
   - Field Name: `phone`
   - Label: "Phone Number"
   - Type: Text
   - Required: ✗

4. **Company Name**
   - Field Name: `company_name`
   - Label: "Company Name"
   - Type: Text
   - Required: ✓

5. **Job Title**
   - Field Name: `job_title`
   - Label: "Job Title"
   - Type: Text
   - Required: ✓

6. **Company Size**
   - Field Name: `company_size`
   - Label: "Company Size"
   - Type: Dropdown
   - Required: ✓
   - Options:
     - 1-10 employees
     - 11-50 employees
     - 51-200 employees
     - 200+ employees

7. **Areas of Interest**
   - Field Name: `interests`
   - Label: "What topics interest you?"
   - Type: Checkbox
   - Required: ✗
   - Options:
     - Artificial Intelligence
     - Cloud Computing
     - Cybersecurity
     - Data Science
     - DevOps

8. **How did you hear about us?**
   - Field Name: `referral_source`
   - Label: "How did you hear about us?"
   - Type: Radio
   - Required: ✗
   - Options:
     - Social Media
     - Email Newsletter
     - Colleague Referral
     - Search Engine
     - Other

### Managing Existing Forms

From the Forms Management page, you can:

- **Edit**: Click "Edit" to modify fields
- **View Submissions**: Click "View" to see who submitted
- **Delete**: Remove forms you no longer need

---

## For Visitors/Exhibitors

### Filling Out a Form

#### Step 1: Access the Form

1. Click the form link provided by the organizer
2. The form will load with all required information

#### Step 2: Read the Instructions

- Check the form title and description
- Note which fields are required (marked with *)
- Understand what information is needed

#### Step 3: Fill in the Fields

**Text Fields:**
- Type your answer directly
- Example: "John Smith" for Full Name

**Email Fields:**
- Enter a valid email address
- Example: john.smith@company.com

**Number Fields:**
- Enter numbers only
- Example: 25 for age

**Dropdown Fields:**
- Click to see options
- Select one option from the list

**Checkbox Fields:**
- Select multiple options if desired
- Check all that apply

**Radio Buttons:**
- Select only one option
- Click to change your selection

**File Upload:**
- Click "Choose File"
- Select file from your computer
- Supported formats will be specified

#### Step 4: Review Your Answers

- Check all required fields are filled (marked with *)
- Verify your information is correct
- Make any necessary corrections

#### Step 5: Submit

1. Click the **"Submit Form"** button
2. Wait for the confirmation message
3. You'll see a success screen when complete

### Tips for Form Submission

✅ **Do:**
- Fill in all required fields
- Use a valid email address
- Double-check your information
- Submit only once

❌ **Don't:**
- Leave required fields empty
- Use fake or invalid information
- Submit multiple times
- Close the page before seeing confirmation

---

## Field Types Guide

### 1. Text Field
**Best for:** Names, addresses, short answers

**Example:**
```
Full Name: [________________]
```

**Tips:**
- Keep answers concise
- Use proper capitalization

### 2. Text Area
**Best for:** Long descriptions, comments, feedback

**Example:**
```
Tell us about your company:
[                          ]
[                          ]
[                          ]
[                          ]
```

**Tips:**
- Provide detailed information
- Use complete sentences

### 3. Email Field
**Best for:** Email addresses

**Example:**
```
Email: [________________]
```

**Tips:**
- Use a valid email format
- Double-check for typos
- Example: user@domain.com

### 4. Number Field
**Best for:** Age, quantity, numeric values

**Example:**
```
Number of attendees: [____]
```

**Tips:**
- Enter numbers only
- No letters or special characters

### 5. Dropdown
**Best for:** Selecting from predefined options

**Example:**
```
Company Size: [Select an option ▼]
              - 1-10 employees
              - 11-50 employees
              - 51-200 employees
```

**Tips:**
- Click to see all options
- Select the most appropriate option

### 6. Checkbox
**Best for:** Multiple selections

**Example:**
```
Areas of Interest:
☐ Technology
☐ Marketing
☐ Sales
☐ Operations
```

**Tips:**
- Select all that apply
- You can choose multiple options

### 7. Radio Buttons
**Best for:** Single selection from options

**Example:**
```
Preferred Session Time:
○ Morning (9AM-12PM)
○ Afternoon (1PM-5PM)
○ Evening (6PM-9PM)
```

**Tips:**
- Choose only one option
- Click to change selection

### 8. File Upload
**Best for:** Documents, images, certificates

**Example:**
```
Upload Resume: [Choose File] No file chosen
```

**Tips:**
- Check file size limits
- Use supported formats
- Ensure file is not corrupted

---

## Best Practices

### For Organizers

#### Form Design

1. **Keep it simple**
   - Only ask for necessary information
   - Avoid overwhelming users with too many fields

2. **Use clear labels**
   - Make field labels descriptive
   - Avoid jargon or abbreviations

3. **Group related fields**
   - Put similar information together
   - Use logical ordering

4. **Mark required fields clearly**
   - Only require essential information
   - Let users know what's mandatory

5. **Provide examples**
   - Use placeholder text
   - Add helpful descriptions

#### Field Selection

**Use TEXT for:**
- Names
- Addresses
- Short answers

**Use TEXTAREA for:**
- Descriptions
- Comments
- Long-form answers

**Use EMAIL for:**
- Email addresses (automatic validation)

**Use NUMBER for:**
- Age
- Quantity
- Numeric values

**Use DROPDOWN for:**
- Predefined options
- Single selection
- Long lists

**Use CHECKBOX for:**
- Multiple selections
- Optional preferences

**Use RADIO for:**
- Single selection
- 2-5 options
- Mutually exclusive choices

**Use FILE for:**
- Documents
- Images
- Certificates

### For Users

1. **Read carefully**
   - Understand what's being asked
   - Check for special instructions

2. **Be accurate**
   - Provide correct information
   - Double-check before submitting

3. **Complete required fields**
   - Look for the * symbol
   - Don't skip mandatory fields

4. **Use appropriate formats**
   - Email: user@domain.com
   - Phone: Include country code if international

5. **Save confirmation**
   - Take a screenshot of the success message
   - Note any reference numbers

---

## Troubleshooting

### Common Issues and Solutions

#### "Form not found"

**Problem:** The form link doesn't work

**Solutions:**
- Check the URL is complete and correct
- Verify the form is still active
- Contact the organizer for a new link

#### "Email is invalid"

**Problem:** Email field shows an error

**Solutions:**
- Check for typos
- Ensure format is correct (user@domain.com)
- Remove any spaces

#### "This field is required"

**Problem:** Can't submit because of missing fields

**Solutions:**
- Look for fields marked with *
- Fill in all required information
- Scroll through the entire form

#### "Form won't submit"

**Problem:** Submit button doesn't work

**Solutions:**
- Check all required fields are filled
- Verify email format is correct
- Check your internet connection
- Try refreshing the page

#### "Page is loading forever"

**Problem:** Form doesn't load

**Solutions:**
- Check your internet connection
- Try a different browser
- Clear browser cache
- Contact support

---

## FAQs

### General Questions

**Q: Can I save my progress and come back later?**
A: Currently, forms must be completed in one session. This feature is coming soon!

**Q: Can I edit my submission after submitting?**
A: No, submissions are final. Please review carefully before submitting.

**Q: How do I know my form was submitted successfully?**
A: You'll see a success confirmation screen with a checkmark.

**Q: Is my information secure?**
A: Yes, all data is transmitted securely and stored safely.

### For Organizers

**Q: How many fields can I add to a form?**
A: There's no strict limit, but we recommend keeping forms concise (10-15 fields max).

**Q: Can I edit a form after creating it?**
A: Yes, you can add or remove fields at any time.

**Q: Can I have multiple forms for one event?**
A: Yes, you can create separate forms for visitors and exhibitors.

**Q: How do I view submissions?**
A: Click "View" on the form card in the Forms Management page.

**Q: Can I export submissions?**
A: This feature is coming soon!

### For Users

**Q: Do I need to create an account?**
A: No, you can fill out forms without an account.

**Q: Can I submit the form multiple times?**
A: Please submit only once. Multiple submissions may be rejected.

**Q: What file formats are supported for uploads?**
A: Common formats like PDF, JPG, PNG, and DOCX are typically supported.

**Q: Is there a file size limit?**
A: Yes, typically 5-10MB per file. Check with the organizer for specific limits.

---

## Need More Help?

### Resources

- **Quick Start Guide**: See [QUICKSTART.md](./src/pages/forms/QUICKSTART.md)
- **Code Examples**: See [EXAMPLES.md](./src/pages/forms/EXAMPLES.md)
- **Technical Documentation**: See [FORMS_SYSTEM.md](./FORMS_SYSTEM.md)

### Contact Support

- **Email**: support@evenzo.com
- **Phone**: +1 (555) 123-4567
- **Live Chat**: Available on the website

### Video Tutorials

Coming soon! Check our website for video guides on:
- Creating your first form
- Understanding field types
- Managing submissions

---

**Last Updated:** March 3, 2026  
**Version:** 1.0.0

---

Thank you for using the Evenzo Dynamic Form System! 🎉
