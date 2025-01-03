import { z } from "zod";

// Used to validate Auth0 User JSON contained in headers from client
export const auth0UserSchema = z.object({
  name: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  middle_name: z.string().optional(),
  nickname: z.string().optional(),
  preferred_username: z.string().optional(),
  profile: z.string().optional(),
  picture: z.string().optional(),
  website: z.string().optional(),
  email: z.string().email().optional(),
  email_verified: z.boolean().optional(),
  gender: z.string().optional(),
  birthdate: z.string().optional(), 
  zoneinfo: z.string().optional(),
  locale: z.string().optional(),
  phone_number: z.string().optional(),
  phone_number_verified: z.boolean().optional(),
  address: z.string().optional(),
  updated_at: z.string().optional(), 
  sub: z.string().optional(),
}).passthrough();