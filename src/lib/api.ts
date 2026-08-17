import { User, UsersResponse } from "@/types/user";

const API_BASE_URL = "https://dummyjson.com/users";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Fetch all users from the public API (defaults to 100 users for rich client-side search/filter)
 */
export async function getUsers(limit: number = 100, skip: number = 0): Promise<UsersResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}?limit=${limit}&skip=${skip}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour in Next.js Server Components
    } as RequestInit);

    if (!response.ok) {
      throw new ApiError(response.status, `Failed to fetch users (Status ${response.status})`);
    }

    const data: UsersResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error(error instanceof Error ? error.message : "An unexpected network error occurred.");
  }
}

/**
 * Fetch a single user profile by ID
 */
export async function getUserById(id: string | number): Promise<User> {
  try {
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(numericId) || numericId <= 0) {
      throw new ApiError(404, "Invalid user ID provided.");
    }

    const response = await fetch(`${API_BASE_URL}/${numericId}`, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (response.status === 404) {
      throw new ApiError(404, `User with ID #${id} was not found.`);
    }

    if (!response.ok) {
      throw new ApiError(response.status, `Failed to fetch user details (Status ${response.status})`);
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error(error instanceof Error ? error.message : "An unexpected network error occurred.");
  }
}

/**
 * Search users directly via API search endpoint
 */
export async function searchUsersApi(query: string): Promise<UsersResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new ApiError(response.status, `Failed to search users (Status ${response.status})`);
    }

    const data: UsersResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error(error instanceof Error ? error.message : "An unexpected network error occurred.");
  }
}
