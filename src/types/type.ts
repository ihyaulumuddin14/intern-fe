export type User = {
  full_name: string,
  user_name: string,
  email: string,
  role: string,
  education_level?: string,
  major?: string,
  institution?: string,
  graduation_year?: number,
  is_premium: boolean,
}

export type Career = {
  id: number,
  name: string
}