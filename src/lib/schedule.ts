import { CLINIC_CONFIG } from './config/clinic';

export interface ScheduleSlot {
  start: string; // HH:MM
  end: string; // HH:MM
}

export interface DaySchedule {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  isClosed: boolean;
  morning?: ScheduleSlot;
  morningBreak?: ScheduleSlot;
  evening?: ScheduleSlot;
  eveningBreak?: ScheduleSlot;
}

export interface HolidayOverride {
  date: string; // YYYY-MM-DD
  isClosed: boolean;
  specialHours?: string;
  reason?: string | null;
}

export interface ClinicSchedule {
  weeklySchedule: DaySchedule[];
  holidayOverrides: HolidayOverride[];
}

/**
 * Parse time string in HH:MM format to minutes since midnight
 */
export function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Format minutes since midnight to HH:MM string
 */
export function formatMinutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Check if a given date/time is within the clinic's operating hours
 * Returns null if hours are not configured (demo data)
 */
export function isOpenNow(schedule: ClinicSchedule | null): boolean | null {
  if (!schedule) {
    // Return null to indicate hours are not configured
    return null;
  }

  const now = new Date();
  const kolkataTime = new Date(now.toLocaleString('en-US', { timeZone: CLINIC_CONFIG.timezone }));
  
  const dayOfWeek = kolkataTime.getDay();
  const currentTime = kolkataTime.getHours() * 60 + kolkataTime.getMinutes();
  const dateStr = kolkataTime.toISOString().split('T')[0];

  // Check for holiday override
  const holiday = schedule.holidayOverrides.find(h => h.date === dateStr);
  if (holiday) {
    if (holiday.isClosed) {
      return false;
    }
    if (holiday.specialHours) {
      // Parse special hours (simple format: "09:00-13:00,16:00-20:00")
      const timeRanges = holiday.specialHours.split(',');
      for (const range of timeRanges) {
        const [start, end] = range.trim().split('-');
        const startMin = parseTimeToMinutes(start);
        const endMin = parseTimeToMinutes(end);
        if (currentTime >= startMin && currentTime < endMin) {
          return true;
        }
      }
      return false;
    }
  }

  // Check weekly schedule
  const daySchedule = schedule.weeklySchedule.find(d => d.dayOfWeek === dayOfWeek);
  if (!daySchedule || daySchedule.isClosed) {
    return false;
  }

  // Check morning session
  if (daySchedule.morning) {
    const morningStart = parseTimeToMinutes(daySchedule.morning.start);
    const morningEnd = parseTimeToMinutes(daySchedule.morning.end);
    
    // Check if currently in morning break
    if (daySchedule.morningBreak) {
      const breakStart = parseTimeToMinutes(daySchedule.morningBreak.start);
      const breakEnd = parseTimeToMinutes(daySchedule.morningBreak.end);
      if (currentTime >= breakStart && currentTime < breakEnd) {
        // In break, check evening session
      } else if (currentTime >= morningStart && currentTime < morningEnd) {
        return true;
      }
    } else if (currentTime >= morningStart && currentTime < morningEnd) {
      return true;
    }
  }

  // Check evening session
  if (daySchedule.evening) {
    const eveningStart = parseTimeToMinutes(daySchedule.evening.start);
    const eveningEnd = parseTimeToMinutes(daySchedule.evening.end);
    
    // Check if currently in evening break
    if (daySchedule.eveningBreak) {
      const breakStart = parseTimeToMinutes(daySchedule.eveningBreak.start);
      const breakEnd = parseTimeToMinutes(daySchedule.eveningBreak.end);
      if (currentTime >= breakStart && currentTime < breakEnd) {
        return false;
      } else if (currentTime >= eveningStart && currentTime < eveningEnd) {
        return true;
      }
    } else if (currentTime >= eveningStart && currentTime < eveningEnd) {
      return true;
    }
  }

  return false;
}

/**
 * Get formatted hours for a specific day
 */
export function getDayHours(daySchedule: DaySchedule): string {
  if (daySchedule.isClosed) {
    return 'Closed';
  }

  const parts: string[] = [];

  if (daySchedule.morning) {
    parts.push(`${daySchedule.morning.start} - ${daySchedule.morning.end}`);
  }

  if (daySchedule.evening) {
    parts.push(`${daySchedule.evening.start} - ${daySchedule.evening.end}`);
  }

  return parts.length > 0 ? parts.join(', ') : 'Hours not set';
}

/**
 * Get day name from day of week number
 */
export function getDayName(dayOfWeek: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayOfWeek];
}
