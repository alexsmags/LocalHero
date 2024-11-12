const BASE_URL = "http://localhost:3000";

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users`);
  const json = await response.json();

  return json;
};

export const getUser = async (userID: any) => {
  const response = await fetch(`${BASE_URL}/api/users/${userID}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

//Posting a new user
export async function addUser(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${BASE_URL}/api/users`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

//Update a new user
export async function updateUser(userID: any, formData: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `${BASE_URL}/api/users/?userID=${userID}`,
    Options
  );
  const json = await response.json();
  return json;
}

//Delete a new user
export async function deleteUser(userID: any) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${BASE_URL}/api/users/?userID=${userID}`,
    Options
  );
  const json = await response.json();
  return json;
}

export const getEmailUser = async (email: any) => {
  const response = await fetch(`${BASE_URL}/api/userExists/${email}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

// Get filtered user
export const getUsersFiltered = async (filters = {}) => {
  const response = await fetch(
    `${BASE_URL}/api/userfilter?${new URLSearchParams(filters)}`
  );
  const json = await response.json();
  return json;
};