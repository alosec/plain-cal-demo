import { useState, useMemo } from 'react'
import {
  Timeline,
  WeekView,
  Calendar,
  useCalendarState,
  startOfWeek,
  startOfMonth,
  getWeekdayName,
  getMonthName,
  formatMinutesToTime,
  dateToMinutes,
} from '@plain-calendar/react'
import type { CalendarEvent, PositionedEvent } from '@plain-calendar/core'
import { generateDemoEvents, generateMonthEvents } from './mockEvents'

type ViewType = 'timeline' | 'week' | 'month'

function App() {
  const [view, setView] = useState<ViewType>('week')
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  
  const calendar = useCalendarState({
    view: view === 'month' ? 'month' : 'week',
  })
  
  const events = useMemo(() => {
    return view === 'month' ? generateMonthEvents() : generateDemoEvents()
  }, [view])
  
  const weekStart = startOfWeek(calendar.selectedDate, 0)
  const monthDate = startOfMonth(calendar.selectedDate)

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setTimeout(() => setSelectedEvent(null), 2000)
  }

  // Custom event renderer for Timeline and WeekView
  const renderEvent = (pe: PositionedEvent<CalendarEvent>) => {
    const width = 100 / pe.totalColumns
    const left = pe.column * width
    const startTime = formatMinutesToTime(dateToMinutes(pe.event.start), '12h')
    
    return (
      <div
        key={pe.event.id}
        className="custom-event"
        onClick={() => handleEventClick(pe.event)}
        style={{
          position: 'absolute',
          top: `${pe.top}%`,
          height: `${pe.height}%`,
          left: `${left}%`,
          width: `${width}%`,
          backgroundColor: pe.event.color || '#3b82f6',
          border: selectedEvent?.id === pe.event.id ? '2px solid #000' : 'none',
        }}
        title={`${pe.event.title} at ${startTime}`}
      >
        <div style={{ fontWeight: 500 }}>{pe.event.title}</div>
        <div style={{ opacity: 0.8, fontSize: 11 }}>{startTime}</div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📅 plain-calendar</h1>
        <p>Headless React calendar components</p>
      </header>

      <div className="view-tabs">
        <button 
          className={view === 'timeline' ? 'active' : ''} 
          onClick={() => setView('timeline')}
        >
          Day
        </button>
        <button 
          className={view === 'week' ? 'active' : ''} 
          onClick={() => setView('week')}
        >
          Week
        </button>
        <button 
          className={view === 'month' ? 'active' : ''} 
          onClick={() => setView('month')}
        >
          Month
        </button>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
        <button onClick={calendar.goToPrevious}>← Previous</button>
        <button onClick={calendar.goToToday}>Today</button>
        <button onClick={calendar.goToNext}>Next →</button>
      </div>

      {/* Date Display */}
      <div style={{ textAlign: 'center', marginBottom: 16, fontSize: 18, fontWeight: 500 }}>
        {view === 'month' 
          ? `${getMonthName(monthDate)} ${monthDate.getFullYear()}`
          : view === 'timeline'
          ? `${getWeekdayName(calendar.selectedDate)}, ${getMonthName(calendar.selectedDate, 'short')} ${calendar.selectedDate.getDate()}`
          : `Week of ${getMonthName(weekStart, 'short')} ${weekStart.getDate()}, ${weekStart.getFullYear()}`
        }
      </div>

      <div className="calendar-container">
        {view === 'timeline' && (
          <div className="timeline-container">
            <Timeline
              events={events}
              date={calendar.selectedDate}
              startHour={8}
              endHour={20}
              renderEvent={renderEvent}
            />
          </div>
        )}

        {view === 'week' && (
          <div className="week-container">
            <WeekView
              events={events}
              weekStart={weekStart}
              startHour={8}
              endHour={20}
              renderEvent={renderEvent}
            />
          </div>
        )}

        {view === 'month' && (
          <div className="month-container">
            <Calendar
              events={events}
              month={monthDate}
              onDateClick={(date) => {
                calendar.setSelectedDate(date)
                setView('timeline')
              }}
              onEventClick={handleEventClick}
              renderHeader={() => null}
            />
          </div>
        )}
      </div>

      {selectedEvent && (
        <div style={{ 
          position: 'fixed', 
          bottom: 20, 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: '#1a1a1a',
          color: 'white',
          padding: '12px 24px',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}>
          Selected: <strong>{selectedEvent.title}</strong>
        </div>
      )}

      <footer className="footer">
        <p>
          Built with <a href="https://github.com/alosec/plain-calendar" target="_blank" rel="noopener">plain-calendar</a>
          {' '}• Headless calendar components for React
        </p>
      </footer>
    </div>
  )
}

export default App
