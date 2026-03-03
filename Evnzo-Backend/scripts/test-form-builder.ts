import { createEventFormService } from '../src/modules/event-form/event-form.service';
import { addFormFieldService } from '../src/modules/form-field/form-field.service';
import { submitFormService, getFormSubmissionsListService } from '../src/modules/form-submission/form-submission.service';
import { prisma } from '../src/db/prisma';

async function testFormBuilder() {
    console.log('--- Starting Form Builder Test ---');
    try {
        // 1. Create a dummy event to attach the form to
        const event = await prisma.event.create({
            data: {
                name: 'Tech Conference 2026',
                description: 'A great conference for tech enthusiasts',
            },
        });
        console.log(`✅ Event Created: ${event.id}`);

        // 2. Create an EventForm for Visitors
        const form = await createEventFormService({
            eventId: event.id,
            target: 'VISITOR',
            title: 'Visitor Registration Form',
            description: 'Please fill out to register for the conference',
        });
        console.log(`✅ Form Created: ${form.id}`);

        // 3. Add Dynamic Fields
        const fullNameField = await addFormFieldService({
            formId: form.id,
            name: 'full_name',
            label: 'Full Name',
            type: 'TEXT',
            isRequired: true,
            order: 1,
        });
        console.log(`✅ Field Added: Full Name (TEXT, Required)`);

        const emailField = await addFormFieldService({
            formId: form.id,
            name: 'email',
            label: 'Email Address',
            type: 'EMAIL',
            isRequired: true,
            order: 2,
        });
        console.log(`✅ Field Added: Email Address (EMAIL, Required)`);

        await addFormFieldService({
            formId: form.id,
            name: 'role',
            label: 'Current Role',
            type: 'DROPDOWN',
            isRequired: false,
            options: ['Developer', 'Designer', 'Manager', 'Other'],
            order: 3,
        });
        console.log(`✅ Field Added: Current Role (DROPDOWN, Optional)`);

        // Fetch form with all newly created fields before submitting
        const activeForm = await getFormSubmissionsListService(form.id).then(() => prisma.eventForm.findUnique({ where: { id: form.id }, include: { fields: true } }));

        // 4. Test Submission (Success)
        const submission = await submitFormService(form.id, undefined, [
            { fieldId: emailField.id, value: 'test@example.com' },
            { fieldId: fullNameField.id, value: 'John Doe' },
        ]);
        console.log(`✅ Form Submitted Successfully! Submission ID: ${submission.id}`);

        // Fetch Submissions
        const submissions = await getFormSubmissionsListService(form.id);
        console.log(`✅ Fetched Submissions: Found ${submissions.length}`);

    } catch (error) {
        console.error('❌ Test Failed:', error);
    } finally {
        const deletedCount = await prisma.event.deleteMany();
        console.log(`\nCleaned up ${deletedCount.count} events and cascading relations.`);
    }
}

testFormBuilder();
