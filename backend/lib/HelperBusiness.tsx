const BASE_URL = "http://localhost:3000";

// Get all businesses
export const getBusinesses = async () => {
  const response = await fetch(`${BASE_URL}/api/business`);
  const json = await response.json();

  return json;
};

// Get businesses for user in session
export const getUserBusinesses = async (userID: any) => {
  const response = await fetch(`${BASE_URL}/api/userbusiness/${userID}`);
  const json = await response.json();

  return json;
};

// get business by id
export const getBusiness = async (businessId: any) => {
  const response = await fetch(`${BASE_URL}/api/business/${businessId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

// Adding a new business
export async function addBusiness(formData: any) {
  try {
    console.log("Sending data to API:", formData); // Log the data being sent to the API

    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    console.log("Request options:", Options); // Log the request options

    const response = await fetch(`${BASE_URL}/api/business`, Options);
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

// Update a new business
export async function updateBusiness(businessId: any, formData: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `${BASE_URL}/api/business/?businessId=${businessId}`,
    Options
  );
  const json = await response.json();
  return json;
}

// Delete a existing business
export async function deleteBusiness(businessId: any) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${BASE_URL}/api/business/?businessId=${businessId}`,
    Options
  );
  const json = await response.json();
  return json;
}

// Get filtered businesses
export const getBusinessesFiltered = async (filters = {}) => {
  const response = await fetch(
    `${BASE_URL}/api/businessfilter?${new URLSearchParams(filters)}`
  );
  const json = await response.json();
  return json;
};