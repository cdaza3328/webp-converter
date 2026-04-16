async function convertImage() {
  const url = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Converting... ";

  try {
    const response = await fetch("https://webp-converter-bf6w.onrender.com/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (data.success) {
      resultDiv.innerHTML = `
        <img src="${data.image}" />
        <a href="${data.image}" download="image.jpg">Download JPG</a>
      `;
    } else {
      resultDiv.innerHTML = "Error converting image ";
    }

  } catch (error) {
    resultDiv.innerHTML = "Server error ";
  }
}