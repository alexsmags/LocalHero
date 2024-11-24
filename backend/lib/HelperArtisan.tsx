const BASE_URL = "http://localhost:3000";

// Get all artisans
export const getArtisans = async () => {
  const response = await fetch(`${BASE_URL}/api/artisan`);
  const json = await response.json();

  return json;
};

// Get artisans for user in session
export const getUserArtisans = async (userID: any) => {
  const response = await fetch(`${BASE_URL}/api/userartisan/${userID}`);
  const json = await response.json();

  return json;
};

// get Artisan by id
export const getArtisan = async (artisanId: any) => {
  const response = await fetch(`${BASE_URL}/api/artisan/${artisanId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

// Adding a new artisan
export async function addArtisan(formData: any) {
  try {
    console.log("Sending data to API:", formData); // Log the data being sent to the API

    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    console.log("Request options:", Options); // Log the request options

    const response = await fetch(`${BASE_URL}/api/artisan`, Options);
    console.log("Response received:", response); // Log the raw response object

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log("Parsed response JSON:", json); // Log the parsed JSON response

    return json;
  } catch (error) {
    return "ERROR FOUND";
  }
}

// Update a new artisan
export async function updateArtisan(artisanId: any, formData: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `${BASE_URL}/api/artisan/?artisanId=${artisanId}`,
    Options
  );
  const json = await response.json();
  return json;
}

// Delete a existing artisan
export async function deleteArtisan(artisanId: any) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${BASE_URL}/api/artisan/?artisanId=${artisanId}`,
    Options
  );
  const json = await response.json();
  return json;
}

// Get filtered artisans
export const getArtisanssFiltered = async (filters = {}) => {
  const response = await fetch(
    `${BASE_URL}/api/artisanfilter?${new URLSearchParams(filters)}`
  );
  const json = await response.json();
  return json;
};