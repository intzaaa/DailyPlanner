import type { User } from "./user.ts";
import type { HumanFriendlyCalendar, HumanFriendlyCalendarEvent } from "./calendar.ts";

export interface NotificationReminder {
    id: string;
    message: string;
    time: string;
}

export interface UserAPI {
    create(user: User): Promise<User>;
    get(id: string): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
    list(): Promise<ReadonlyArray<User>>;
    authenticate(credentials: { username: string; password: string }): Promise<string>;
    profile: {
        get(id: string): Promise<User>;
        update(id: string, data: Partial<User>): Promise<User>;
    };
}

export interface SubscriptionAPI {
    subscribe(userId: string, targetId: string, type: "calendar" | "event"): Promise<void>;
    unsubscribe(userId: string, targetId: string, type: "calendar" | "event"): Promise<void>;
    listSubscriptions(userId: string): Promise<ReadonlyArray<{ targetId: string; type: "calendar" | "event" }>>;
}

export interface PermissionAPI {
    grant(userId: string, permission: string): Promise<void>;
    revoke(userId: string, permission: string): Promise<void>;
    check(userId: string, permission: string): Promise<boolean>;
}

export interface CalendarAPI {
    create(calendar: HumanFriendlyCalendar): Promise<HumanFriendlyCalendar>;
    get(calendarId: string): Promise<HumanFriendlyCalendar>;
    update(calendar: Partial<HumanFriendlyCalendar>): Promise<HumanFriendlyCalendar>;
    delete(calendarId: string): Promise<void>;
    listEvents(calendarId: string, dateRange?: { start: string; end: string }): Promise<ReadonlyArray<HumanFriendlyCalendarEvent>>;
    share(calendarId: string, userId: string): Promise<void>;
}

export interface EventAPI {
    create(event: HumanFriendlyCalendarEvent): Promise<HumanFriendlyCalendarEvent>;
    get(id: string): Promise<HumanFriendlyCalendarEvent | null>;
    update(id: string, data: Partial<HumanFriendlyCalendarEvent>): Promise<HumanFriendlyCalendarEvent>;
    delete(id: string): Promise<void>;
    list(filter?: { calendarId?: string; date?: string }): Promise<ReadonlyArray<HumanFriendlyCalendarEvent>>;
    recurrence: {
        addRecurrence(id: string, recurrenceRule: string): Promise<void>;
        removeRecurrence(id: string, recurrenceRule: string): Promise<void>;
    };
    ical: {
        importICal(data: string): Promise<ReadonlyArray<HumanFriendlyCalendarEvent>>;
        exportICal(calendarId: string): Promise<string>;
    };
    recommend(userId: string): Promise<ReadonlyArray<HumanFriendlyCalendarEvent>>;
    management: {
        listManagedEvents(managerId: string): Promise<ReadonlyArray<HumanFriendlyCalendarEvent>>;
        updateManagedEvent(eventId: string, data: Partial<HumanFriendlyCalendarEvent>): Promise<HumanFriendlyCalendarEvent>;
    };
}

export interface InteractionAPI {
    sendMessage(message: string): Promise<string>;
    receiveMessage(): Promise<string>;
    chat: {
        startSession(userId: string): Promise<string>;
        endSession(sessionId: string): Promise<void>;
        sendChatMessage(sessionId: string, message: string): Promise<string>;
    };
    naturalLanguage: {
        processQuery(query: string): Promise<string>;
    };
}

export interface NotificationAPI {
    schedule(reminder: NotificationReminder): Promise<void>;
    cancel(id: string): Promise<void>;
    list(): Promise<ReadonlyArray<NotificationReminder>>;
    push: {
        sendPushNotification(userId: string, message: string): Promise<void>;
        subscribe(userId: string): Promise<void>;
        unsubscribe(userId: string): Promise<void>;
    };
}

export interface NLPAPI {
    processText(input: string): Promise<string>;
    extractEntities(input: string): Promise<Record<string, any>>;
    sentimentAnalysis(input: string): Promise<number>;
}

export interface Exports {
    user: UserAPI;
    subscription: SubscriptionAPI;
    permission: PermissionAPI;
    calendar: CalendarAPI;
    event: EventAPI;
    interaction: InteractionAPI;
    notification: NotificationAPI;
    nlp: NLPAPI;
}
