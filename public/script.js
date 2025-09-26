document.getElementById("regForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const course = document.getElementById("course").value;
  const message = document.getElementById("message");

  if (!firstName || !lastName || !gender || !email || !studentId || !course) {
    message.textContent = "⚠️ All fields are required!";
    message.style.color = "red";
    return;
  }

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: firstName + " " + lastName,
        email,
        course,
        gender,
        studentId
      })
    });

    const data = await res.json();
    if (data.success) {
      message.textContent = "✅ Registration successful!";
      message.style.color = "green";
      document.getElementById("regForm").reset();
    } else {
      message.textContent = "❌ " + data.error;
      message.style.color = "red";
    }
  } catch (err) {
    message.textContent = "❌ Server error!";
    message.style.color = "red";
  }
});
