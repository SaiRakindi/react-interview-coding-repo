import React from "react";

const TicketsBooking = () => {
  const totalTickets = 300;
  const [bookedTickets, setBookedTickets] = useState(185);
  const progressPercentage = (bookedTickets / totalTickets) * 100;

  const handleBookTicket = () => {
    setBookedTickets((prev) => (prev < totalTickets ? prev + 1 : prev));
  };

  return (
    <div>
      <div style={{ width: "300px", margin: "0 auto", textAlign: "center" }}>
        <h2>Ticket Booking Progress</h2>
        <div
          style={{
            width: "100%",
            height: "30px",
            backgroundColor: "lightgreen",
            borderRadius: "5px",
            overflow: "hidden",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              backgroundColor: "green",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>
        <p>
          {bookedTickets} / {totalTickets} tickets booked
        </p>
        <button
          onClick={handleBookTicket}
          disabled={bookedTickets >= totalTickets}
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketsBooking;
