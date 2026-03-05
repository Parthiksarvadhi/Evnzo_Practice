import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Copy, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { eventsApi } from '@/services/events/events.api';
import { format } from 'date-fns';

const eventSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    description: z.string().optional(),
});

type EventValues = z.infer<typeof eventSchema>;

export function EventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<EventValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: { name: '', description: '' },
    });

    const fetchEvents = async () => {
        try {
            const data = await eventsApi.getEvents();
            setEvents(data);
        } catch (err: any) {
            toast.error('Failed to load events');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const onSubmit = async (data: EventValues) => {
        try {
            await eventsApi.createEvent(data);
            toast.success('Event created successfully');
            reset();
            fetchEvents();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to create event');
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Event ID copied!');
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Events</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Create completely new events and copy their UUIDs to generate forms for them!
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Create Event Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-xl border border-border p-6 shadow-sm sticky top-6">
                        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                            <Plus className="w-5 h-5 text-primary" /> Create Event
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-foreground">Event Name</label>
                                <input
                                    {...register('name')}
                                    placeholder="e.g. DreamHack 2026"
                                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-foreground">Description</label>
                                <textarea
                                    {...register('description')}
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                                    placeholder="Optional details..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full justify-center px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create and Save'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* List of Events grid */}
                <div className="md:col-span-2">
                    {isLoading ? (
                        <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                    ) : events.length === 0 ? (
                        <div className="text-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="font-semibold text-gray-700">No events found</p>
                            <p className="text-sm text-gray-500">Create your first event from the sidebar</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {events.map((evt) => (
                                <div key={evt.id} className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all">
                                    <h3 className="font-bold text-base text-foreground mb-1 truncate">{evt.name}</h3>
                                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2 min-h-[32px]">
                                        {evt.description || 'No description provided.'}
                                    </p>

                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600 truncate flex-1">
                                            {evt.id}
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(evt.id)}
                                            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors flex-shrink-0"
                                            title="Copy ID"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
                                        Created {format(new Date(evt.createdAt), 'MMM d, yyyy')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
