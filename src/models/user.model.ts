export interface User {
   id: number | null;
   username: string | null;
   firstName: string | null;
   lastName: string | null;
   role: "user" | "admin" | null;
}
