import { prisma } from "@/lib/prisma";

export type InAppNotificationType = "MILESTONE" | "DEADLINE" | "ENCOURAGEMENT" | "DIVERSION" | "SYSTEM";

interface CreateNotificationOptions {
  userId: string;
  title: string;
  message: string;
  type: InAppNotificationType;
  linkUrl?: string;
  sendExternalEmail?: boolean;
  sendPush?: boolean;
}

export async function createNotification({
  userId,
  title,
  message,
  type,
  linkUrl,
  sendExternalEmail = false,
  sendPush = false,
}: CreateNotificationOptions) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        linkUrl,
        read: false,
      },
    });

    // Stub hook for future external email integration
    if (sendExternalEmail) {
      await stubSendEmailHook(userId, title, message);
    }

    // Stub hook for future web push notifications
    if (sendPush) {
      await stubSendPushHook(userId, title, message);
    }

    return notification;
  } catch (error) {
    console.error("Failed to create in-app notification:", error);
    return null;
  }
}

/**
 * Stubbed integration hook for Email Notifications (Resend / SendGrid / Postmark)
 */
async function stubSendEmailHook(userId: string, subject: string, body: string) {
  // In production: await resend.emails.send({ to: userEmail, subject, text: body });
  if (process.env.NODE_ENV === "development") {
    console.log(`[Email Hook Stub] Dispatched to User ${userId}: "${subject}"`);
  }
}

/**
 * Stubbed integration hook for Web Push Notifications (WebPush / FCM)
 */
async function stubSendPushHook(userId: string, title: string, body: string) {
  // In production: await webpush.sendNotification(subscription, JSON.stringify({ title, body }));
  if (process.env.NODE_ENV === "development") {
    console.log(`[Push Hook Stub] Dispatched to User ${userId}: "${title}" - "${body}"`);
  }
}

/**
 * Trigger milestone celebration notification
 */
export async function notifyMilestoneCompleted(userId: string, milestoneTitle: string, domain: string) {
  return createNotification({
    userId,
    title: "Milestone Achieved! 🎉",
    message: `You completed "${milestoneTitle}" in ${domain}. Your craft and technical confidence are visibly growing!`,
    type: "MILESTONE",
    linkUrl: "/roadmap",
    sendPush: true,
  });
}

/**
 * Trigger supportive re-engagement notification (non-guilt tone)
 */
export async function notifySupportiveNudge(userId: string, targetDomain: string) {
  return createNotification({
    userId,
    title: "We're here whenever you're ready ✨",
    message: `Take your time! Whenever you feel inspired to build again, your ${targetDomain} roadmap is waiting with practical next steps.`,
    type: "ENCOURAGEMENT",
    linkUrl: "/roadmap",
  });
}

/**
 * Trigger gentle diversion alert
 */
export async function notifyDomainShiftPrompt(userId: string, suggestedDomain: string) {
  return createNotification({
    userId,
    title: `Noticed a shift in your curiosity? 💡`,
    message: `You've been exploring ${suggestedDomain} topics lately. Would you like to review or update your active roadmap?`,
    type: "DIVERSION",
    linkUrl: "/roadmap",
  });
}
