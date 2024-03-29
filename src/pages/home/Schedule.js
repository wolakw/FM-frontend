import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Schedule.css";
import {useAuth} from "../../context/AuthContext";

export default function Schedule() {
    const locales = {
        "en-US": require("date-fns/locale/en-US"),
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    const [allEvents, setAllEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const{user} = useAuth();
    async function fetchEvents() {
        try {
            const response = await axios.get("http://localhost:8081/games"); // Wstaw odpowiedni endpoint do pobrania wydarzeń z bazy danych
            const games = response.data;

            const filteredGames = games.filter(
                (game) => (game.club1.id === user?.club.id || game.club2.id === user?.club.id) && !game.played
            );

            const events = filteredGames.map((game) => ({
                id: game.id, // Dodano ID meczu jako pole `id` w obiekcie wydarzenia
                title: `${game.club1.name} - ${game.club2.name}`,
                start: new Date(game.gameDate),
                end: new Date(game.gameDate),
            }));

            setAllEvents(events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    function handleEventClick(event) {
        navigate(`/game/${event.id}`); // Przekierowanie do widoku symulacji meczu z odpowiednim ID meczu
        window.location.reload(false);
    }

    return (
        <div className="Test">
            <h1>Calendar</h1>
            <div className="cal">
                <Calendar
                    localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, margin: "50px" }}
                    onSelectEvent={handleEventClick} // Dodano obsługę kliknięcia na wydarzenie
                />
            </div>
        </div>
    );
}
