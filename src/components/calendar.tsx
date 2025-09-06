"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "@/lib/event.utils";

interface CalendarState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

export default function Calendar() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current != null) {
      new Draggable(containerRef.current, {
        itemSelector: ".event",
        eventData: (eventEl) => {
          return {
            title: eventEl.innerText,
          };
        },
      });
    }
  }, []);

  const [state, setState] = useState<CalendarState>({
    weekendsVisible: true,
    currentEvents: [],
  });

  const handleWeekendsToggle = () => {
    setState((prev) => ({
      weekendsVisible: !prev.weekendsVisible,
      currentEvents: prev.currentEvents,
    }));
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setState((prev) => ({
      weekendsVisible: !prev.weekendsVisible,
      currentEvents: events,
    }));
  };

  return (
    <div className="calendar">
      <div className="calendar-sidebar">
        <div className="calendar-sidebar-section">
          <h2>Events</h2>
          <ul ref={containerRef}>
            <li className="event">event 1</li>
            <li className="event">event 2</li>
            <li className="event">event 3</li>
          </ul>
        </div>
        <div className="calendar-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={state.weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="calendar-sidebar-section">
          <h2>All Events ({state.currentEvents.length})</h2>
          <ul>{state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
      <div className="calendar-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={state.weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
    </div>
  );
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start!, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
