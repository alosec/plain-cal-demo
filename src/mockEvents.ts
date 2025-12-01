/**
 * Demo calendar events - realistic schedule data
 */

import type { CalendarEvent } from '@plain-calendar/core'
import { addDays, startOfWeek } from '@plain-calendar/core'

const COLORS = {
  blue: '#3b82f6',
  red: '#ef4444',
  green: '#10b981',
  amber: '#f59e0b',
  purple: '#8b5cf6',
  pink: '#ec4899',
  cyan: '#06b6d4',
}

function createEvent(
  id: string,
  title: string,
  dayOffset: number,
  startHour: number,
  startMinute: number,
  durationMinutes: number,
  color: string,
  baseDate: Date
): CalendarEvent {
  const date = addDays(baseDate, dayOffset)
  const start = new Date(date)
  start.setHours(startHour, startMinute, 0, 0)
  
  const end = new Date(start)
  end.setMinutes(end.getMinutes() + durationMinutes)
  
  return { id, title, start, end, color }
}

export function generateDemoEvents(): CalendarEvent[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const weekStart = startOfWeek(today, 0)
  
  return [
    // Sunday
    createEvent('sun-1', 'Family Brunch', 0, 10, 0, 90, COLORS.green, weekStart),
    createEvent('sun-2', 'Grocery Shopping', 0, 14, 0, 60, COLORS.cyan, weekStart),
    
    // Monday
    createEvent('mon-1', 'Morning Standup', 1, 9, 0, 30, COLORS.blue, weekStart),
    createEvent('mon-2', 'Sprint Planning', 1, 10, 0, 120, COLORS.purple, weekStart),
    createEvent('mon-3', 'Lunch with Sarah', 1, 12, 30, 60, COLORS.green, weekStart),
    createEvent('mon-4', 'Code Review', 1, 14, 0, 60, COLORS.cyan, weekStart),
    createEvent('mon-5', 'Team Sync', 1, 15, 30, 30, COLORS.blue, weekStart),
    
    // Tuesday
    createEvent('tue-1', 'Morning Standup', 2, 9, 0, 30, COLORS.blue, weekStart),
    createEvent('tue-2', 'Client Call - Acme Corp', 2, 10, 0, 60, COLORS.red, weekStart),
    createEvent('tue-3', 'Design Review', 2, 11, 30, 90, COLORS.purple, weekStart),
    createEvent('tue-4', 'Deep Work Block', 2, 14, 0, 180, COLORS.amber, weekStart),
    
    // Wednesday
    createEvent('wed-1', 'Morning Standup', 3, 9, 0, 30, COLORS.blue, weekStart),
    createEvent('wed-2', 'Architecture Discussion', 3, 10, 0, 90, COLORS.purple, weekStart),
    createEvent('wed-3', 'Lunch & Learn: GraphQL', 3, 12, 0, 60, COLORS.green, weekStart),
    createEvent('wed-4', '1:1 with Manager', 3, 14, 0, 45, COLORS.pink, weekStart),
    createEvent('wed-5', 'Bug Triage', 3, 15, 0, 60, COLORS.red, weekStart),
    createEvent('wed-6', 'Yoga Class', 3, 18, 0, 60, COLORS.green, weekStart),
    
    // Thursday
    createEvent('thu-1', 'Morning Standup', 4, 9, 0, 30, COLORS.blue, weekStart),
    createEvent('thu-2', 'Product Demo', 4, 10, 30, 60, COLORS.amber, weekStart),
    createEvent('thu-3', 'Interview - Sr. Engineer', 4, 13, 0, 60, COLORS.pink, weekStart),
    createEvent('thu-4', 'Interview - Sr. Engineer', 4, 14, 30, 60, COLORS.pink, weekStart),
    createEvent('thu-5', 'Coffee Chat - New Hire', 4, 16, 0, 30, COLORS.cyan, weekStart),
    
    // Friday
    createEvent('fri-1', 'Morning Standup', 5, 9, 0, 30, COLORS.blue, weekStart),
    createEvent('fri-2', 'Sprint Retro', 5, 10, 0, 60, COLORS.purple, weekStart),
    createEvent('fri-3', 'Docs Writing', 5, 11, 30, 90, COLORS.cyan, weekStart),
    createEvent('fri-4', 'Team Social', 5, 16, 0, 120, COLORS.green, weekStart),
    
    // Saturday
    createEvent('sat-1', 'Farmers Market', 6, 9, 0, 90, COLORS.green, weekStart),
    createEvent('sat-2', 'Side Project', 6, 14, 0, 180, COLORS.amber, weekStart),
  ]
}

export function generateMonthEvents(): CalendarEvent[] {
  const events = generateDemoEvents()
  
  // Add some multi-day/all-day events
  const today = new Date()
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  
  events.push({
    id: 'allday-1',
    title: 'Team Offsite',
    start: addDays(monthStart, 10),
    end: addDays(monthStart, 12),
    allDay: true,
    color: COLORS.purple,
  })
  
  events.push({
    id: 'allday-2',
    title: 'Conference',
    start: addDays(monthStart, 18),
    end: addDays(monthStart, 20),
    allDay: true,
    color: COLORS.amber,
  })
  
  events.push({
    id: 'allday-3',
    title: 'Holiday',
    start: addDays(monthStart, 25),
    end: addDays(monthStart, 25),
    allDay: true,
    color: COLORS.green,
  })
  
  return events
}
