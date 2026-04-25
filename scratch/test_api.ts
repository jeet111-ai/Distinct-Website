async function run() {
  const payload = {
    firstName: "John",
    lastName: "Doe",
    email: "a@a.com",
    phone: "1234567890",
    company: "Company",
    location: "General Inquiry",
    message: "",
    numberOfSeats: "1",
    timeline: "Immediate",
  };

  const res = await fetch('http://localhost:5000/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const body = await res.text();
  console.log(`Status: ${res.status}`);
  console.log(`Body: ${body}`);
}

run();
