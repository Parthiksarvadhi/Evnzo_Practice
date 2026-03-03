import prisma from '@db/prisma';

interface CreateEventFormData {
  eventId: string;
  target: 'VISITOR' | 'EXHIBITOR';
  title: string;
  description?: string;
  isActive?: boolean;
}

interface UpdateEventFormData {
  title?: string;
  description?: string;
  isActive?: boolean;
}

export const createEventForm = async (data: CreateEventFormData) => {
  return await prisma.eventForm.create({
    data: {
      eventId: data.eventId,
      target: data.target,
      title: data.title,
      description: data.description,
      isActive: data.isActive ?? true,
    },
    include: {
      fields: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
};

export const getActiveEventForm = async (eventId: string, target: 'VISITOR' | 'EXHIBITOR') => {
  const form = await prisma.eventForm.findFirst({
    where: {
      eventId,
      target,
      isActive: true,
    },
    include: {
      fields: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
  
  if (!form) return null;
  
  return {
    ...form,
    fields: form.fields.map(field => ({
      ...field,
      options: JSON.parse(field.options),
    })),
  };
};

export const getEventFormById = async (id: string) => {
  const form = await prisma.eventForm.findUnique({
    where: { id },
    include: {
      fields: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
  
  if (!form) return null;
  
  return {
    ...form,
    fields: form.fields.map(field => ({
      ...field,
      options: JSON.parse(field.options),
    })),
  };
};

export const updateEventForm = async (id: string, data: UpdateEventFormData) => {
  return await prisma.eventForm.update({
    where: { id },
    data,
    include: {
      fields: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
};

export const deleteEventForm = async (id: string) => {
  await prisma.eventForm.delete({
    where: { id },
  });
};
