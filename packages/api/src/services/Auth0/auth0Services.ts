import axios from 'axios';

export const getAuth0User = async (userId: string) => {
  const domain = process.env.AUTH0_DOMAIN; // e.g., 'your-tenant.auth0.com'
  const token = process.env.AUTH0_MANAGEMENT_API_TOKEN; // Replace with your generated token

  const trimmedToken = token?.trim();

  try {
    const response = await axios.get(
      `https://${domain}/api/v2/users/${userId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${trimmedToken}`,
        },
      },
    );

    console.log(response.data);

    return response.data; // User details
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message,
      );
    } else {
      if (error instanceof Error) {
        console.error("Error fetching user:", error.message);
      } else {
        console.error("Error fetching user:", error);
      }
    }
  }
};
